import express from 'express';


const {validateSchema} = require("../../helper/validateSchema")
const {createSchema} = require("./validation");
const router = express.Router();
const {getAll, getDetail, create,updateStatus , updateOrderDetail} = require("./controller")

router.route("/").get(getAll).post(create); 

router.route("/:id")
        .get(getDetail)
        .put(updateOrderDetail)

router.route("/status/:id")
        .put(updateStatus, updateOrderDetail)
    
export default router;