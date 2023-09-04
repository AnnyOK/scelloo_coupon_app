// @/connection.ts
import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv"
dotenv.config()
import { Coupon } from "../models/coupon";
import { User } from "../models/user";
import { Cart } from "../models/carts";
const connection = new Sequelize({
  dialect:"postgres",
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: false,
  models: [Coupon,User,Cart],
});

export default connection;