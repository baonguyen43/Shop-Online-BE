"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.passportVerifyAccount = exports.generateToken = void 0;
const JWT = require("jsonwebtoken");
const jwtSetting_1 = __importDefault(require("../constant/jwtSetting"));
//tạo TOKEN
const generateToken = (user) => {
    const expiresIn = "30d";
    const algorithm = "Hs256";
    return JWT.sign(Object.assign(Object.assign({ iat: Math.floor(Date.now() / 1000) }, user), { algorithm }), jwtSetting_1.default, {
        expiresIn,
    });
};
exports.generateToken = generateToken;
// console.log('SECRET key  :>> ', SECRET);
const passportVerifyAccount = (id) => {
    const expiresIn = "30d";
    return JWT.sign({ id }, jwtSetting_1.default, { expiresIn });
};
exports.passportVerifyAccount = passportVerifyAccount;
