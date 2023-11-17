import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

@Entity({name: 'Users'})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;
  
  @Column()
  password: string;
  

  setPassword = (password: string ) => {
    return ( this.password = bcrypt.hashSync(password, 8));
  }; 

  isValidPassword = (password: string) => {
    return bcrypt.compareSync(password, this.password); 
  }

  generateJWT = () => {
    return jwt.sign ( {
      email: this.email,
    },
    "SECRET",
    {
      expiresIn:'1h'
    }
    )
  }
}
