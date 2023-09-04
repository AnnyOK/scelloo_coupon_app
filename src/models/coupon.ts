import {
  Table,
  Model,
  Column,
  DataType,
  AutoIncrement,
} from 'sequelize-typescript'

@Table({
  timestamps: false,
  tableName: 'coupons',
})
export class Coupon extends Model {
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
  })
  id!: number
  @Column({
    type: DataType.UUID,
    allowNull: false,
    defaultValue:DataType.UUIDV4
  })
  coupon_code!: string

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue:0
  })
  minimum_cart_total!: number

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue:0
  })
  minimum_items!: number 

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  discount_type!: string
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue:0
  })
  discount_amount!: number
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue:0
  })
  discount_percent!: number

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  isActive!: boolean

  static async validateCoupon(
    couponCode: string,
    cartTotal: number,
    cartItemCount: number,
  ): Promise<Coupon | null> {
    let response = null
    const coupon = await this.findOne({
      where: {
        coupon_code: couponCode,
      },
    })
    
    
    if (
      coupon !== null &&
      coupon.isActive === true &&
      coupon.minimum_items &&
      coupon.minimum_items <= cartItemCount &&
      coupon.minimum_cart_total &&
      coupon.minimum_cart_total <= cartTotal
    ) {
      response = coupon
    }
    return response
  }

  static applyCoupon(cartTotal: number, coupon: Coupon) {
    if (coupon.discount_type === 'fixed') {
      if (coupon.discount_amount === null) return 0
      const adjusted_total = Math.max(cartTotal - coupon.discount_amount, 0)
      return { discount: cartTotal - adjusted_total, adjusted_total }
    } else if (coupon.discount_type === 'percent') {
      if (coupon.discount_percent === null) return 0
      const adjusted_total = cartTotal * (1 - coupon.discount_percent / 100)
      return { discount: cartTotal - adjusted_total, adjusted_total }
    } else if (coupon.discount_type === 'mixed') {
      let fixedDiscount = 0,
        percentDiscount = 0
      if (coupon.discount_amount !== 0 && coupon.discount_amount !== null) {
        fixedDiscount = Math.max(coupon.discount_amount, 0)
      }
      if (coupon.discount_percent !== 0 && coupon.discount_percent !== null) {
        percentDiscount = cartTotal * (coupon.discount_percent / 100)
      }
      const adjusted_total =
        cartTotal - Math.max(fixedDiscount, percentDiscount)
      return { discount: cartTotal - adjusted_total, adjusted_total }
    } else if (coupon.discount_type === 'rejected') {
      const fixedDiscount =
        coupon.discount_amount === null ? 0 : coupon.discount_amount
      const percentDiscount =
        coupon.discount_percent === null
          ? 0
          : cartTotal * (coupon.discount_percent / 100)
      const adjusted_total = cartTotal - (fixedDiscount + percentDiscount)
      return {
        discount: cartTotal - adjusted_total,
        adjusted_total,
      }
    }
    return { discount: 0, adjusted_total: cartTotal }
  }
}
