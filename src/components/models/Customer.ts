// src/models/Customer.ts
import type { Address } from "./Address";
import type { Authentification } from "./Authentification";
import type { Item } from "./Item";
import type { Order } from "./Order";
import type { Reservation } from "./Reservation";


export interface Customer extends Authentification {
  firstname: string;
  lastname: string;
  phone: string;
  photo?: string;
  orders: Order[];
  addresses: Address[];
  reservations: Reservation[];
  items: Item[];
}