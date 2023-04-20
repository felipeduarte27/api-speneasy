/* eslint-disable @typescript-eslint/no-var-requires */
import { Table, Column, Model, BeforeCreate } from 'sequelize-typescript';
const bcrypt = require('bcrypt');

@Table({
  tableName: 'users',
})
export class User extends Model {
  @Column
  name: string;

  @Column
  email: string;

  @Column
  password: string;

  @BeforeCreate
  static async hashPasswordBeforeCreate(user: User) {
    if (user.password) user.password = await bcrypt.hash(user.password, 8);
  }
}
