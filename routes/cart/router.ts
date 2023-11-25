import express from 'express';


const router = express.Router();
const {getAll, getDetail, create, update, softDelete } = require("./controller")

router.route("/").get(getAll).post(create); 

router.route("/:id")
        .get(getDetail)
        .put(update); 

router.patch("/delete/:id", softDelete);
export default router;