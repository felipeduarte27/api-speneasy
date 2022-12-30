/* eslint-disable @typescript-eslint/no-var-requires */
import { Table, Column, Model, BeforeSave } from 'sequelize-typescript';
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

  @BeforeSave
  static async hashPasswordBeforeSave(user: User) {
    if (user.password) user.password = await bcrypt.hash(user.password, 8);
  }
}
