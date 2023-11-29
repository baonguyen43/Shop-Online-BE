
// const BasicStrategy = require("passport-http").BasicStrategy;
const {Strategy: LocalStrategy} = require("passport-local");
const {ExtractJwt, Strategy: JwtStrategy} = require('passport-jwt'); 
import SECRET from "../constant/jwtSetting";
import { Customer } from "../entities/customer.entity";

const passportVerifyAccount = new LocalStrategy( {usernameField: 'email'}, 
  async function (email: string, password: string, done: any) {
        //check username password ko cần check trong login nưa
    try {
      const user = await Customer.findOne({ where: {email} });
      
      if (!user) return done(null, false);

      const isCorrectPass = await user.isValidPass(password);
      
      if (!isCorrectPass) return done(null, false);

      return done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
);

const passportVerifyToken = new JwtStrategy (
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken("Authorization"),
    secretOrKey: SECRET,
  },
  async (payload:any, done:any) => {
    try {
      const user = await Customer.findOne({
        where: { id: payload.id },
      });
      if (!user) return done(null, false);

      user.password = ''; 
      return done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
)


export {
    passportVerifyAccount,
    passportVerifyToken
};

