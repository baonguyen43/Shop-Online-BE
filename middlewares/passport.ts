// import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
// import { SECRET } from "../constant/jwtSetting";
// import { Customer } from "../entities/customer.entity";

// const passportVerifyToken = new JwtStrategy(
//   {
//     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken("Authorization"),
//     secretOrKey: SECRET,
//   },
//   async (payload: any, done: any) => {
//     try {
//       const user = await Customer.findOne({
//         id: id,
//       }).select("-password");

//       if (!user) return done(null, false);

//       return done(null, user);
//     } catch (error) {
//       done(error, false);
//     }
//   }
// );

// // const passportVerifyAccount = new LocalStrategy(
// //   { usernameField: "email" },
// //   async (email: string, password: string, done: any) => {
// //     try {
// //       console.log("Nguyenne email Nguyenne", email);
// //       console.log("Nguyenne password Nguyenne", password);

// //       const user = await Customer.findOne({
// //         isDeleted: false,
// //         email,
// //       });

// //       if (!user) return done(null, false);

// //       const isCorrectPass = await user.isValidPass(password);

// //       user.password = undefined;

// //       if (!isCorrectPass) return done(null, false);

// //       return done(null, user);
// //     } catch (error) {
// //       done(error, false);
// //     }
// //   }
// // );

// // const passportConfigBasic = new BasicStrategy(
// //   async function (username: string, password: string, done: any) {
// //     try {
// //       const user = await Employee.findOne({ email: username });

// //       if (!user) return done(null, false);

// //       const isCorrectPass = await user.isValidPass(password);

// //       if (!isCorrectPass) return done(null, false);

// //       return done(null, user);
// //     } catch (error) {
// //       done(error, false);
// //     }
// //   }
// // );

// export {
//   passportVerifyToken,
//   passportVerifyAccount,
//   passportConfigBasic,
// };