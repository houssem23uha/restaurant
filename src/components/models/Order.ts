// src/models/Order.ts
import type { Status } from "./enums";
import type { OrderLine } from "./OrderLine";
import type { Customer } from "./Customer";

export interface Order {
  id: number;
  totalPrice: number;
  status: Status;
  order_lines: OrderLine[];
  customer: Customer;
  version: number;
}
