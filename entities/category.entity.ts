import { Column, Entity, PrimaryGeneratedColumn, BaseEntity, OneToMany, BeforeInsert, BeforeUpdate } from 'typeorm';
import { Product } from './product.entity';
import { IsNotEmpty, Length, Validate, validateOrReject,  } from 'class-validator';


@Entity({ name: 'Categories' })
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;

  // ----------------------------------------------------------------------------------------------
  // NAME
  // ----------------------------------------------------------------------------------------------
  @IsNotEmpty({ message: 'Tên danh mục không được bỏ trống'}) 
  @Length(1, 50 , { message:'Tên danh mục lớn hơn $constraint1 và nhỏ hơn $constraint2 ký tự'} )
  @Column({ name: 'Name', unique: true, length: 100 })
  name: string;

  // ----------------------------------------------------------------------------------------------
  // DESCRIPTION
  // ----------------------------------------------------------------------------------------------
  @IsNotEmpty({ message: 'Mô tả danh mục không được bỏ trống'}) 
  @Length(10,500 , { message:'Mô tả danh mục lớn hơn $constraint1 và nhỏ hơn $constraint2 ký tự'} )
  @Column({ name: 'Description', length: 500, nullable: true })
  description: string;

 // ----------------------------------------------------------------------------------------------
  // IconPath
  // ------------------------------------------------------------
  @Column({ name: 'IconPath', type: 'nvarchar', length: 'MAX', nullable: true })
  iconPath: string;


  // ----------------------------------------------------------------------------------------------
  // RELATIONS
  // ----------------------------------------------------------------------------------------------
  @OneToMany(() => Product, (p) => p.category)
  products: Product[];

    // MANUAL VALIDATION
  // async validate() {
  //   const errors = await validate(this);
  //   if (errors.length > 0) {
  //     return errors;
  //   }

  //   return null;
  // }

  // HOOKS (AUTO VALIDATE)
  @BeforeInsert()
  @BeforeUpdate()
  async validate() {
    await validateOrReject(this);
  }
}
