"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const { validateSchema } = require("../../helper/validateSchema");
const { getDetailSchema, createSchema } = require("./validation");
const { getAll, getDetail, create, update, softDelete } = require("./controller");
router.route("/").get(getAll).post(validateSchema(createSchema), create);
router.route("/register").post(create);
router.route("/:id")
    .get(validateSchema(getDetailSchema), getDetail)
    .put(validateSchema(getDetailSchema), update);
router.patch("/delete/:id", validateSchema(getDetailSchema), softDelete);
exports.default = router;
