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
exports.getAllUser = exports.createNewUser = void 0;
const user_1 = require("../models/user");
const createNewUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = Object.assign({}, req.body);
    try {
        const newUser = yield user_1.User.create(payload);
        res.status(201).send(newUser);
    }
    catch (e) {
        res.status(500).send('internal server error');
    }
});
exports.createNewUser = createNewUser;
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allUsers = yield user_1.User.findAll();
    res.status(200).send(allUsers);
});
exports.getAllUser = getAllUser;
