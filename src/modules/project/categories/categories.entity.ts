import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  HasOne,
} from 'sequelize-typescript';
import { User } from 'src/modules/project/user/user.entity';
import { Recurrents } from '../recurrent/recurrents.entity';

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

  @BelongsTo(() => User)
  user: User; 

  @ForeignKey(() => Categories)
  @Column({ field: 'categories_id' })
  categoriesId: number;

 @BelongsTo(() => Categories)
  categories: Categories; 

  @HasOne(() => Recurrents)
  recurrent: Recurrents
}
