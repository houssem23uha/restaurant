// src/models/Address.ts
export interface Address {
  id?: number;          // id peut être optionnel si créé côté serveur
  street?: string;
  city?: string;
  postalCode?: string;
  country?: string;
  // ajouter d'autres champs si tu en as dans ton modèle Java
  // Relation vers Customer par id ou objet selon besoin côté frontend
  customerId?: number;  // ou customer?: Customer si tu veux l'objet complet
}