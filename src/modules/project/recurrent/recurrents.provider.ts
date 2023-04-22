import { Recurrents } from "./recurrents.entity";

export const recurrentsProvider = [
  {
    provide: 'RECURRENTS_REPOSITORY',
    useValue: Recurrents,
  },
];