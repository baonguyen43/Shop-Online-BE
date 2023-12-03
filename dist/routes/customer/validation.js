"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const yup = __importStar(require("yup"));
module.exports = {
    getDetailSchema: yup.object({
        params: yup.object({
            id: yup.number().integer().positive().required(),
        }),
    }),
    createSchema: yup.object({
        body: yup.object({
            firstName: yup.string().required().max(50, "Họ được vượt quá 50 ký tự"),
            lastName: yup.string().required().max(50, "Tên được vượt quá 50 ký tự"),
            email: yup
                .string()
                .required()
                // .email()
                .test("email type", "${path} Không phải email hợp lệ", (value) => {
                const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                return emailRegex.test(value);
            }),
            phoneNumber: yup
                .string()
                .required()
                .test("phoneNumber type", "${path} Không phải số điện thoại hợp lệ", (value) => {
                const phoneRegex = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
                return phoneRegex.test(value);
            }),
            address: yup
                .string()
                .required()
                .max(500, "Địa chỉ không được vượt quá 500 ký tự"),
            birthday: yup.date(),
            password: yup
                .string()
                .required()
                .min(3, "Không được ít hơn 3 ký tự")
                .max(12, "Không được vượt quá 12 ký tự"),
        }),
    }),
};
