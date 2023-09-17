import { Check, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';


import { Employee } from "./employee.entity";
import { Customer } from "./customer.entity";
import { OrderDetail } from './orderDetails.entity';

@Entity({ name: 'Orders' })
export class Order {
  @PrimaryGeneratedColumn({ name: 'OrderId' })
  id: number;

  // ----------------------------------------------------------------------------------------------
  // CreatedDate
  // ----------------------------------------------------------------------------------------------
  @Column({ name: 'CreatedDate', type: 'datetime', default:0 })
  createdDate: Date;

  @Column({ name: 'ShippedDate', type: 'datetime' })
  @Check('ShippedDate < CreatedDate')
  shippedDate: Date;
  // ----------------------------------------------------------------------------------------------
  // Status
  // ----------------------------------------------------------------------------------------------
  @Column({ name: 'Status', length: 50, default:'WAITTING' })
  @Check ("Status IN ('WAITTING', 'COMPLETED', 'CANCEL') ")
  status: string;
  
  // ----------------------------------------------------------------------------------------------
  // Description
  // ----------------------------------------------------------------------------------------------
  @Column({ name: 'Description', length: 500 })
  @Check ('90>= Discount >= 0')
  description: string;

  // ----------------------------------------------------------------------------------------------
  // ShippingAddress
  // ----------------------------------------------------------------------------------------------
  @Column({ name: 'ShippingAddress', length:500, nullable:true })
  shippingAddress: string;

  @Column({ name: 'ShippingCity', type: 'nvarchar', nullable: true, length: 50 })
  shippingCity: string;

  // ----------------------------------------------------------------------------------------------
  // PaymentType
  // ----------------------------------------------------------------------------------------------
  @Column({ name: 'PaymentType', length:20, default:'CASH'})
  @Check ("PaymentType in ('CASH','CREDIT CARD')")
  paymentType: string;

  @Column({ type: 'int' })
  customerId: number;

  @Column({ type: 'int' })
  employeeId: number;

  // RELATIONS
  @ManyToOne(() => Customer, (c) => c.orders)
  customer: Customer;

  @ManyToOne(() => Employee, (e) => e.orders)
  employee: Employee;

  @OneToMany(() => OrderDetail, (od) => od.order)
  orderDetails: OrderDetail[];
}
