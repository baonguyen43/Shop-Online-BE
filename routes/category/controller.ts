import express, { Express, NextFunction, Request, Response } from 'express';
import { AppDataSource } from '../../data-source';
import { Category } from '../../entities/category.entity';


const repository = AppDataSource.getRepository(Category);

/* GET categories */
module.exports = {
    getAll: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const categories = await repository.find();
            if (categories.length === 0) {
              res.status(204).send();
            } else {
              res.json(categories);
            }
          } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
          }
    },

    getDetail: async (req: Request, res: Response, next: any) => {
        try {
            const category = await repository.findOneBy({ id: parseInt(req.params.id) });
            if (!category) {
              return res.status(404).json({ error: 'Not found' });
            }
            res.json(category);
          } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
          }
    }, 
    create: async (req: Request, res: Response, next: any) => {
        try {
            const category = new Category();
            Object.assign(category, req.body);
        
            // MANUAL VALIDATION
            // const errors = await category.validate();
            // if (errors) {
            //   res.status(400).json(errors);
            //   return;
            // }
        
            // HOOK VALIDATION
            await repository.save(category);
            res.status(201).json(category);
            
          } catch (error) {
            console.error(error);
            res.status(400).json({ error });
          }
    }, 
    update:async (req: Request, res: Response, next: any) => {
        try {
            const category = await repository.findOneBy({ id: parseInt(req.params.id) });
            if (!category) {
              return res.status(404).json({ error: 'Not found' });
            }
        
            Object.assign(category, req.body);
            await repository.save(category);
        
            const updatedCategory = await repository.findOneBy({ id: parseInt(req.params.id) });
            res.json(updatedCategory);
          } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
          }
    }, 
    softDelete: async (req: Request, res: Response, next: any) => {
        try {
            const category = await repository.findOneBy({ id: parseInt(req.params.id) });
            if (!category) {
              return res.status(404).json({ error: 'Not found' });
            }
            await repository.delete({ id: category.id });
            res.status(200).send('delete thanh cong');
          } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
          }
    }, 
}

