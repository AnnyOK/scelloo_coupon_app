"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const service_1 = require("./controllers/service");
const router = express_1.default.Router();
//@body ...  "discount_type": string,
// "minimum_cart_total": number,
// "minimum_items": number,
// "discount_amount":number,
// "discount_percent":number
//@return coupon_code:string
router.route("/createcoupon").get(service_1.generateCoupon);
//@Method:GET
//@Query ...couponCode:string,cartTotal:number,cartItemCount:number
//@Response (statusCode: 200,data:{discount:number,adjusted_price:number})
router.route("/coupon").get(service_1.useCoupon);
exports.default = router;
