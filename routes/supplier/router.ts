import express from 'express';

const {validateSchema} = require("../../helper/validateSchema")
const {validationSchema} = require("./validation");
const router = express.Router();
const {getAll, getDetail, create, update, softDelete } = require("./controller")

router.route("/").get(getAll).post(validateSchema(validationSchema),create); 

router.route("/:id")
        .get(getDetail)
        .put(validateSchema(validationSchema),update); 

router.patch("/delete/:id", softDelete);
export default router;