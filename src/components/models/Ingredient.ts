// src/models/Ingredient.ts
import type { Item } from "./Item";

export interface Ingredient {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  items: Item[];
  version: number;
}