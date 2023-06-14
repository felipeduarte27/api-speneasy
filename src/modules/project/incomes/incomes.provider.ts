import { Incomes } from "./incomes.entity";

export const incomesProvider = [
  {
    provide: 'INCOMES_REPOSITORY',
    useValue: Incomes,
  },
];
