import express from 'express';

const {validateSchema} = require("../../helper/validateSchema")
const { getDetailSchema, removeSchema, createSchema } = require("./validation");


const router = express.Router();
const {getAll, getDetail, create } = require("./controller")

router.route("/").post(validateSchema(createSchema),create)
// .delete(validateSchema(removeSchema), remove);
router.route("/").get(getAll)
router.route("/:id").get(validateSchema(getDetailSchema), getDetail);


export default router;