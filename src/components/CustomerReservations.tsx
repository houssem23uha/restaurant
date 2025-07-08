import { useState } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

import {
  useDeleteReservation,
  useUpdateReservation,
} from "./hooks/reservation/useReservationMutations.ts";
import { useReservations } from "./hooks/reservation/useReservations.ts";

import styles from "./CustomerReservations.module.scss";
import type { Reservation } from "./types";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { useCustomer } from "./CustomerContext";

type EditingState = {
  reservation: Reservation;
  customerKey: string;
};

const CustomerReservations: React.FC = () => {
  const { customer } = useCustomer();
  const {
    data: allReservations = [],
    isPending,
    isError,
    error,
  } = useReservations();
  const updateMutation = useUpdateReservation();
  const deleteMutation = useDeleteReservation();

  const [editing, setEditing] = useState<EditingState | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);

  if (!customer)
    return <p>Veuillez vous connecter pour voir vos réservations.</p>;

  const myReservations = allReservations.filter(
    (res) => res.customer?.id === customer.id
  );

  // Trier les réservations de la plus proche à la plus lointaine
  const sortedReservations = [...myReservations].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateA - dateB;
  });

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
  if (isError)
    return (
      <p className={styles.error}>
        Erreur : {(error as Error)?.message || "Chargement impossible"}
      </p>
    );

  return (
    <div className={styles.container}>
      <div
        className={`${styles.MenuTitle} d-flex justify-content-center mb-3 page-title`}
      >
        <h1>Mes Réservations</h1>
      </div>

      {localError && <p className={styles.error}>{localError}</p>}

      <section className={styles.customerSection}>
        {sortedReservations.length === 0 ? (
          <p>Aucune réservation pour le moment.</p>
        ) : (
          <table className={styles.reservationTable}>
            <thead>
              <tr>
                <th>Description</th>
                <th style={{ textAlign: "center" }}>Supprimer</th>
                <th style={{ textAlign: "center" }}>Modifier</th>
              </tr>
            </thead>
            <tbody>
              {sortedReservations.map((res) => (
                <tr
                  key={res.id}
                  className={`${styles.reservationRow} ${
                    isPast(res) ? styles.pastReservation : ""
                  }`}
                >
                  <td>
                    <strong>
                      {format(new Date(res.date), "dd MMM yyyy", {
                        locale: fr,
                      })}
                    </strong>{" "}
                    • {res.slot} • {res.nbPersons}{" "}
                    {res.nbPersons > 1 ? "personnes" : "personne"}
                  </td>
                  <td style={{ textAlign: "center" }}>
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
                  <td style={{ textAlign: "center" }}>
                    {!isPast(res) && (
                      <button
                        onClick={() =>
                          setEditing({
                            reservation: { ...res },
                            customerKey: customer.firstname,
                          })
                        }
                        aria-label="Modifier"
                      >
                        <FaEdit />
                      </button>
                    )}
                  </td>
                </tr>
              ))}

              {editing && (
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
                    >
                      <label>
                        Date:
                        <input
                          type="date"
                          value={
                            typeof editing.reservation.date === "string"
                              ? editing.reservation.date
                              : format(
                                  new Date(editing.reservation.date),
                                  "yyyy-MM-dd"
                                )
                          }
                          onChange={(e) =>
                            handleEditChange("date", e.target.value)
                          }
                          required
                        />
                      </label>

                      <label>
                        Horaire:
                        <select
                          value={editing.reservation.slot}
                          onChange={(e) =>
                            handleEditChange("slot", e.target.value)
                          }
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
                          onChange={(e) =>
                            handleEditChange(
                              "nbPersons",
                              Number(e.target.value)
                            )
                          }
                          required
                        />
                      </label>

                      <button
                        type="submit"
                        className={styles.confirmButton}
                        disabled={updateMutation.isPending}
                      >
                        Valider
                      </button>

                      <button
                        type="button"
                        onClick={() => setEditing(null)}
                        className={styles.cancelButton}
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
        )}
      </section>
    </div>
  );
};

export default CustomerReservations;
