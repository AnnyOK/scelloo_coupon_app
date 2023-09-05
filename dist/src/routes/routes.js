"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const couponController_1 = require("../controllers/couponController");
const userController_1 = require("../controllers/userController");
const cartsController_1 = require("../controllers/cartsController");
const router = express_1.default.Router();
//@body ...  "discount_type": string,[fixed,percent,mixed,rejected]
// "minimum_cart_total": number,
// "minimum_items": number,
// "discount_amount":number,
// "discount_percent":number
//@return coupon_code:string
router.route("/createcoupon").post(couponController_1.generateCoupon);
router.route("/getall").get(couponController_1.getAllCoupon);
//@Method:GET
//@Query ...couponCode:string,cartTotal:number,cartItemCount:number
//@Response (statusCode: 200,data:{discount:number,adjusted_price:number})
router.route("/coupon").get(couponController_1.useCoupon);
//method "Post"
//@Body first_name:string,last_name:string
//return User
router.route("/user").post(userController_1.createNewUser);
router.route("/user").get(userController_1.getAllUser);
//@method "POST"
//@Body product_name:string,product_price:number,product_qty:number
//@query user_id:string
//@returns Cart
router.route("/addtoCart").post(cartsController_1.addToCart);
//@Method GET
//@ query user_id:string
//@Returns {cart:cart[],totalPrice:number,totalItemCount:number}
router.route("/cart").get(cartsController_1.getCart);
router.route("/getallcart").get(cartsController_1.getAllCart);
exports.default = router;
