import express, { Express, NextFunction, Request, Response } from 'express';

import { AppDataSource } from '../data-source';
import { Customer } from '../entities/customer.entity';

const router = express.Router();

const repository = AppDataSource.getRepository(Customer);

/* GET customers */
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const customers = await repository.find();
    if (customers.length === 0) {
      res.status(204).send();
    } else {
      res.json(customers);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/* GET customer by id */
router.get('/:id', async (req: Request, res: Response, next: any) => {
  try {
    const customer = await repository.findOneBy({ id: parseInt(req.params.id) });
    if (!customer) {
      return res.status(404).json({ error: 'Not found' });
    }
    res.json(customer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/* Create customer */
router.post('/', async (req: Request, res: Response, next: any) => {
  try {
    
    const customer = new Customer();
    Object.assign(customer, req.body);
    await repository.save(customer);
    res.status(201).json(customer);
    console.log('Nguyenne customer Nguyenne', customer);
  } catch (error) {
    
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/* Update customer */
router.patch('/:id', async (req: Request, res: Response, next: any) => {
  try {
    const customer = await repository.findOneBy({ id: parseInt(req.params.id) });
    if (!customer) {
      return res.status(404).json({ error: 'Not found' });
    }

    Object.assign(customer, req.body);
    await repository.save(customer);

    const updatedCategory = await repository.findOneBy({ id: parseInt(req.params.id) });
    res.json(updatedCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/* DELETE customer */
router.delete('/:id', async (req: Request, res: Response, next: any) => {
  try {
    const customer = await repository.findOneBy({ id: parseInt(req.params.id) });
    if (!customer) {
      return res.status(404).json({ error: 'Not found' });
    }
    await repository.delete({ id: customer.id });
    res.status(200).send('delete thanh cong');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
