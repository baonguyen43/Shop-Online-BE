import express, { Express, NextFunction, Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Product } from '../entities/product.entity';
// import { CategoryInterface, SeparatingCategory } from '../entities/schemas/category-schema';
import { CategoryView } from '../entities/views/category-view.entity';
import { Like } from 'typeorm';
import { Customer } from '../entities/customer.entity';
import { Order } from '../entities/order.entity';

const router = express.Router();

const repository = AppDataSource.getRepository(Product);
const repositoryCustomer = AppDataSource.getRepository(Customer);
const repositoryOrder = AppDataSource.getRepository(Order);
// const categoryRepository = AppDataSource.getRepository<CategoryInterface>(SeparatingCategory); 
const viewRepository = AppDataSource.getRepository(CategoryView);
// console.log("SeparatingCategory", SeparatingCategory);

/* GET home page. */
router.get('/', function (req: Request, res: Response, next: any) {
  res.json({ message: 'Hello world!' });
});

// router.get('/call-separating-entity', async (req: Request, res: Response, next: any) => {
//   try {
//     const categories = await categoryRepository.find();
//     res.json(categories);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// Get Order by orderId
router.get('/call-raw-sql', async (req: Request, res: Response, next: any) => {
  try {
    const results = await repository.manager.connection.query('SELECT * FROM Orders AS O WHERE O.OrderId = @0', [38]);
    res.json(results);
    // res.json(toCamelCase(results));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get Products by Discount
router.get('/call-stored-procedure', async (req: Request, res: Response, next: any) => {
  try {
    const results = await repository.manager.connection.query('EXECUTE [dbo].[usp_Products_GetByDiscount] @0', [15]);
    res.json(toCamelCase(results));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get Products by Discount >= 45 
router.get('/super-sale', async (req: Request, res: Response, next: any) => {
  try {
    const query = 'SELECT * FROM Products as p WHERE p.Discount >= 40';
    const results = await repository.manager.connection.query(query);
    res.json(toCamelCase(results));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// LẤY SẢN PHẨM THEO GIẢM GIÁ
router.get('/product-discount', async (req: Request, res: Response, next: any) => {
  try {
    const discount = req.query.discount 
    const query = `SELECT * FROM Products as p WHERE p.discount >= ${discount}`;
    const results = await repository.manager.connection.query(query);
    res.json(toCamelCase(results));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// LẤY SẢN PHẨM THEO TỒN KHO
router.get('/product-stockless', async (req: Request, res: Response, next: any) => {
  try {
    const stock = req.query.stock 
    const query = `SELECT * FROM Products as p WHERE p.Stock < ${stock}`;
    const results = await repository.manager.connection.query(query);
    res.json(toCamelCase(results));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// LẤY SẢN PHẨM THEO DANH MỤC, NHÀ CUNG CẤP 
router.get('/product-category', async (req: Request, res: Response, next: any) => {
  try {
    const category = req.query.category  

    // TRẢ DATA KHI CHƯA NHẬP CATEGORY
    // const products = await repository.find({
    //   where: {
    //     category: {
    //       name: Like(`%${category}%`),
    //     },
    //   },
    //   relations: ['category'],
    // });

    // KHÔNG TRẢ DATA KHI CHƯA NHẬP CATEGORY
 let whereCondition = {};
    if (category) {
      whereCondition = {
        category: {
          name: Like(`%${category}%`),
        },
      };
    } else {
      // Nếu không có giá trị cho category, trả về mảng rỗng
      res.json([]);
      return;
    }
    const products = await repository.find({
      where: whereCondition,
      relations: ['category'],
    });

    res.json(toCamelCase(products));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/product-supplier', async (req: Request, res: Response, next: any) => {
  try {
    const supplier = req.query.supplier  
    const products = await repository.find({
      where: {
        supplier: {
          name: Like(`%${supplier}%`),
        },
      },
      relations: ['supplier'],
    });
    res.json(toCamelCase(products));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// SẢN PHẨM  có Giá bán nhỏ hơn 
router.get('/product-pricediscount', async (req: Request, res: Response, next: any) => {
  try {
    const total = req.query.total
    const query = `EXECUTE [dbo].[usp_GetProductsWith] @Total = ${total}` 
    const results = await repository.manager.connection.query(query);
    res.json(toCamelCase(results));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// SẢN PHẨM  không bán được trong khoảng ngày 
router.get('/product-notsell', async (req: Request, res: Response, next: any) => {
  try {
    const fromDate = req.query.fromDate
    const toDate = req.query.toDate
    const query = `EXECUTE [dbo].[usp_ProductNotSell] @FromDate = '${fromDate}',@ToDate = '${toDate}'  ` 
    const results = await repository.manager.connection.query(query);
    res.json(toCamelCase(results));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// SẢN PHẨM  bán  được trong khoảng ngày 
router.get('/products-sold', async (req: Request, res: Response, next: any) => {
  try {
    const fromDate = req.query.fromDate;
    const toDate = req.query.toDate;
    
    const query = `EXECUTE [dbo].[usp_ProductSell] @FromDate = '${fromDate}', @ToDate ='${toDate}'`;
    const results = await repository.manager.connection.query(query);
    
    res.json(toCamelCase(results));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});




// KHÁCH HÀNG 
// Hiển thị khách hàng theo địa chỉ
router.get('/customers-address', async (req: Request, res: Response, next: any) => {
  try {
    const address = req.query.address;
    const query = `EXECUTE [dbo].[usp_GetCustomerAddress] @Address = ${address}`;
    const results = await repositoryCustomer.manager.connection.query(query);
    
    res.json(toCamelCase(results));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// các khách hàng có tuổi từ
router.get('/customers-age', async (req: Request, res: Response, next: any) => {
  try {
    const minAge = req.query.minAge;
    const maxAge = req.query.maxAge;
    const query = `EXECUTE [dbo].[usp_CustomerAge] @MinAge = ${minAge}, @MaxAge=${maxAge}`;
    const results = await repositoryCustomer.manager.connection.query(query);
    
    res.json(toCamelCase(results));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Hiển thị năm sinh của khách hàng 
router.get('/customers/get-by-year-of-birthday/:year', async (req: Request, res: Response, next: any) => {
  try {
    const results = await repository.manager.connection.query('EXECUTE [dbo].[usp_GetCustomerYear] @0', [req.params.year]);
    res.json(toCamelCase(results));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// ORDER
router.get('/orders-status', async (req, res) => {
  try {
    const date = req.query.date;
    const status = req.query.status;
    const query = `EXECUTE [dbo].[usp_OrderStatus] @Date = '${date}', @Status = '${status}'`;
    
    const results = await repositoryOrder.manager.connection.query(query);
    
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/orders-payment', async (req, res) => {
  try {
    const paymentMethod = req.query.paymentMethod;
    const status = req.query.status;
    const query = `EXECUTE [dbo].[usp_OrdersPayment] @PaymentMethod = '${paymentMethod}', @Status = '${status}'`;
    
    const results = await repositoryOrder.manager.connection.query(query);
    
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
//Hiển thị các đơn hàng có trạng thái trong ngày
router.get('/get-order-status-date', async (req: Request, res: Response, next: any) => {
  try {
    const date = req.query.date;
    const status = req.query.status
    const results = await repository.manager.connection.query('EXECUTE [dbo].[usp_GetOrderStatusDay] @Date = @0, @Status = @1', [date,status ]);
    res.json(toCamelCase(results));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// HIển thị các đơn hàng ko bán dc trong khoảng ngày 
router.get('/get-order-product-not-sell', async (req: Request, res: Response, next: any) => {
  try {
    const fromDate = req.query.date;
    const toDate = req.query.date
    const results = await repository.manager.connection.query('EXECUTE [dbo].[usp_ProductNotSell] @FromDate = @0, @ToDate = @1', [fromDate, toDate ]);
    res.json(toCamelCase(results));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// HIển thị các khách hàng mua trong khoảng ngày ERROR
router.get('/get-customer-buy-onday', async (req: Request, res: Response, next: any) => {
  try {
    // const fromDate = req.query.datetime;
    // const toDate = req.query.datetime
    const results = await repository.manager.connection.query('EXECUTE [dbo].[usp_Customer_BuyDay] @FromDate = @0, @ToDate = @1', ['2023-01-01', '2023-12-01' ]);
    res.json(toCamelCase(results));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//Hiển thị khách hàng từ tuổi tới tuổi 
router.get('/get-age-customer', async(req: Request, res: Response, next:any)=> {
  try {
    // const minAge = req.query.int;
    // const maxAge = req.query.int; 
    const results = await repository.manager.connection.query('EXECUTE [dbo].[usp_GetAgeCustomerFromTo] @MinAge = @0, @MaxAge = @1', [10, 20]);
    res.json(results)
  } catch (error) {
    console.error(error);
    res.status(500).json({error:'Internal server error'})
  }
}) 

router.get('/view', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await viewRepository.find();

    if (categories.length === 0) {
      res.status(204).send();
    } else {
      res.json(categories);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

interface AnyObject {
  [key: string]: any;
}

function toCamelCase(o: AnyObject) {
  var newO: AnyObject = {},
    origKey: string,
    newKey: string,
    value: any;
  if (o instanceof Array) {
    return o.map(function (value) {
      if (typeof value === 'object') {
        value = toCamelCase(value);
      }
      return value;
    });
  } else {
    for (origKey in o) {
      if (o.hasOwnProperty(origKey)) {
        newKey = (origKey.charAt(0).toLowerCase() + origKey.slice(1) || origKey).toString();
        value = o[origKey];
        if (value instanceof Array || (value !== null && value.constructor === Object)) {
          value = toCamelCase(value);
        }
        newO[newKey] = value;
      }
    }
  }
  return newO;
}

export default router;
