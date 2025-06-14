// src/services/ingredientService.ts
import type { Ingredient } from "../models/Ingredient";
import { fetchJSON } from "./api";

const baseUrl = "http://localhost:8080/site/ingredients";

export async function getIngredients(): Promise<Ingredient[]> {
  return fetchJSON<Ingredient[]>(baseUrl);
}

export async function getIngredientById(id: number): Promise<Ingredient> {
  return fetchJSON<Ingredient>(`${baseUrl}/${id}`);
}

export async function createIngredient(ingredient: Ingredient): Promise<Ingredient> {
  return fetchJSON<Ingredient>(baseUrl, { method: "POST", body: JSON.stringify(ingredient) });
}

export async function updateIngredient(id: number, ingredient: Ingredient): Promise<Ingredient> {
  return fetchJSON<Ingredient>(`${baseUrl}`, { method: "PUT", body: JSON.stringify(ingredient) });
}

export async function deleteIngredient(id: number): Promise<void> {
  await fetch(`${baseUrl}/${id}`, { method: "DELETE" });
}
