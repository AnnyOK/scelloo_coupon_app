import { Request, Response } from 'express'
import { Coupon } from '../models/coupon'
// import connection from "./connection"

// connection.addModels([Coupon])
 export const generateCoupon = async (req: Request, res: Response) => {
  try {
    const newCoupon = await Coupon.create({...req.body})
    newCoupon.save()
    res.status(200).send(newCoupon.coupon_code)
  } catch (e) {
    res.status(500).send(e)
  }
}
export const useCoupon =async(req:Request,res:Response) => {
    const couponCode = req.query.couponCode as string 
    const cartTotal = Number(req.query.cartTotal)
    const cartItemCount = Number(req.query.cartItemCount)
    try{
        const coupon = await Coupon.validateCoupon(couponCode,cartTotal,cartItemCount)
        if(coupon===null){
            res.status(404).send("Coupon cannot be used")
        }else{
           const result= await Coupon.applyCoupon(cartTotal,coupon)
res.status(200).send(result)
        }

    }catch(e){
res.status(500).send("something happened")
    }


}
export const getAllCoupon =async(req:Request,res:Response)=>{
  const allcoupons = await Coupon.findAll()
  res.send(allcoupons)
}



