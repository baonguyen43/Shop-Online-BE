import { Request, Response } from 'express';
import { AppDataSource } from '../../data-source';
import { CartDetails } from '../../entities/cartDetails.entity';
import { Cart } from '../../entities/cart.entity';
import { Customer } from '../../entities/customer.entity';
import { Product } from '../../entities/product.entity';


const cartRepository = AppDataSource.getRepository(Cart);
const cartDetailRepository = AppDataSource.getRepository(CartDetails);

const productRepository = AppDataSource.getRepository(Product);
const customerRepository = AppDataSource.getRepository(Customer);



module.exports = {
    getDetail: async (req: Request, res: Response, next: any) => {
      try {
        const { id } = req.params;
        const customerId = parseInt(id);

        const  result = await cartRepository.findOneBy({customerId });
    
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
    const customer = await customerRepository.findOne(customerId);
    if (!customer) {
      return res.status(404).json({ error: 'Khách hàng không tồn tại' });
    }
    const product = await productRepository.findOne(productId);
    if (!product) {
      return res.status(404).json({ error: 'Sản phẩm không tồn tại' });
    }

    if (product.stock < quantity) {
      return res.status(400).json({ error: 'Không đủ số lượng sản phẩm trong kho' });
    }
    const cart = new Cart();
    cart.customer = customer;
    const cartDetails = new CartDetails();
    cartDetails.product = product;
    cartDetails.quantity = quantity;
    cartDetails.cart = cart;

    await cartRepository.save(cart);
    await cartDetailRepository.save(cartDetails);

          } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
          }
    }, 

    remove:async (req: Request, res: Response, next: any) => {
      try {
        const { customerId, productId } = req.body;
        const cart = await cartRepository.findOne(customerId);
    
        if (!cart) {
          return res.status(404).json({ error: 'Không tìm thấy giỏ hàng' });
        }
    
        if (cart.products.length === 1 &&
           cart.products[0].productId === productId) {
          await cartRepository.remove(cart);
    
          return res.status(200).json({ message: 'Đã xóa giỏ hàng' });
        }
        else 
        {
        const updatedProducts = cart.products.filter(product => product.productId !== productId);
    
        cart.products = updatedProducts;
        await cartRepository.save(cart)
          
        }
        return res.status(200).json({ message: 'Đã cập nhật giỏ hàng' });
      } catch (error) {
        return res.status(500).json({ code: 500, error: error });
        
      }
    
    }
 
}

