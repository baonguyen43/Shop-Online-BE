import express from 'express';

const {validateSchema} = require("../../helper/index")
const { getDetailSchema, removeSchema, createSchema } = require("./validation");


const router = express.Router();
const {remove, getDetail, create } = require("./controller")

router.route("/")
.post(validateSchema(createSchema),create)
.delete(validateSchema(removeSchema), remove);

router.route("/:id").get(validateSchema(getDetailSchema), getDetail);


export default router;