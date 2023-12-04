import express, { Express, NextFunction, Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Product } from '../entities/product.entity';
// import { CategoryInterface, SeparatingCategory } from '../entities/schemas/category-schema';
import { CategoryView } from '../entities/views/category-view.entity';

const router = express.Router();

const repository = AppDataSource.getRepository(Product);
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
