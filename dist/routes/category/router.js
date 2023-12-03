"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const { getAll, getDetail, create, update, softDelete } = require("./controller");
const { validateSchema } = require("../../helper/validateSchema");
const { validationSchema } = require("./validation");
router.route("/").get(getAll).post(validateSchema(validationSchema), create);
router.route("/:id")
    .get(getDetail)
    .put(validateSchema(validationSchema), update);
router.patch("/delete/:id", softDelete);
exports.default = router;
