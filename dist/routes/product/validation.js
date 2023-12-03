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
        name: yup
            .string()
            .max(50, "Tên quá dài")
            .required("Tên không được bỏ trống"),
        price: yup
            .number()
            .min(0, "Giá không thể âm")
            .integer()
            .required(({ path }) => `${path.split(".")[1]} không được bỏ trống`),
        discount: yup
            .number()
            .min(0, "Giảm giá không thể âm")
            .max(75, "Giảm giá quá lớn")
            .integer()
            .required(({ path }) => `${path.split(".")[1]} không được bỏ trống`),
        stock: yup
            .number()
            .min(0, "Số lượng không hợp lệ")
            .integer()
            .required(({ path }) => `${path.split(".")[1]} không được bỏ trống`),
        description: yup
            .string()
            .max(3000, "Mô tả quá dài")
            .required(({ path }) => `${path.split(".")[1]} không được bỏ trống`),
        categoryId: yup
            .number().integer().positive().required(),
        supplierId: yup
            .number().integer().positive().required(),
    }),
});
const validationQuerySchema = yup.object().shape({
    query: yup.object({
        categoryId: yup
            .number().integer().positive().required(),
        supplierId: yup
            .number().integer().positive().required(),
        name: yup.string(),
        stockStart: yup.number().min(0),
        stockEnd: yup.number(),
        discountStart: yup.number().min(0),
        discountEnd: yup.number().max(50),
        skip: yup.number(),
        limit: yup.number(),
    }),
});
module.exports = {
    validationSchema,
    validationQuerySchema,
};
