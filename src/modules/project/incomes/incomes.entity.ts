import { Table, Column, Model, ForeignKey, BelongsTo } from "sequelize-typescript";
import { User } from "../user/user.entity";

@Table({tableName: 'incomes'})
export class Incomes extends Model {

  @Column
  value: number;

  @Column
  active: boolean
  
  @ForeignKey(() => User)
  @Column({field: 'user_id'})
  userId: number

  @BelongsTo(() => User)
  user: User
}