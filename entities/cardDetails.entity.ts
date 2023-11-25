import { IsNotEmpty, Min } from "class-validator";
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { Product } from "./product.entity";
import { Cart } from "./cart.entity";


@Entity({ name: 'CartDetails'}) 
export class CartDetails {
    @PrimaryColumn({ type: 'int' })
    productId: number;

    @IsNotEmpty({message:"Không được bỏ trống"})
    @Min(0,{message: "Số lượng không hợp lệ"})
    @Column({type:'int'})
    quantity: number;

    // RELATIVE
    @OneToMany(()=> Product, (p) => p.cardDetails)
    product: Product
    @ManyToOne (()=> Cart, (c) => c.cardDetails)
    cart:Cart
}