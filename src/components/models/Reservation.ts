// src/models/Reservation.ts
import type { Slot } from "./enums";
import type { Customer } from "./Customer";

export interface Reservation {
  id: number;
  slot: Slot;
  nbPersons: number;
  date: string; // ou Date, selon comment tu veux gérer
  customer: Customer;
  version: number;
}
