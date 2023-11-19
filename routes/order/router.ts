import express from 'express';


const router = express.Router();
const {getAll, getDetail, create, } = require("./controller")

router.route("/").get(getAll).post(create); 

router.route("/:id")
        .get(getDetail)

export default router;