import { User } from 'src/modules/project/user/user.entity';
import { Categories } from 'src/modules/project/categories/categories.entity';
import { Recurrents } from 'src/modules/project/recurrent/recurrents.entity';
import { Expenses } from 'src/modules/project/expenses/expenses.entity';
import { sequelize } from 'src/config/database.config';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      sequelize.addModels([User, Categories, Recurrents, Expenses]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
