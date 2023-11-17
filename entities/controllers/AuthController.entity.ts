
import { Request, Response } from "express";
import { validate } from "class-validator";
import { AppDataSource } from "../../data-source";
import { User } from './../user.entitty';


class AuthController {
// REGISTER
  static register = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    let user = new User();
    user.email = email;
    user.password = user.setPassword(password);

    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }
    const useRepository = AppDataSource.getRepository(User);
    try {
      await useRepository.save(user);

    } catch (error) {
      res.status(400).send("User already exists");
      return;
    }
    res.status(200).send("User Created");
  };
// LOGIN
  static login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!(email && password)) {
      res.status(400).send();
    }
    const userRepository = AppDataSource.getRepository(User);
    try {
        const user = await userRepository.findOne({ where:{email: email} });
      if (!user || !user.isValidPassword(password)) {
        res.status(401).send("Incorrect Password ");
        return;
      }
      res.status(200).json({ access_token: user.generateJWT() });
    } catch (error) {
      res.status(401).send(error);
    }
  };
}
export default AuthController;
