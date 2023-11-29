import { Request, Response, NextFunction } from 'express';

const validateSchema = (schema:any) => async (req:Request, res: Response, next:NextFunction) => {
    // thực thi việc xác thực
    try {
      await schema.validate(
        {
          body: req.body,
          query: req.query,
          params: req.params,
        },
        {
          abortEarly: false,
        }
      );
      return next();
    } catch (error:any) {
      console.log("««««« err »»»»»", error);
      return res
        .status(400)
        .json({ type: error.name, error:'Không thành công', provider: "YUP" });
    }
  };

  module.exports = { validateSchema } 