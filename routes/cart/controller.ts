import { NextFunction, Request, Response } from 'express';
import { AppDataSource } from '../../data-source';
import { Cart } from '../../entities/cart.entity';
import { Customer } from '../../entities/customer.entity';
import { Product } from '../../entities/product.entity';


const cartRepository = AppDataSource.getRepository(Cart);

const productRepository = AppDataSource.getRepository(Product);
const customerRepository = AppDataSource.getRepository(Customer);



module.exports = {
  getAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
        const carts = await cartRepository.find();
        if (carts.length === 0) {
          res.status(204).send();
        } else {
          res.json(carts);
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
},
    getDetail: async (req: Request, res: Response, next: any) => {
      try {
        const { id } = req.params;
        const customerId = parseInt(id);
        console.log('customerId :>> ', customerId);

        const  result = await cartRepository.findOneBy({customerId: customerId });
        console.log('result :>> ', result);
    
        if (result) {
          return res.send({ code: 200, payload: result });
        }
    
        return res.status(410).send({ code: 404, message: "Không tìm thấy" });
      } catch (err) {
        res.status(404).json({
          message: "Get detail fail!!",
          payload: err,
        });
      }
    }, 
    
    create: async (req: Request, res: Response, next: any) => {
        try {
          const { customerId, productId, quantity } = req.body;

    const customer = await customerRepository.findOneBy({id: customerId as number});
    console.log(customer);
    if (!customer) {
      return res.status(404).json({ error: 'Khách hàng không tồn tại' });
    }
    const product = await productRepository.findOneBy({id: productId as number});
    console.log(product);
    console.log(quantity);
    
    if (!product) {
      return res.status(404).json({ error: 'Sản phẩm không tồn tại' });
    }

    if (product.stock < quantity) {
      return res.status(400).json({ error: 'Không đủ số lượng sản phẩm trong kho' });
    }
    const cart = new Cart();
    cart.customer = customer;
    cart.product = product;
    cart.quantity = quantity;
    const result = await cartRepository.save(cart);

     
    res.json(result);
          } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
          }
    }, 

    // remove:async (req: Request, res: Response, next: any) => {
    //   try {
    //     const { customerId, productId } = req.body;
    //     const cart = await cartRepository.findOne(customerId);
    
    //     if (!cart) {
    //       return res.status(404).json({ error: 'Không tìm thấy giỏ hàng' });
    //     }
    
    //     if (cart.Length === 1 &&
    //        cart.productId === productId) {
    //       await cartRepository.remove(cart);
    
    //       return res.status(200).json({ message: 'Đã xóa giỏ hàng' });
    //     }
    //     else 
    //     {
    //     const updatedProducts = cart.cartDetails.filter(p => p.productId !== productId);
    
    //     cart.cartDetails = updatedProducts;
    //     await cartRepository.save(cart)
          
    //     }
    //     return res.status(200).json({ message: 'Đã cập nhật giỏ hàng' });
    //   } catch (error) {
    //     return res.status(500).json({ code: 500, error: error });
        
    //   }
    
    // }
 
}

