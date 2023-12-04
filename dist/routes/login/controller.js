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
const data_source_1 = require("../../data-source");
const customer_entity_1 = require("../../entities/customer.entity");
const repository = data_source_1.AppDataSource.getRepository(customer_entity_1.Customer);
module.exports = {
    login: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            const userInfo = yield repository.findOne({
                where: {
                    email,
                },
            });
            if (!userInfo) {
                return res.status(404).json({ error: "Tài khoản không tồn tại" });
            }
            const isValidPass = yield userInfo.isValidPass(password);
            if (isValidPass) {
                return res.status(200).json({ payload: userInfo });
            }
            return res
                .status(200)
                .json({ message: "Đăng nhập thành công " });
            // const token = generateToken(req.user)
            // // const refreshToken = passportVerifyAccount(req.params.id);
            // console.log('req.req.user :>> ', req.user);
            // return res.status(200).json({
            //   // token,
            //   // refreshToken,
            // })
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    }),
    //xác thực token đã gửi lên 
    loginS: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            res.status(200).json({
                message: "Get information success",
                payload: req.user,
            });
        }
        catch (err) {
            res.sendStatus(500);
        }
    }),
};
