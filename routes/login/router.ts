import express from 'express';

const passport = require("passport");
const { loginSchema } = require("./validation");
const router = express.Router();
const { login} = require("./controller")
const {validateSchema} = require("../../helper/index")
router.route("/").post(
        validateSchema(loginSchema), //check email password hợp lệ không 
        // passport.authenticate("local", { session: false }),  //check vs email, password xem tài khoản có tồn tại không 
        login);                                                 // xử lí login

export default router;