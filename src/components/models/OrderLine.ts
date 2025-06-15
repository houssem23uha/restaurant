// src/models/OrderLine.ts
import type { Item } from "./Item";
import type { Order } from "./Order";

export interface OrderLine {
  id: number;
  quantity: number;
  line_price: number;
  item: Item;
  order: Order;
  version: number;
}
