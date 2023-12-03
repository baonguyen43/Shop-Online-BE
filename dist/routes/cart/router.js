"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const { validateSchema } = require("../../helper/validateSchema");
const { getDetailSchema, removeSchema, createSchema } = require("./validation");
const router = express_1.default.Router();
const { getAll, getDetail, create } = require("./controller");
router.route("/").post(validateSchema(createSchema), create);
// .delete(validateSchema(removeSchema), remove);
router.route("/").get(getAll);
router.route("/:id").get(validateSchema(getDetailSchema), getDetail);
exports.default = router;
