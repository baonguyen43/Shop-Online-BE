import { NextFunction, Request, Response } from 'express';
import { AppDataSource } from "../../data-source";
import { Employee } from "../../entities/employee.entity";

const repository = AppDataSource.getRepository(Employee);

module.exports = {
    getAll: async (req: Request, res: Response, next: NextFunction) => {
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
    },

    getDetail: async (req: Request, res: Response, next: any) => {
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
    }, 
    create: async (req: Request, res: Response, next: any) => {
      try {
    
        const employee = new Employee();
        Object.assign(employee, req.body);
        await repository.save(employee);
        res.status(201).json(employee);
      } catch (error) {
        
        console.error(error);
        res.status(400).json({ error });
      }
    }, 
    update:async (req: Request, res: Response, next: any) => {
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
    }, 
    softDelete: async (req: Request, res: Response, next: any) => {
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
    }, 
}