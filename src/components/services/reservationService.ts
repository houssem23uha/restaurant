import type { Reservation } from "../models/Reservation";
import { fetchJSON } from "./api";

const baseUrl = "http://localhost:8080/site/reservations";

export async function getReservations(): Promise<Reservation[]> {
  return fetchJSON<Reservation[]>(baseUrl);
}

export async function getReservationById(id: number): Promise<Reservation> {
  return fetchJSON<Reservation>(`${baseUrl}/${id}`);
}

export async function createReservation(reservation: Reservation): Promise<Reservation> {
  return fetchJSON<Reservation>(baseUrl, { method: "POST", body: JSON.stringify(reservation) });
}

export async function updateReservation(id: number, reservation: Reservation): Promise<Reservation> {
  return fetchJSON<Reservation>(`${baseUrl}`, { method: "PUT", body: JSON.stringify(reservation) });
}

export async function deleteReservation(id: number): Promise<void> {
  await fetch(`${baseUrl}/${id}`, { method: "DELETE" });
}
