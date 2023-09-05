import express from 'express';
import  {generateCoupon, getAllCoupon, useCoupon} from "../controllers/couponController"
import { createNewUser,getAllUser } from '../controllers/userController';
import { addToCart, getAllCart, getCart } from '../controllers/cartsController';
const router = express.Router()
//@body ...  "discount_type": string,[fixed,percent,mixed,rejected]
    // "minimum_cart_total": number,
    // "minimum_items": number,
    // "discount_amount":number,
    // "discount_percent":number
//@return coupon_code:string
router.route("/createcoupon").post(generateCoupon)
router.route("/getall").get(getAllCoupon)
//@Method:GET
//@Query ...couponCode:string,cartTotal:number,cartItemCount:number
//@Response (statusCode: 200,data:{discount:number,adjusted_price:number})
router.route("/coupon").get(useCoupon)
//method "Post"
//@Body first_name:string,last_name:string
//return User
router.route("/user").post(createNewUser)
router.route("/user").get(getAllUser)
//@method "POST"
//@Body product_name:string,product_price:number,product_qty:number
//@query user_id:string
//@returns Cart
router.route("/addtoCart").post(addToCart)
//@Method GET
//@ query user_id:string
//@Returns {cart:cart[],totalPrice:number,totalItemCount:number}
router.route("/cart").get(getCart)
router.route("/getallcart").get(getAllCart)
export default router