import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { Customer } from "../../entities/customer.entity";


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
        .json({ message: "Tài khoản hoặc mật khẩu ko đúng " });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};
