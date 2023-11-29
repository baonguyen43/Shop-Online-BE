import { IsNotEmpty, Min } from "class-validator";
import { Column,JoinColumn, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { Product } from "./product.entity";
import { Cart } from "./cart.entity";


@Entity({ name: 'CartDetails'}) 
export class CartDetails {
    @PrimaryColumn({ type: 'int' })
    cartId: number;
    @PrimaryColumn({ type: 'int' })
    productId: number;

    @IsNotEmpty({message:"Không được bỏ trống"})
    @Min(0,{message: "Số lượng không hợp lệ"})
    @Column({type:'int'})
    quantity: number;

    // RELATIVE
    
    @ManyToOne(()=> Product, (p) => p.cartDetails)
    @JoinColumn({ name: 'productId' })
    product: Product
    @ManyToOne (()=> Cart, (c) => c.cartDetails)
    @JoinColumn({ name: 'cartId' })
    cart:Cart
}