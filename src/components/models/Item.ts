// src/models/Item.ts
import type { Category } from "./enums";
import type { OrderLine } from "./OrderLine";
import type { Ingredient } from "./Ingredient";
import type { Customer } from "./Customer";

export interface Item {
  ref: number;
  name: string;
  price: number;
  description: string;
  pathImg: string;
  rate: number;
  nbRate: number;
  category: Category;
  order_lines: OrderLine[];
  ingredients: Ingredient[];
  customers: Customer[];
  version: number;
}
