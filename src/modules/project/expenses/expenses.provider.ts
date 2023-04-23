import { Expenses } from "./expenses.entity";

export const expensesProvider = [
  {
    provide: 'EXPENSES_REPOSITORY',
    useValue: Expenses,
  },
];