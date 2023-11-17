import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BaseEntity, BeforeInsert, BeforeUpdate } from 'typeorm';
import { Order } from './order.entity';
import { IsDate, IsDateString, IsEmail, IsNotEmpty, IsPhoneNumber, Length, Max, Min, validateOrReject } from 'class-validator';
// import { IsNotEmpty, MaxLength } from 'class-validator';

@Entity({ name: 'Employees' })
export class Employee extends BaseEntity {
  // ----------------------------------------------------------------------------------------------
  // ID
  // ----------------------------------------------------------------------------------------------
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;

  // ----------------------------------------------------------------------------------------------
  // NAME
  // ----------------------------------------------------------------------------------------------
  @Length(1, 50 , { message:'Họ nhân viên lớn hơn $constraint1 và nhỏ hơn $constraint2 ký tự'} )
  @IsNotEmpty({message:'Họ không được bỏ trống'})
  @Column({ name: 'FirstName', length: 50 })
  firstName: string;

  @Length(1, 50 , { message:'Tên nhân viên lớn hơn $constraint1 và nhỏ hơn $constraint2 ký tự'} )
  @IsNotEmpty({message:'Tên không được bỏ trống'})
  @Column({ name: 'LastName', length: 50 })
  lastName: string;
  // ----------------------------------------------------------------------------------------------
  // PHONE NUMBER
  // ----------------------------------------------------------------------------------------------
  @IsNotEmpty({message:'Số điện thoại không được bỏ trống'})
  // @IsPhoneNumber()
  @Length(10, 11 , { message:'Số điện thoại phải từ $constraint1 tới $constraint2 số'} )
  @Column({ name: 'PhoneNumber', length: 50, unique: true })
  phoneNumber: string;
  
  // --------------------------------------------------
  // EMAIL
  // --------------------------------------------------
  @IsNotEmpty({message:'Email không được bỏ trống'})
  @IsEmail()
  @Column({ name: 'Email', length: 50, unique: true })
  email: string;

  // --------------------------------------------------
  // Address
  // --------------------------------------------------
  @IsNotEmpty({message:'Địa chỉ không được bỏ trống'})
  @Length(5,500, {message: 'Địa chỉ phải lớn hơn $constraint1 và nhỏ hơn $constraint2' })
  @Column({ name: 'Address' })
  address: string;

  // --------------------------------------------------
  // Birthday
  // --------------------------------------------------
  @IsNotEmpty({message:'Ngày sinh không được bỏ trống'})
  @IsDateString()
  @Column({name:'Birthday' })
  birthday: Date
  // ----------------------------------------------------------------------------------------------
 
  @OneToMany(() => Order, (o) => o.employee)
  orders: Order[];
  
  @BeforeInsert()
  @BeforeUpdate()
  async validate () {
    await validateOrReject(this); 
  }
}
