import { Table, Column, Model, ForeignKey, BelongsTo } from "sequelize-typescript";
import { User } from "../user/user.entity";
import { Categories } from "../categories/categories.entity";

@Table({tableName: 'expenses'})
export class Expenses extends Model {

  @Column
  value: number;

  @Column
  month : number;

  @Column
  year: number;

  @ForeignKey(() => User)
  @Column({field: 'user_id'})
  userId: number

  @BelongsTo(() => User)
  user: User

  @ForeignKey(() => Categories)
  @Column({field: 'categories_id'})
  categoriesId: number

  @BelongsTo(() => Categories)
  categories: Categories
  
}