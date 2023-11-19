
import express from 'express';


const router = express.Router();

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
  router.route("/list").get(getList);
  router.route("/search").get(search);
  router.patch("/delete/:id", softDelete);
  router.route ("/:id").get(getDetail).put(update);
  router.route ("/getProductByCateId/:id").get(getProductByCatgoryId); 


export default router