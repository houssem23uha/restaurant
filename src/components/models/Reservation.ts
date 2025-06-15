import type {Slot} from "./enums.ts";

export type Reservation = {
  id?: number;
  date: string;  // ISO date string
  slot: Slot;
  nbPersons: number;
  customer: {
    id: number;
    firstname: string;
    lastname: string;
  };
  version?: number;
};
