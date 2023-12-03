"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const { validateSchema } = require("../../helper/validateSchema");
const { createSchema } = require("./validation");
const router = express_1.default.Router();
const { getAll, getDetail, create, updateStatus } = require("./controller");
router.route("/").get(getAll).post(validateSchema(createSchema), create);
router.route("/:id")
    .get(getDetail);
router.route("/status/:id")
    .patch(updateStatus);
exports.default = router;
