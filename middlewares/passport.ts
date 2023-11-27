
const BasicStrategy = require("passport-http").BasicStrategy;
import { Customer } from "../entities/customer.entity";

const passportConfigBasic = new BasicStrategy(
  async function (username: string, password: string, done: any) {
        //check username password ko cần check trong login nưa
    try {
      const user = await Customer.findOne({ where: {email: username} });
      
      if (!user) return done(null, false);

      const isCorrectPass = await user.isValidPass(password);

      if (!isCorrectPass) return done(null, false);

      return done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
);

export {
    passportConfigBasic
};

