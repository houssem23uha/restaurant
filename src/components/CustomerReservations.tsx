import { useState, useEffect } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

import {
    useDeleteReservation,
    useUpdateReservation,
} from "./hooks/reservation/useReservationMutations.ts";
import {useReservations} from "./hooks/reservation/useReservations.ts";


import styles from "./CustomerReservations.module.scss";
import type { Reservation } from "./types";
import { FaTrashAlt, FaEdit } from "react-icons/fa";

type EditingState = {
    reservation: Reservation;
    customerKey: string;
};

const CustomerReservations: React.FC = () => {
    const { data: allReservations = [], isPending, isError, error } = useReservations();
    const updateMutation = useUpdateReservation();
    const deleteMutation = useDeleteReservation();

    const [groupedReservations, setGroupedReservations] = useState<Record<string, Reservation[]>>({});
    const [editing, setEditing] = useState<EditingState | null>(null);
    const [localError, setLocalError] = useState<string | null>(null);

    // Grouper les réservations par client à chaque changement de données
    useEffect(() => {
        const grouped: Record<string, Reservation[]> = {};

        allReservations.forEach((res) => {
            const firstname = res.customer?.firstname ?? "Inconnu";
            const lastname = res.customer?.lastname ?? "Client";
            const key = `${firstname} ${lastname}`;
            if (!grouped[key]) grouped[key] = [];
            grouped[key].push(res);
        });

        for (const key in grouped) {
            grouped[key].sort(
                (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
            );
        }

        setGroupedReservations(grouped);
    }, [allReservations]);

    // Supprimer une réservation
    const handleDelete = (id: number) => {
        setLocalError(null);
        deleteMutation.mutate(id, {
            onError: () => {
                setLocalError("Erreur lors de la suppression de la réservation.");
            },
        });
    };

    // Modifier une réservation
    const handleUpdate = (_id: number, updatedFields: Partial<Reservation>) => {
        setLocalError(null);

        // Récupérer la réservation complète dans le state d’édition
        if (!editing) return;

        const updatedReservation: Reservation = {
            ...editing.reservation,
            ...updatedFields,
        };

        updateMutation.mutate(updatedReservation, {
            onSuccess: () => {
                setEditing(null);
            },
            onError: () => {
                setLocalError("Erreur lors de la mise à jour de la réservation.");
            },
        });
    };

    // Gestion des champs dans le formulaire d’édition
    const handleEditChange = (field: keyof Reservation, value: any) => {
        if (!editing) return;

        let newValue = value;

        if (field === "date") {
            newValue = value;
        } else if (field === "nbPersons") {
            const num = Number(value);
            if (num < 1) return;
            newValue = num;
        } else if (field === "slot") {
            newValue = value as Reservation["slot"];
        }

        setEditing({
            ...editing,
            reservation: {
                ...editing.reservation,
                [field]: newValue,
            },
        });
    };

    // Vérifie si la réservation est passée
    const isPast = (res: Reservation) => {
        const now = new Date();
        const resDate = new Date(res.date);

        if (resDate < now) return true;

        const slotEndHours: Record<string, number> = {
            MORNING: 12,
            AFTERNOON: 18,
            EVENING: 23,
        };

        if (resDate.toDateString() === now.toDateString()) {
            const hourLimit = slotEndHours[res.slot] ?? 23;
            if (now.getHours() >= hourLimit) return true;
        }

        return false;
    };

    if (isPending) return <p>Chargement des réservations...</p>;
    if (isError) return <p className={styles.error}>Erreur : {(error as Error)?.message || "Chargement impossible"}</p>;

    return (
        <div className={styles.container}>
            {localError && <p className={styles.error}>{localError}</p>}

            {Object.entries(groupedReservations).map(([customerName, reservations]) => (
                <section key={customerName} className={styles.customerSection}>
                    <h2>{customerName}</h2>
                    <table className={styles.reservationTable}>
                        <thead>
                        <tr>
                            <th>Description</th>
                            <th>Supprimer</th>
                            <th>Modifier</th>
                        </tr>
                        </thead>
                        <tbody>
                        {reservations.map((res) => (
                            <tr key={res.id} className={styles.reservationRow}>
                                <td>
                                    <strong>{format(new Date(res.date), "dd MMM yyyy", { locale: fr })}</strong>
                                    {" • "}
                                    {res.slot}
                                    {" • "}
                                    {res.nbPersons} {res.nbPersons > 1 ? "personnes" : "personne"}
                                </td>
                                <td>
                                    {!isPast(res) && (
                                        <button
                                            onClick={() => handleDelete(res.id!)}
                                            aria-label="Supprimer"
                                            disabled={deleteMutation.isPending}
                                        >
                                            <FaTrashAlt />
                                        </button>
                                    )}
                                </td>
                                <td>
                                    {!isPast(res) && (
                                        <button
                                            onClick={() => setEditing({ reservation: { ...res }, customerKey: customerName })}
                                            aria-label="Modifier"
                                        >
                                            <FaEdit />
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}

                        {editing && editing.customerKey === customerName && (
                            <tr>
                                <td colSpan={3}>
                                    <form
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            if (editing) {
                                                const { reservation } = editing;
                                                handleUpdate(reservation.id!, {
                                                    date: reservation.date,
                                                    slot: reservation.slot,
                                                    nbPersons: reservation.nbPersons,
                                                });
                                            }
                                        }}
                                        style={{
                                            display: "flex",
                                            gap: "12px",
                                            alignItems: "center",
                                            flexWrap: "wrap",
                                        }}
                                    >
                                        <label>
                                            Date:
                                            <input
                                                type="date"
                                                value={
                                                    typeof editing.reservation.date === "string"
                                                        ? editing.reservation.date
                                                        : format(new Date(editing.reservation.date), "yyyy-MM-dd")
                                                }
                                                onChange={(e) => handleEditChange("date", e.target.value)}
                                                required
                                                style={{ marginLeft: 6 }}
                                            />
                                        </label>

                                        <label>
                                            Horaire:
                                            <select
                                                value={editing.reservation.slot}
                                                onChange={(e) => handleEditChange("slot", e.target.value)}
                                                style={{ marginLeft: 6 }}
                                            >
                                                <option value="MORNING">MORNING</option>
                                                <option value="AFTERNOON">AFTERNOON</option>
                                                <option value="EVENING">EVENING</option>
                                            </select>
                                        </label>

                                        <label>
                                            Personnes:
                                            <input
                                                type="number"
                                                min={1}
                                                value={editing.reservation.nbPersons}
                                                onChange={(e) => handleEditChange("nbPersons", Number(e.target.value))}
                                                required
                                                style={{ width: 70, marginLeft: 6 }}
                                            />
                                        </label>

                                        <button
                                            type="submit"
                                            style={{
                                                padding: "8px 16px",
                                                fontWeight: "700",
                                                cursor: "pointer",
                                                backgroundColor: "#f5b800",
                                                border: "none",
                                                borderRadius: 6,
                                                color: "#2a2a2a",
                                            }}
                                            disabled={updateMutation.isPending}
                                        >
                                            Valider
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => setEditing(null)}
                                            style={{
                                                padding: "8px 16px",
                                                fontWeight: "700",
                                                cursor: "pointer",
                                                backgroundColor: "#e76b6b",
                                                border: "none",
                                                borderRadius: 6,
                                                color: "#6b1b1b",
                                            }}
                                            disabled={updateMutation.isPending}
                                        >
                                            Annuler
                                        </button>
                                    </form>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </section>
            ))}
        </div>
    );
};

export default CustomerReservations;
