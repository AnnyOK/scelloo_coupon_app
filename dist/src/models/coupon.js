"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
exports.Coupon = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let Coupon = class Coupon extends sequelize_typescript_1.Model {
    static validateCoupon(couponCode, cartTotal, cartItemCount) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = null;
            const coupon = yield this.findOne({
                where: {
                    coupon_code: couponCode,
                },
            });
            if (coupon !== null &&
                coupon.isActive === true &&
                coupon.minimum_items &&
                coupon.minimum_items <= cartItemCount &&
                coupon.minimum_cart_total &&
                coupon.minimum_cart_total <= cartTotal) {
                response = coupon;
            }
            return response;
        });
    }
    static applyCoupon(cartTotal, coupon) {
        if (coupon.discount_type === 'fixed') {
            if (coupon.discount_amount === null)
                return 0;
            const adjusted_total = Math.max(cartTotal - coupon.discount_amount, 0);
            return { discount: cartTotal - adjusted_total, adjusted_total };
        }
        else if (coupon.discount_type === 'percent') {
            if (coupon.discount_percent === null)
                return 0;
            const adjusted_total = cartTotal * (1 - coupon.discount_percent / 100);
            return { discount: cartTotal - adjusted_total, adjusted_total };
        }
        else if (coupon.discount_type === 'mixed') {
            let fixedDiscount = 0, percentDiscount = 0;
            if (coupon.discount_amount !== 0 && coupon.discount_amount !== null) {
                fixedDiscount = Math.max(coupon.discount_amount, 0);
            }
            if (coupon.discount_percent !== 0 && coupon.discount_percent !== null) {
                percentDiscount = cartTotal * (coupon.discount_percent / 100);
            }
            const adjusted_total = cartTotal - Math.max(fixedDiscount, percentDiscount);
            return { discount: cartTotal - adjusted_total, adjusted_total };
        }
        else if (coupon.discount_type === 'rejected') {
            const fixedDiscount = coupon.discount_amount === null ? 0 : coupon.discount_amount;
            const percentDiscount = coupon.discount_percent === null
                ? 0
                : cartTotal * (coupon.discount_percent / 100);
            const adjusted_total = cartTotal - (fixedDiscount + percentDiscount);
            return {
                discount: cartTotal - adjusted_total,
                adjusted_total,
            };
        }
        return { discount: 0, adjusted_total: cartTotal };
    }
};
exports.Coupon = Coupon;
__decorate([
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
    }),
    __metadata("design:type", Number)
], Coupon.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        allowNull: false,
        defaultValue: sequelize_typescript_1.DataType.UUIDV4
    }),
    __metadata("design:type", String)
], Coupon.prototype, "coupon_code", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
        defaultValue: 0
    }),
    __metadata("design:type", Number)
], Coupon.prototype, "minimum_cart_total", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        defaultValue: 0
    }),
    __metadata("design:type", Number)
], Coupon.prototype, "minimum_items", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Coupon.prototype, "discount_type", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
        defaultValue: 0
    }),
    __metadata("design:type", Number)
], Coupon.prototype, "discount_amount", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
        defaultValue: 0
    }),
    __metadata("design:type", Number)
], Coupon.prototype, "discount_percent", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    }),
    __metadata("design:type", Boolean)
], Coupon.prototype, "isActive", void 0);
exports.Coupon = Coupon = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: false,
        tableName: 'coupons',
    })
], Coupon);
