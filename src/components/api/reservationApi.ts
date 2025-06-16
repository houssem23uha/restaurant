import apiClient from "../servicesh/apiClient";
import type { Reservation } from "../types";

export const fetchReservations = async (): Promise<Reservation[]> => {
    const res = await apiClient.get<Reservation[]>("/reservations");
    return res.data;
};

export const fetchReservation = async (id: number): Promise<Reservation> => {
    const res = await apiClient.get<Reservation>(`/reservations/${id}`);
    return res.data;
};

export const createReservation = async (
    reservation: Omit<Reservation, "id">
): Promise<Reservation> => {
    const res = await apiClient.post<Reservation>("/reservations", reservation);
    return res.data;
};

export const updateReservation = async (
    reservation: Reservation
): Promise<Reservation> => {
    const res = await apiClient.put<Reservation>("/reservations", reservation);
    return res.data;
};

export const deleteReservation = async (id: number): Promise<void> => {
    await apiClient.delete(`/reservations/${id}`);
};
