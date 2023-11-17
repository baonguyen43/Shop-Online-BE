import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BeforeInsert, BeforeUpdate } from 'typeorm';
// import { IsNotEmpty, MaxLength } from 'class-validator';
import { Product } from './product.entity';
import { IsEmail, IsNotEmpty, Length, validateOrReject } from 'class-validator';

@Entity({ name: 'Suppliers' })
export class Supplier {
  // ----------------------------------------------------------------------------------------------
  // ID
  // ----------------------------------------------------------------------------------------------
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;

  // ----------------------------------------------------------------------------------------------
  // NAME
  // ----------------------------------------------------------------------------------------------
  @IsNotEmpty({ message: 'Tên nhà cung cấp không được bỏ trống'}) 
  @Length(1, 50 , { message:'Tên nhà cung cấp lớn hơn $constraint1 và nhỏ hơn $constraint2 ký tự'} )
 @Column({ name: 'Name', length: 100 })
  name: string;

  // ----------------------------------------------------------------------------------------------
  // PHONE NUMBER
  // ----------------------------------------------------------------------------------------------
  
  @IsNotEmpty ({ message: 'Số điện thoại không được bỏ trống'}) 
  @Length(10, 11, {message: 'Số điện thoại phải là 10- 11 số '})
  @Column({ name: 'PhoneNumber', length: 50, unique: true })
  phoneNumber: string;

  // ----------------------------------------------------------------------------------------------
  // EMAIL
  // ----------------------------------------------------------------------------------------------
  @IsEmail()
  @IsNotEmpty ({ message: 'Số điện thoại không được bỏ trống'}) 
  @Column({ name: 'Email', length: 100, unique: true })
  email: string;

  // ----------------------------------------------------------------------------------------------
  @IsNotEmpty ({ message: 'Địa chỉ không được bỏ trống'}) 
  @Length(0, 100, {message: 'Địa chỉ nhỏ hơn 100 ký tự '})
  @Column({ name: 'Address' })
  address: string;

  // ----------------------------------------------------------------------------------------------
  @OneToMany(() => Product, (p) => p.supplier)
  products: Product[];

  @BeforeInsert()
  @BeforeUpdate()
  async validate() {
    await validateOrReject(this)
  }
}
