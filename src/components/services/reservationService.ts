import type { Reservation } from "../models/Reservation";

const baseUrl = "http://localhost:8080/site/reservations";

export async function getReservations(): Promise<Reservation[]> {
  const response = await fetch(baseUrl);
  if (!response.ok) throw new Error("Erreur lors de la récupération");
  return response.json();
}

export async function getReservationById(id: number): Promise<Reservation> {
  const response = await fetch(`${baseUrl}/${id}`);
  if (!response.ok) throw new Error("Erreur lors de la récupération");
  return response.json();
}

export async function createReservation(
    reservation: Omit<Reservation, "id">
): Promise<Reservation> {
  const response = await fetch(baseUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reservation),
  });
  if (!response.ok) throw new Error("Erreur lors de la création");
  return response.json();
}

export const updateReservation = async (
    reservation: Reservation
): Promise<Reservation> => {
  const response = await fetch(baseUrl, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reservation),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(JSON.stringify(errorData));
  }

  return response.json();
};

export async function deleteReservation(id: number): Promise<void> {
  const response = await fetch(`${baseUrl}/${id}`, { method: "DELETE" });
  if (!response.ok) throw new Error("Erreur lors de la suppression");
}
