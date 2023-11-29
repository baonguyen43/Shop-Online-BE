import express from 'express';


const {validateSchema} = require("../../helper/validateSchema")
const {createSchema} = require("./validation");
const router = express.Router();
const {getAll, getDetail, create,updateStatus } = require("./controller")

router.route("/").get(getAll).post(validateSchema(createSchema),create); 

router.route("/:id")
        .get(getDetail)
router.route("/status/:id")
        .patch(updateStatus)
export default router;