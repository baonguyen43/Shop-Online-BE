import { NextFunction, Request, Response } from 'express';
import { AppDataSource } from "../../data-source";
import { Employee } from "../../entities/employee.entity";
import { Product } from '../../entities/product.entity';
// import {fuzzySearch} from "./../../helper/index"; 
const repository = AppDataSource.getRepository(Product);

module.exports = {
    getAll: async (req: Request, res: Response, next: NextFunction) => {
        try {
            // SELECT * FROM [Products] AS 'product'
            const products = await repository.createQueryBuilder('product').leftJoinAndSelect('product.category', 'category').leftJoinAndSelect('product.supplier', 'supplier').getMany();
        
            if (products.length === 0) {
              res.status(204).send();
            } else {
              res.json(products);
            }
          } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
          }
    },

    getList: async (req: Request, res: Response) => {
        try {
            const { page, pageSize } = req.query;
            const limit = parseInt(pageSize as string, 10) || 12;
            const skip = (parseInt(page as string, 10) - 1) * limit || 0;
      
            const results = await repository
            .createQueryBuilder('product')
              .leftJoinAndSelect('product.category', "category")
              .leftJoinAndSelect('product.supplier', 'supplier')
              .skip(skip)
              .take(limit)
              .getMany();
    if (results.length === 0) {
        res.status(204).send();
      } else {
        res.json({
          results,
        });
      }
          } catch (error)  {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
          }
    }, 


    getDetail: async (req: Request, res: Response, next: any) => {
      try {
        const products = await repository.findOneBy({ id: parseInt(req.params.id) });
          if (!products) {
            return res.status(404).json({ error: 'Not found' });
          }
          res.json(products);
      } catch (error) {
        console.error(error);
        res.status(404).json({ error });
      }
    }, 

    getProductByCatgoryId: async (req: Request, res: Response, next: any) =>{
        try {
            const product = await repository
              .createQueryBuilder('product')
              .where('product.CategoryId = :id', { id: parseInt(req.params.id) })
              .getMany();
            if (!product) {
              return res.status(404).json({ error: 'Not found' });
            }
            res.json(product);
          } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
          }
    },

    create:async (req: Request, res: Response) => 
    {  try {
        const product = new Product();
        Object.assign(product, req.body);
        await repository.save(product);
        res.status(201).json(product);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }}, 

    update:async (req: Request, res: Response, next: any) => {
        try {
            const product = await repository.findOneBy({ id: parseInt(req.params.id) });
            if (!product) {
              return res.status(404).json({ error: 'Not found' });
            }
        
            Object.assign(product, req.body);
        
            await repository.save(product);
        
            const updatedCategory = await repository
              .createQueryBuilder('p')
              .leftJoinAndSelect('p.category', 'c')
              .where('p.id = :id', { id: parseInt(req.params.id) })
              .getOne();
            res.json(updatedCategory);
          } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
          }
    }, 

    softDelete: async (req: Request, res: Response, next: any) => {
        try {
            const product = await repository.findOneBy({ id: parseInt(req.params.id) });
            if (!product) {
              return res.status(404).json({ error: 'Not found' });
            }
            await repository.delete({
              id: product.id,
            });
            res.status(200).send('delete thanh cong');
          } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
          }
    }, 

    search:  async (req: Request, res: Response, next: any) => {
        try {
            
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
          }
        }
}