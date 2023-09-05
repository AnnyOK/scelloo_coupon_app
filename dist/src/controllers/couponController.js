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
exports.getAllCoupon = exports.useCoupon = exports.generateCoupon = void 0;
const coupon_1 = require("../models/coupon");
// import connection from "./connection"
// connection.addModels([Coupon])
const generateCoupon = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newCoupon = yield coupon_1.Coupon.create(Object.assign({}, req.body));
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
            res.status(404).send("Coupon cannot be used");
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
const getAllCoupon = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allcoupons = yield coupon_1.Coupon.findAll();
    res.send(allcoupons);
});
exports.getAllCoupon = getAllCoupon;
