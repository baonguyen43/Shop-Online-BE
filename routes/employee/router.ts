import express from 'express';

const {validateSchema} = require("../../helper/validateSchema")
const {getDetailSchema, createSchema} = require("./validation")

const router = express.Router();
const {getAll, getDetail, create, update, softDelete } = require("./controller")

router.route("/").get(getAll).post(validateSchema(createSchema),create); 

router.route("/:id")
        .get(validateSchema(getDetailSchema),getDetail)
        .put(validateSchema(createSchema),update); 

router.patch("/delete/:id",validateSchema(getDetailSchema), softDelete);
export default router;