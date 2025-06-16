export type Category = "FOOD" | "DRINK" | "DESSERT"; // compléter si besoin

export type Status = "PENDING" | "VALIDATED" | "CANCELLED"; // idem

export type Slot = "MORNING" | "AFTERNOON" | "EVENING"; // idem

export interface Ingredient {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  // Optionnel, selon si tu charges aussi les items liés :
  items?: Item[];
}

export interface Item {
  ref: number;
  name: string;
  price: number;
  description?: string;
  pathImg?: string;
  rate?: number;
  nbRate?: number;
  category?: string; // ou enum string literal
  order_lines?: OrderLine[];
  ingredients?: Ingredient[];
  version: number;
}

export interface Address {
  id?: number; // id peut être optionnel si créé côté serveur
  street?: string;
  city?: string;
  postalCode?: string;
  country?: string;
  // ajouter d'autres champs si tu en as dans ton modèle Java
  // Relation vers Customer par id ou objet selon besoin côté frontend
  customerId?: number; // ou customer?: Customer si tu veux l'objet complet
  version: number;
}

export interface Authentification {
  id: number;
  login: string;
  password: string;
  version: number;
}

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

export interface Order {
  id: number;
  totalPrice: number;
  status: Status;
  order_lines: OrderLine[];
  customer: Customer;
  version: number;
}

export interface OrderLine {
  id: number;
  quantity: number;
  line_price: number;
  item: Item;
  order: Order;
  version: number;
}

export interface Reservation {
  id: number;
  slot: Slot;
  nbPersons: number;
  date: string; // ou Date, selon comment tu veux gérer
  customer: Customer;
  version: number;
}
