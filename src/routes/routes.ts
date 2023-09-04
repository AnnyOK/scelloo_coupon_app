import express from 'express';
import  {generateCoupon, useCoupon} from "../controllers/couponController"
import { createNewUser } from '../controllers/userController';
import { addToCart, getCart } from '../controllers/cartsController';
const router = express.Router()
//@body ...  "discount_type": string,
    // "minimum_cart_total": number,
    // "minimum_items": number,
    // "discount_amount":number,
    // "discount_percent":number
//@return coupon_code:string
router.route("/createcoupon").get(generateCoupon)
//@Method:GET
//@Query ...couponCode:string,cartTotal:number,cartItemCount:number
//@Response (statusCode: 200,data:{discount:number,adjusted_price:number})
router.route("/coupon").get(useCoupon)
//method "Post"
//@Body first_name:string,last_name:string
//return User
router.route("/user").post(createNewUser)
//@method "POST"
//@Body product_name:string,product_price:number,product_qty:number
//@query user_id:string
//@returns Cart
router.route("/addtoCart").post(addToCart)
//@Method GET
//@ query user_id:string
//@Returns {cart:cart[],totalPrice:number,totalItemCount:number}
router.route("/cart").get(getCart)
export default router