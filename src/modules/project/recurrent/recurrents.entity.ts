import {
  Table,
  Column,
  Model,
  ForeignKey,
} from 'sequelize-typescript';
import { Categories } from 'src/modules/project/categories/categories.entity'
import { User } from 'src/modules/project/user/user.entity'

@Table({
  tableName: 'recurrents',
})
export class Recurrents extends Model {
  @Column
  active: boolean

  @Column
  value: number;

  @Column({ field: 'initial_month' })
  initialMonth: number;

  @Column({ field: 'initial_year' })
  initialYear: number;

  @Column({ field: 'final_month' })
  finalMonth: number;

  @Column({ field: 'final_year' })
  finalYear: number;

  @ForeignKey(() => User)
  @Column({ field: 'user_id' })
  userId: number;

  @ForeignKey(() => Categories)
  @Column({ field: 'categories_id' })
  categoriesId: number;
}
