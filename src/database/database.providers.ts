import { User } from 'src/user/user.entity';
import { Categories } from 'src/categories/categories.entity';
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
