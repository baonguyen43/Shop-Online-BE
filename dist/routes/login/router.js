"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const passport = require("passport");
const { login, loginS } = require("./controller");
const { loginSchema, createSchema } = require("./validation");
const { validateSchema } = require("../../helper/validateSchema");
router.route("/")
    .post(validateSchema(loginSchema), //check email password hợp lệ không 
passport.authenticate("local", { session: false }), //check vs email, password xem tài khoản có tồn tại không 
login); // xử lí login
router.route("/loginS")
    .get(passport.authenticate("jwt", { session: false }), loginS);
exports.default = router;
