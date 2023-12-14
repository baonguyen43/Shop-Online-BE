import { BeforeInsert, BeforeUpdate, Check, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';


import { Employee } from "./employee.entity";
import { Customer } from "./customer.entity";
import { OrderDetail } from './orderDetails.entity';
import { IsDate, IsDateString, IsIn, IsNotEmpty, Length, isDateString, validateOrReject } from 'class-validator';
import moment from 'moment';

@Entity({ name: 'Orders' })
export class Order {
  @PrimaryGeneratedColumn({ name: 'OrderId' })
  id: number;

  // ----------------------------------------------------------
  // CreatedDate
  // -----------------------------------------------------------
  // @IsDateString()
  // @IsNotEmpty()
  @Column({ name: 'CreatedDate', type: 'datetime', default: ()=>'GETDATE()'})
  createdDate: Date;

  // ----------------------------------------------------------
  // ShippedDate
  // -----------------------------------------------------------
  // @IsNotEmpty()
  // @IsDateString()
  @Column({ name: 'ShippedDate', type: 'datetime', default: ()=>'GETDATE()' })
  shippedDate: Date;

  // ----------------------------------------------------------------------------------------------
  // Status
  // ----------------------------------------------------------------------------------------------
  // @IsNotEmpty()
  @IsIn(['WAITTING', 'COMPLETED', 'CANCEL'], { message: 'Trạng thái không hợp lệ' })
  @Column({ name: 'Status', length: 50, default:'WAITTING' })
  status: string;
  
  // ----------------------------------------------------------------------------------------------
  // Description
  // ----------------------------------------------------------------------------------------------
  // @IsNotEmpty({message:"Mô tả không được bỏ trống"})
  @Length(5,300,{message:"Mô tả không được ngắn hơn $constraint1 và dài hơn $constraint2 ký tự "})
  @Column({ name: 'Description', length: 500, nullable:true })
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
  // @IsNotEmpty({message:"Phương thức thanh toán không được bỏ trống"})
  @Column({ name: 'PaymentType', length:20, default:'CASH'})
  @IsIn(['CASH', 'CREDIT CARD'], { message: 'Phương thức thanh toán không hợp lệ' })
  paymentType: string;


  @Column({ type: 'int' })
  customerId: number;

  @Column({ type: 'int' })
  employeeId: number;


// ---------------------------------------------
  // RELATIONS
// ---------------------------------------------

  @ManyToOne(() => Customer, (c) => c.orders)
  customer: Customer;

  @ManyToOne(() => Employee, (e) => e.orders)
  employee: Employee;

  @OneToMany(() => OrderDetail, (od) => od.order)
  orderDetails: OrderDetail[];

  @BeforeInsert()
  @BeforeUpdate()
  async validate() {
    // const currentDate = new Date(); 
    // const currentDateTime = currentDate.setHours(0, 0, 0, 0);
    // if(this.createdDate.getTime() <  currentDateTime ){
    //   throw new Error('CreatedDate là ngày hiện tại hoặc lớn hơn')
    // }
    if(this.shippedDate < this.createdDate){
      throw new Error('ShippedDate must be greater than or equal to CreatedDate')
    }
    await validateOrReject(this);
  }
}