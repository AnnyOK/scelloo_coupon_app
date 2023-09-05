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
exports.getAllCart = exports.getCart = exports.addToCart = void 0;
const carts_1 = require("../models/carts");
const addToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = Object.assign({ user_id: req.query.user_id }, req.body);
    try {
        const newitem = yield carts_1.Cart.create(payload);
        res.status(201).send(newitem);
    }
    catch (e) {
        res.status(500).send(e);
    }
});
exports.addToCart = addToCart;
const getCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cart = yield carts_1.Cart.findAll({ where: { user_id: req.query.user_id } });
        const totalPrice = cart.reduce((total, product) => total + product.product_price * product.product_qty, 0);
        const totalItemCount = cart.reduce((total, item) => total + item.product_qty, 0);
        res.status(200).send({ cart, totalPrice, totalItemCount });
    }
    catch (e) {
        res.status(500).send(e);
    }
});
exports.getCart = getCart;
const getAllCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allCart = yield carts_1.Cart.findAll();
    res.send(allCart);
});
exports.getAllCart = getAllCart;
