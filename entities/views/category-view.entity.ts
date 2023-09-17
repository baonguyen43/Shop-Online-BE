import { BaseEntity, ViewColumn, ViewEntity } from "typeorm";

@ViewEntity({
    expression: `SELECT C.*, (SELECT COUNT (*) FROM Products AS P WHERE P.categoryId = C.Id) AS Count FROM Categories as C, `
})
export class CategoryView extends BaseEntity {
    @ViewColumn({ name: 'Id' })
    id: number;
  
    
    @ViewColumn({ name: 'Name' })
    name: string;
  
    
    @ViewColumn({ name: 'Description' })
    description?: string;
  

    @ViewColumn({ name: 'Count' })
    count: number;
}