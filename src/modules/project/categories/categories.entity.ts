import {
  Table,
  Column,
  Model,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from 'src/modules/project/user/user.entity';

@Table({
  tableName: 'categories',
})
export class Categories extends Model {
  @Column
  name: string;

  @Column
  active: boolean

  @ForeignKey(() => User)
  @Column({ field: 'user_id' })
  userId: number;

  @ForeignKey(() => Categories)
  @Column({ field: 'categories_id' })
  categoriesId: number;
}
