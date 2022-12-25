import { Sequelize } from 'sequelize-typescript';
import { User } from 'src/user/user.entity';
import { Categories } from 'src/categories/categories.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: '123',
        database: 'speneasy',
      });
      sequelize.addModels([User, Categories]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
