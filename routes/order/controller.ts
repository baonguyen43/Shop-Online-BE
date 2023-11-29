import { NextFunction, Request, Response } from 'express';
import { AppDataSource } from "../../data-source";
import { Order } from '../../entities/order.entity';
import { OrderDetail } from '../../entities/orderDetails.entity';

const repository = AppDataSource.getRepository(Order);

module.exports = {
    getAll: async (req: Request, res: Response, next: NextFunction) => {
        try {
            // SELECT * FROM [Products] AS 'product'
            const orders = await repository
              .createQueryBuilder('order')
              .leftJoinAndSelect('order.customer', 'customer')
              .leftJoinAndSelect('order.employee', 'employee')
              .leftJoinAndSelect('order.orderDetails', 'orderDetails')
              .leftJoinAndSelect('orderDetails.product', 'product')
              .leftJoinAndSelect('product.category', 'category')
              .leftJoinAndSelect('product.supplier', 'supplier')
              .select([
                'order.id',
                'order.createdDate',
                'order.shippedDate',
                'order.shippingAddress',
                'order.shippingCity',
                'order.paymentType',
                'order.status',
                'order.description',
                'order.customerId',
                'order.employeeId',
                'customer',
                'employee',
                'orderDetails.quantity',
                'orderDetails.price',
                'orderDetails.discount',
                'product',
                'category',
                'supplier',
              ])
              .getMany();
        
            if (orders.length === 0) {
              res.sendStatus(204);
            } else {
              res.json(orders);
            }
          } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
          }
    },


    getDetail: async (req: Request, res: Response, next: any) => {
        try {
            // SELECT * FROM [Products] AS 'product'
            const order = await repository
              .createQueryBuilder('order')
              .leftJoinAndSelect('order.customer', 'customer')
              .leftJoinAndSelect('order.employee', 'employee')
              .leftJoinAndSelect('order.orderDetails', 'orderDetails')
              .leftJoinAndSelect('orderDetails.product', 'product')
              .leftJoinAndSelect('product.category', 'category')
              .leftJoinAndSelect('product.supplier', 'supplier')
              .where('order.id = :id', { id: req.params.id })
              .select([
                'order.id',
                'order.createdDate',
                'order.shippedDate',
                'order.shippingAddress',
                'order.shippingCity',
                'order.paymentType',
                'order.status',
                'order.description',
                'order.customerId',
                'order.employeeId',
                'customer',
                'employee',
                'orderDetails.quantity',
                'orderDetails.price',
                'orderDetails.discount',
                'product',
                'category',
                'supplier',
              ])
              .getOne();
        
            if (order) {
              res.json(order);
            } else {
              res.sendStatus(204);
            }
          } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
          }
    }, 

    create:async (req: Request, res: Response) => 
    { 
        try {
            // const order = new Order();
            // Object.assign(order, req.body);
            // await repository.save(order);
            // res.status(201).json(order);
        
            const queryRunner = repository.manager.connection.createQueryRunner();
            await queryRunner.connect();
            // Begin transaction
            try {
              await queryRunner.startTransaction();
        
              const order = req.body as Order;
        
              // Lưu thông tin order
              const result = await queryRunner.manager.save(Order, order);
        
              // Lưu thông tin order details
              const orderDetails = order.orderDetails.map((od) => {
                return { ...od, orderId: result.id };
              });
        
              await queryRunner.manager.save(OrderDetail, orderDetails);
        
              // Commit transaction
              await queryRunner.commitTransaction();
        
              // Get order by id
              res.redirect(`/orders/${result.id}`);
            } catch (error) {
              await queryRunner.rollbackTransaction();
              res.status(400).json({ error });
            }
          } catch (error) {
            console.error(error);
            res.status(400).json({ error });
          }
    }, 

    updateStatus:async (req: Request, res: Response, next: any) => {
      try {
        const  id  = req.params;
        const { status } = req.body;
    
        // Kiểm tra xem order có tồn tại không
        const order = await repository.findOne(id);
        if (!order) {
          return res.status(404).json({ error: 'Order not found' });
        }
    
        // Cập nhật trạng thái của order
        if (status === 'CANCELED' || status === 'REJECTED' || status === 'COMPLETED') {
          order.status = status;
          await repository.save(order);
          res.json(order);
        } else {
          res.status(400).json({ error: 'Invalid status' });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
    }, 

    
}