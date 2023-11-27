import express from 'express';


const router = express.Router();
const {getAll, getDetail, create, update, softDelete } = require("./controller")
const {validateSchema} = require("../../helper/index")
const {validationSchema} = require("./validation");
router.route("/").get(getAll).post(validateSchema(validationSchema),create); 

router.route("/:id")
        .get(getDetail)
        .put(validateSchema(validationSchema),update); 

router.patch("/delete/:id", softDelete);
export default router;