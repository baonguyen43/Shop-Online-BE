import express, { Request, Response } from 'express';

import AuthController from '../entities/controllers/AuthController.entity';
import { AppDataSource } from '../data-source';
import { User } from '../entities/user.entitty';
import { validate } from 'class-validator';



// router.post('/register',AuthController.register);
const router = express.Router();
const repository = AppDataSource.getRepository(User);

router.post('/register', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  let user = new User();
  user.email = email;
  user.password = user.setPassword(password);

  try {
    await repository.save(user);
  } catch (error) {
    res.status(404).send("User already exists");
    return;
  }

  res.status(200).send("User Created");
});

export default router;
  
// router.post('/login',AuthController.login);

