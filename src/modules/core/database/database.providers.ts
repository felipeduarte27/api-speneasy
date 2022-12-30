import { User } from 'src/modules/project/user/user.entity';
import { Categories } from 'src/modules/Project/categories/categories.entity';
import { sequelize } from 'src/config/database.config';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      sequelize.addModels([User, Categories]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
