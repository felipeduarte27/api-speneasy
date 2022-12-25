import { Table, Column, Model } from 'sequelize-typescript';

@Table({
  tableName: 'categories',
})
export class Categories extends Model {
  @Column
  name: string;
}
