import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Order } from './order.entity';
// import { IsNotEmpty, MaxLength } from 'class-validator';

@Entity({ name: 'Customers' })
export class Customer {
  // ----------------------------------------------------------------------------------------------
  // ID
  // ----------------------------------------------------------------------------------------------
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;

  // ----------------------------------------------------------------------------------------------
  // NAME
  // ----------------------------------------------------------------------------------------------
  @Column({ name: 'FirstName', length: 50 })
  firstName: string;

  @Column({ name: 'LastName', length: 50 })
  lastName: string;
  // ----------------------------------------------------------------------------------------------
  // PHONE NUMBER
  // ----------------------------------------------------------------------------------------------
  @Column({ name: 'PhoneNumber', length: 50, unique: true })
  phoneNumber: string;

  // ----------------------------------------------------------------------------------------------
  // EMAIL
  // ----------------------------------------------------------------------------------------------
  @Column({ name: 'Email', length: 100, unique: true })
  email: string;

  // ----------------------------------------------------------------------------------------------
  @Column({ name: 'Address' })
  address: string;

  @Column({name:'Birthday' })
  birthday: boolean
  // ----------------------------------------------------------------------------------------------

  @OneToMany(() => Order, (o) => o.customer)
  orders: Order[];

}
