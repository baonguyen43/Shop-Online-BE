import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { Customer } from "../../entities/customer.entity";
import {generateToken, passportVerifyAccount} from '../../helper/jwtHelper';

const repository = AppDataSource.getRepository(Customer);

module.exports = {
  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      const userInfo = await repository.findOne({
        where: {
          email,
        },
      });
      if (!userInfo) {
        return res.status(404).json({ error: "Tài khoản không tồn tại" });
      }
      const isValidPass = await userInfo.isValidPass(password);
      if (isValidPass) {
        return res.status(200).json({ payload: userInfo });
      }
      return res
        .status(200)
        .json({ message: "Đăng nhập thành công " });


      // const token = generateToken(req.user)
      // // const refreshToken = passportVerifyAccount(req.params.id);
      // console.log('req.req.user :>> ', req.user);
      // return res.status(200).json({
      //   // token,
      //   // refreshToken,
     
      // })
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  //xác thực token đã gửi lên 
  loginS: async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json({
        message: "Get information success",
        payload: req.user,
      });
    } catch (err) {
      res.sendStatus(500);
    }
  },
};
