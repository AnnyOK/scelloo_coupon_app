"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @/connection.ts
const sequelize_typescript_1 = require("sequelize-typescript");
const coupon_1 = require("./models/coupon");
const connection = new sequelize_typescript_1.Sequelize({
    dialect: "postgres",
    host: "localhost",
    username: "postgres",
    password: "secrect",
    database: "postgres",
    // "port": 5432,
    logging: false,
    models: [coupon_1.Coupon],
});
exports.default = connection;
