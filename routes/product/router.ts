
import express from 'express';


const router = express.Router();

const {validateSchema} = require("../../helper/validateSchema")
const {validationSchema, validationQuerySchema} = require("./validation")

const {
  getDetail,
    getAll,
    search,
    create,
    update,
    softDelete,
    getList,
    getProductByCatgoryId
  } = require("./controller");

  router.route("/").get(getAll).post( create);
  router.route("/list").get(validateSchema(validationSchema),getList);
  router.route("/search").get(validateSchema(validationQuerySchema),search);
  router.patch("/delete/:id", softDelete);
  router.route ("/:id").get(getDetail).put(validateSchema(validationSchema),update);
  router.route ("/getProductByCateId/:id").get(getProductByCatgoryId); 

export default router