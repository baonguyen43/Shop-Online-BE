import { BaseEntity, Column, Entity, JoinColumn, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Customer } from "./customer.entity";
import { IsNotEmpty, Min } from "class-validator";
import { Product } from "./product.entity";
import { CartDetails } from "./cardDetails.entity";


@Entity({ name: 'Cart' })
export class Cart extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;

  @Column({type: 'int'  })
  customerId: number;


    // RELATIVE
  @OneToMany(() => CartDetails, (cd) => cd.cart)
    cardDetails: CartDetails[]; 
  @OneToMany(() => Customer, (C) => C.carts)
  customer: Customer;
}

