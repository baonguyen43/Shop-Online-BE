const JWT = require("jsonwebtoken");
import SECRET from '../constant/jwtSetting';

//tạo TOKEN
export const generateToken = (user:any) => {
  const expiresIn = "30d";
  const algorithm = "Hs256";

  return JWT.sign(
    {
      iat: Math.floor(Date.now() / 1000),
      // email: user.email,
      // name: user.firstName, 
      ...user,
      algorithm,
    },
    SECRET,
    {
      expiresIn,
    }
  );
};
// console.log('SECRET key  :>> ', SECRET);
export  const passportVerifyAccount = (id:any) => {
  const expiresIn = "30d";
  return JWT.sign({ id },SECRET, { expiresIn });
};
