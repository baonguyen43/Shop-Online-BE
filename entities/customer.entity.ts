import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BeforeInsert, BeforeUpdate, BaseEntity } from "typeorm";
import { Order } from "./order.entity";
import { IsBtcAddress, IsDate, IsDateString, IsEmail, IsInt, IsNotEmpty, IsPhoneNumber, IsString, Length, Max, MaxLength, MinLength, validate, validateOrReject } from "class-validator";
import { Cart } from "./cart.entity";
// import { IsNotEmpty, MaxLength } from 'class-validator';
const bcrypt = require('bcryptjs')

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
  @IsString()
  @IsNotEmpty ({ message: 'Password không được bỏ trống'}) 
  @MinLength(5, { message: 'Không được ít hơn 5 ký tự' })
  @MaxLength(12, { message: 'Không được vượt quá 12 ký tự' })
  password: string;

  // ----------------
  // RELATIVE
  //---------------

  @OneToMany(() => Order, (o) => o.customer)
  orders: Order[];

  @OneToMany(() => Cart, (c) => c.customer)
  carts: Cart[];

    // HOOKS (AUTO VALIDATE)
    @BeforeInsert()
    @BeforeUpdate()
    async validate() {
      await validateOrReject(this);
    }

    async hashPassword() {
      if (this.password) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
      }
    }
    async isValidPass(password: string): Promise<boolean> {
      return bcrypt.compare(password, this.password);
    }
    
    async fullName() {
      return `${this.firstName} ${this.lastName}`
    }

}




// export class CreateUser {
//   @IsString()
//   @MaxLength(50, { message: 'Họ được vượt quá 50 ký tự' })
//   firstName: string;

//   @IsString()
//   @MaxLength(50, { message: 'Tên được vượt quá 50 ký tự' })
//   lastName: string;

//   @IsEmail({}, { message: 'Email không hợp lệ' })
//   email: string;

//   @IsPhoneNumber('VN', { message: 'Số điện thoại không hợp lệ' })
//   phoneNumber: string;

//   @IsString()
//   @MinLength(3, { message: 'Không được ít hơn 3 ký tự' })
//   @MaxLength(12, { message: 'Không được vượt quá 12 ký tự' })
//   password: string;
// }
// export class LoginUser {
//   @IsEmail({}, { message: 'Email không hợp lệ' })
//   email: string;

//   @IsString()
//   @MinLength(3, { message: 'Không được ít hơn 3 ký tự' })
//   @MaxLength(12, { message: 'Không được vượt quá 12 ký tự' })
//   password: string;
// }

// const validateCreateUser = async (data: CreateUser) => {
//   const errors = await validate(data);
//   if (errors.length > 0) {
//     throw new Error('Tạo thất bại');
//   }
// };

// const validateLoginUser = async (data: LoginUser) => {
//   const errors = await validate(data);
//   if (errors.length > 0) {
//     throw new Error('Đăng nhập thất bại');
//   }
// };

// export const createSchema = {
//   body: Customer,
// };

// export const loginSchema = {
//   body: LoginUser,
// };