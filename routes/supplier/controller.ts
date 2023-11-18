import { NextFunction, Request, Response } from 'express';
import { AppDataSource } from "../../data-source";
import { Employee } from "../../entities/employee.entity";
import { Supplier } from '../../entities/supplier.entity';

const repository = AppDataSource.getRepository(Supplier);

module.exports = {
    getAll: async (req: Request, res: Response, next: NextFunction) => {
      try {
        const suppliers = await repository.find();
        if (suppliers.length === 0) {
          res.status(204).send();
        } else {
          res.json(suppliers);
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
    },

    getDetail: async (req: Request, res: Response, next: any) => {
      try {
        const supplier = await repository.findOneBy({ id: parseInt(req.params.id) });
        if (!supplier) {
          return res.status(404).json({ error: 'Not found' });
        }
        res.json(supplier);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
    }, 
    create: async (req: Request, res: Response, next: any) => {
      try {
        const supplier = new Supplier();
        Object.assign(supplier, req.body);
        await repository.save(supplier);
        res.status(201).json(supplier);
      } catch (error) {
        console.error(error);
        res.status(400).json({ error });
      }
    }, 
    update:async (req: Request, res: Response, next: any) => {
      try {
        const supplier = await repository.findOneBy({ id: parseInt(req.params.id) });
        if (!supplier) {
          return res.status(404).json({ error: 'Not found' });
        }
    
        Object.assign(supplier, req.body);
        await repository.save(supplier);
    
        const updatedCategory = await repository.findOneBy({ id: parseInt(req.params.id) });
        res.json(updatedCategory);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
    }, 
    softDelete: async (req: Request, res: Response, next: any) => {
      try {
        const supplier = await repository.findOneBy({ id: parseInt(req.params.id) });
        if (!supplier) {
          return res.status(404).json({ error: 'Not found' });
        }
        await repository.delete({ id: supplier.id });
        res.status(200).send('delete thanh cong');
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
    }, 
}