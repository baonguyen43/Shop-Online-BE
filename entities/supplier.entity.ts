import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
// import { IsNotEmpty, MaxLength } from 'class-validator';
import { Product } from './product.entity';

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
  @Column({ name: 'Name', length: 100 })
  name: string;

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

  // ----------------------------------------------------------------------------------------------
  @OneToMany(() => Product, (p) => p.supplier)
  products: Product[];
}
