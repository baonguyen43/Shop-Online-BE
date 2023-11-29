import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Customer } from "./customer.entity";
import { IsNotEmpty, Min } from "class-validator";
import { Product } from "./product.entity";
import { CartDetails } from "./cartDetails.entity";

@Entity({ name: "Cart" })
export class Cart {
  @PrimaryGeneratedColumn({ name: "Id" })
  id: number;

  @Column({ type: "int" })
  customerId: number;

  @IsNotEmpty()
  @Column()
  products: CartDetails[];

  // RELATIVE
  @OneToMany(() => CartDetails, (cd) => cd.cart, { cascade: true })
  cartDetails: CartDetails[];
  @ManyToOne(() => Customer, { eager: true })
  @JoinColumn({ name: "customerId" })
  customer: Customer;
}
