import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BeforeInsert, BeforeUpdate, BaseEntity } from "typeorm";
import { Order } from "./order.entity";
import { IsBtcAddress, IsDate, IsDateString, IsEmail, IsInt, IsNotEmpty, IsPhoneNumber, Length, Max, validateOrReject } from "class-validator";
// import { IsNotEmpty, MaxLength } from 'class-validator';

@Entity({ name: "Customers" })
export class Customer extends BaseEntity {
  // ----------------------------------------------------------------------------------------------
  // ID
  // ----------------------------------------------------------------------------------------------
  @PrimaryGeneratedColumn({ name: "Id" })
  id: number;

  // ----------------------------------------------------------------------------------------------
  // NAME
  // ----------------------------------------------------------------------------------------------
  @IsNotEmpty ({ message: 'Họ không được bỏ trống'}) 
  @Length(1, 50 , { message:'Họ lớn hơn $constraint1 và nhỏ hơn $constraint2 ký tự'} )

  @Column({ name: "FirstName", length: 50 })
  firstName: string;


  @IsNotEmpty ({ message: 'Tên không được bỏ trống'}) 
  @Length(1, 50 , { message:'Họ lớn hơn $constraint1 và nhỏ hơn $constraint2 ký tự'} )
  @Column({ name: "LastName", length: 50 })
  lastName: string;

  // ----------------------------------------------------------------------------------------------
  // PHONE NUMBER
  // ----------------------------------------------------------------------------------------------
  // @IsPhoneNumber()
  @IsNotEmpty ({ message: 'Số điện thoại không được bỏ trống'}) 
  @Length(10, 11, {message: 'Số điện thoại phải là 10- 11 số '})
  @Column({ name: "PhoneNumber", length: 50, unique: true })
  phoneNumber: string;

  // ----------------------------------------------------------------------------------------------
  // EMAIL
  // ----------------------------------------------------------------------------------------------
  @IsEmail()
  @IsNotEmpty ({ message: 'Email không được bỏ trống'}) 
  @Column({ name: "Email", length: 50, unique: true })
  email: string;

  // ----------------
  // Address
  //---------------
  @IsNotEmpty ({ message: 'Địa chỉ không được bỏ trống'}) 
  @Length(0, 100, {message: 'Địa chỉ nhỏ hơn 100 ký tự '})
  @Column({ name: "Address" })
  address: string;


 // ----------------
  // Birthday
  //---------------
  @IsNotEmpty ({ message: 'Ngày sinh không được bỏ trống'}) 
  @IsDateString()
  @Column({ name: "Birthday" })
  birthday: Date;

  // ----------------------------------------------------------------------------------------------
  // Password
  //----------------------------------------------
  

  // ----------------
  // RELATIVE
  //---------------

  @OneToMany(() => Order, (o) => o.customer)
  orders: Order[];

    // HOOKS (AUTO VALIDATE)
    @BeforeInsert()
    @BeforeUpdate()
    async validate() {
      await validateOrReject(this);
    }
}
