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
const validationSchema = yup.object().shape({
    body: yup.object({
        name: yup.string().max(500, "Tên Quá dài").required("Không được bỏ trống"),
        email: yup
            .string()
            .email()
            .max(50, "Email Quá dài")
            .required("Không được bỏ trống"),
        phoneNumber: yup
            .string()
            .max(50, "Sdt quá dài")
            .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, "Số điện thoại sai rồi")
            .required("Không được bỏ trống"),
        address: yup
            .string()
            .max(50, "Address Quá dài")
            .required("Không được bỏ trống"),
    }),
});
exports.default = validationSchema;
