import express, { Express, NextFunction, Request, Response } from 'express';

import { AppDataSource } from '../data-source';
import { Employee } from '../entities/employee.entity';

const router = express.Router();

const repository = AppDataSource.getRepository(Employee);

/* GET employees */
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const employees = await repository.find();
    if (employees.length === 0) {
      res.status(204).send();
    } else {
      res.json(employees);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/* GET employee by id */
router.get('/:id', async (req: Request, res: Response, next: any) => {
  try {
    const employee = await repository.findOneBy({ id: parseInt(req.params.id) });
    if (!employee) {
      return res.status(404).json({ error: 'Not found' });
    }
    res.json(employee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/* Create employee */
router.post('/', async (req: Request, res: Response, next: any) => {
  try {
    
    const employee = new Employee();
    Object.assign(employee, req.body);
    await repository.save(employee);
    res.status(201).json(employee);
  } catch (error) {
    
    console.error(error);
    res.status(400).json({ error });
  }
});

/* Update employee */
router.patch('/:id', async (req: Request, res: Response, next: any) => {
  try {
    const employee = await repository.findOneBy({ id: parseInt(req.params.id) });
    if (!employee) {
      return res.status(404).json({ error: 'Not found' });
    }
    
    Object.assign(employee, req.body);
    await repository.save(employee);

    const updatedCategory = await repository.findOneBy({ id: parseInt(req.params.id) });
    res.json(updatedCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



/* DELETE employee */
router.delete('/:id', async (req: Request, res: Response, next: any) => {
  try {
    const employee = await repository.findOneBy({ id: parseInt(req.params.id) });
    if (!employee) {
      return res.status(404).json({ error: 'Not found' });
    }
    await repository.delete({ id: employee.id });
    res.status(200).send('delete thanh cong');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
