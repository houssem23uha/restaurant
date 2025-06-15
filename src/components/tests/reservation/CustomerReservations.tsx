import { useState, useEffect } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { deleteReservation, updateReservation } from "./services/reservationService";
import { Slot } from "../enums.ts";
import styles from "./CustomerReservations.module.scss";
import type { Reservation } from "../../Reservation";

interface CustomerReservationsProps {
    customerId: number;
}

const CustomerReservations: React.FC<CustomerReservationsProps> = ({ customerId }) => {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await fetch(`/api/customers/${customerId}/reservations`);
                const data: Reservation[] = await response.json();
                setReservations(data);
            } catch (err) {
                setError("Erreur lors du chargement des réservations.");
            } finally {
                setLoading(false);
            }
        };

        fetchReservations();
    }, [customerId]);

    const handleDelete = async (id: number) => {
        try {
            await deleteReservation(id);
            setReservations(reservations.filter((res) => res.id !== id));
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            setError("Erreur lors de la suppression de la réservation.");
        }
    };

    const handleUpdate = async (id: number, updatedData: Partial<Reservation>) => {
        try {
            await updateReservation(id, updatedData);
            setReservations(
                reservations.map((res) =>
                    res.id === id ? { ...res, ...updatedData } : res
                )
            );
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            setError("Erreur lors de la mise à jour de la réservation.");
        }
    };

    const sortReservations = (a: Reservation, b: Reservation) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
    };

    const now = new Date();

    const pastReservations = reservations
        .filter((res) => new Date(res.date) < now)
        .sort(sortReservations);

    const upcomingReservations = reservations
        .filter((res) => new Date(res.date) >= now)
        .sort(sortReservations);

    return (
        <div className={styles.container}>
            {loading && <p>Chargement des réservations...</p>}
            {error && <p className={styles.error}>{error}</p>}

            <section>
                <h2>Réservations passées</h2>
                {pastReservations.length === 0 ? (
                    <p>Aucune réservation passée.</p>
                ) : (
                    <ul>
                        {pastReservations.map((res) => (
                            <li key={res.id}>
                                <span>{format(new Date(res.date), "dd MMM yyyy", { locale: fr })}</span>
                                <span>{res.slot}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </section>

            <section>
                <h2>Réservations à venir</h2>
                {upcomingReservations.length === 0 ? (
                    <p>Aucune réservation à venir.</p>
                ) : (
                    <ul>
                        {upcomingReservations.map((res) => (
                            <li key={res.id}>
                                <span>{format(new Date(res.date), "dd MMM yyyy", { locale: fr })}</span>
                                <span>{res.slot}</span>
                                <button onClick={() => handleUpdate(res.id, { slot: Slot.AFTERNOON })}>Modifier</button>
                                <button onClick={() => handleDelete(res.id)}>Supprimer</button>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </div>
    );
};

export default CustomerReservations;