import { AppDataSource } from "../../data-source";
import { Customer } from "../../entities/customer.entity";
import express, { Express, NextFunction, Request, Response } from 'express';

const repository = AppDataSource.getRepository(Customer);

module.exports = {
    getAll: async (req: Request, res: Response, next: NextFunction) => {
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
    },

    getDetail: async (req: Request, res: Response, next: any) => {
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
    }, 
    create: async (req: Request, res: Response, next: any) => {
        try {
    
            const customer = new Customer();
            Object.assign(customer, req.body);
        
            await repository.save(customer);
            res.status(201).json(customer);
          } catch (error) {
            console.error(error);
            res.status(400).json({ error });
          }
    }, 
    update:async (req: Request, res: Response, next: any) => {
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
    }, 
    softDelete: async (req: Request, res: Response, next: any) => {
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
    }, 
}