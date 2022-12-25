import { Categories } from './categories.entity';

export const categoriesProvider = [
  {
    provide: 'CATEGORIES_REPOSITORY',
    useValue: Categories,
  },
];
