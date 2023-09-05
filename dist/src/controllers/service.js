"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCoupon = exports.generateCoupon = void 0;
const coupon_1 = require("../models/coupon");
// import connection from "./connection"
// connection.addModels([Coupon])
const generateCoupon = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = {
        coupon_code: req.body.coupon_code,
        discount_type: req.body.discount_type,
        isActive: true,
        minimum_cart_total: req.body.minimum_cart_total,
        minimum_items: req.body.minimum_items,
        discount_amount: req.body.discount_amount,
        discount_percent: req.body.discount_percent,
    };
    try {
        const newCoupon = yield coupon_1.Coupon.create(payload);
        console.log(newCoupon);
        newCoupon.save();
        res.status(200).send(newCoupon.coupon_code);
    }
    catch (e) {
        res.status(500).send(e);
    }
});
exports.generateCoupon = generateCoupon;
const useCoupon = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const couponCode = req.query.couponCode;
    const cartTotal = Number(req.query.cartTotal);
    const cartItemCount = Number(req.query.cartItemCount);
    try {
        const coupon = yield coupon_1.Coupon.validateCoupon(couponCode, cartTotal, cartItemCount);
        if (coupon === null) {
            res.status(404).send("Invalid coupon");
        }
        else {
            const result = yield coupon_1.Coupon.applyCoupon(cartTotal, coupon);
            res.status(200).send(result);
        }
    }
    catch (e) {
        res.status(500).send("something happened");
    }
});
exports.useCoupon = useCoupon;
// module.exports = {
//     useCoupon,
//   generateCoupon,
// }
