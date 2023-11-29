import express from 'express';


const router = express.Router();
const {validateSchema} = require("../../helper/validateSchema")
const {getDetailSchema, createSchema} = require("./validation")

const {getAll, getDetail, create, update, softDelete } = require("./controller")
router.route("/").get(getAll).post(validateSchema(createSchema),create); 

router.route("/register").post(create); 

router.route("/:id")
        .get(validateSchema(getDetailSchema),getDetail)
        .put(validateSchema(getDetailSchema),update); 

router.patch("/delete/:id", validateSchema(getDetailSchema), softDelete);
export default router;