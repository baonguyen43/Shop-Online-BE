import { BaseEntity, BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { IsInt, IsNotEmpty, Length, Max, Min, validateOrReject } from 'class-validator';
import { Cart } from './cart.entity';
import { Category } from './category.entity';
import { OrderDetail } from './orderDetails.entity';
import { Supplier } from './supplier.entity';

@Entity({ name: 'Products' })
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;

  // ----------------------------------------------------------------------------------------------
  // NAME PRODUCTs
  // ----------------------------------------------------------------------------------------------
  @IsNotEmpty({message:"Tên sản phẩm không được bỏ trống"})
  @Length(5,50, {message: 'Tên sản phẩm từ $constraint1 tới $constraint2'})
  @Column({ name: 'Name', type: 'nvarchar'})
  name: string;

  // ----------------------------------------------------------------------------------------------
  // PRICE
  // ----------------------------------------------------------------------------------------------
  @IsNotEmpty({message:"Giá sản phẩm không được bỏ trống"})
  @IsInt()
  @Min(0,{message:' Giá không thể âm'})
  @Column({ name: 'Price', type: 'decimal', precision: 18, scale: 2 })
  
  price: number;

  // ----------------------------------------------------------------------------------------------
  // DISCOUNT
  // ----------------------------------------------------------------------------------------------
  @IsNotEmpty({message:"Giảm giá không được bỏ trống"})
  @IsInt()
  @Min(0)
  @Max(75)
  @Column({ name: 'Discount', type: 'decimal', precision: 18, scale: 2, default: 0 })
  discount: number;

  // ----------------------------------------------------------------------------------------------
  // STOCK
  // ----------------------------------------------------------------------------------------------
  @IsNotEmpty({message:"Tồn kho không được bỏ trống"})
  @IsInt()
  @Min(0,{message: "Số lượng tồn kho không hợp lệ"})
  @Column({ name: 'Stock', type: 'decimal', precision: 18, scale: 2, default: 0 })
  stock: number;

  // ----------------------------------------------------------------------------------------------
  // DESCRIPTION
  // ----------------------------------------------------------------------------------------------
  @IsNotEmpty({message:"Mô tả không được bỏ trống"})
  @Length(5,300,{message:"Mô tả không được ngắn hơn $constraint1 và dài hơn $constraint2 ký tự "})
  @Column({ name: 'Description', type: 'nvarchar', length: 'MAX', nullable: true })
  description: string;

  // ----------------------------------------------------------------------------------------------
  // IMAGEPATH
  // ----------------------------------------------------------------------------------------------
  @IsNotEmpty({message:"Đường dẫn ảnh không được bỏ trống"})
  @Length(5,300,{message:"Đường dẫn ảnh không được ngắn hơn $constraint1 và dài hơn $constraint2 ký tự "})
  @Column({ name: 'ImagePath', type: 'nvarchar', length: 'MAX', nullable: true })
  imagePath: string;

  // ----------------------------------------------------------------------------------------------
  // CATEGORY ID
  // ----------------------------------------------------------------------------------------------
  @IsNotEmpty({message:"Mã danh mục không được bỏ trống"})
  @Column({ type: 'int' })
  categoryId: number;

  // ----------------------------------------------------------------------------------------------
  // SUPPLIER ID
  // ----------------------------------------------------------------------------------------------
  @IsNotEmpty({message:"Mã nhà cung cấp không được bỏ trống"})
  @Column({ type: 'int' })
  supplierId: number;

  // ----------------------------------------------------------------------------------------------
  // RELATIONS
  // ----------------------------------------------------------------------------------------------
  @ManyToOne(() => Category, (c) => c.products)
  category: Category;

  @ManyToOne(() => Supplier, (s) => s.products)
  supplier: Supplier;

  @OneToMany(() => OrderDetail, (od) => od.product)
  orderDetails: OrderDetail[];

  @OneToMany(() => Cart, (cd) => cd.product)
  cart: Cart[];
  
  @BeforeInsert()
  @BeforeUpdate()
  async validate() {
    await validateOrReject(this);
  }
}