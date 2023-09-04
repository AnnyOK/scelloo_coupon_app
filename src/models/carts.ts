import {
  Table,
  Model,
  Column,
  DataType,
  AutoIncrement,
  Sequelize,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript'
import { User } from './user'

@Table({
  timestamps: false,
  tableName: 'carts',
})
export class Cart extends Model {
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
  })
  id!: number
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  product_name!: string

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  product_price!: number

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  product_qty!: number

  @ForeignKey(() => User)
  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: 0,
  })
  user_id!: string
}
