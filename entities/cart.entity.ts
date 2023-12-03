import { IsNotEmpty, Min } from "class-validator";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn
} from "typeorm";
import { Customer } from "./customer.entity";
import { Product } from "./product.entity";

@Entity({ name: "Carts" })
export class Cart {
  @PrimaryGeneratedColumn({ name: "cartId" })
  id: number;

  @Column({ type: "int" })
  customerId: number;

  @IsNotEmpty({message:"Không được bỏ trống"})
    @Min(1,{message: "Số lượng không hợp lệ"})
    @Column({type:'int'})
    quantity: number;

    @PrimaryColumn({ type: 'int' })
    productId: number;
  // @IsNotEmpty()
  // @Column()
  // products: CartDetails[];

  // RELATIVE
 

  @ManyToOne(() => Customer, { eager: true })
  @JoinColumn({ name: "customerId" })
  customer: Customer;

  @ManyToOne(()=> Product, (p) => p.cart)
  @JoinColumn({ name: 'productId' })
  product: Product
}
