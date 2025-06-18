import { useState, useEffect } from "react";
import styles from "./ReservationForm.module.scss";
import InlineCalendar from "./InlineCalendar";
import { useNavigate } from "react-router-dom";

import { useCustomer } from "./CustomerContext";

import type { Slot, Reservation } from "./types";
import { useCreateReservation } from "./hooks/reservation/useReservationMutations";

const HOURS: Slot[] = ["MORNING", "AFTERNOON", "EVENING"];

const slotToLabel = (slot: Slot) => {
  switch (slot) {
    case "MORNING":
      return "Matin";
    case "AFTERNOON":
      return "Midi";
    case "EVENING":
      return "Soir";
    default:
      return slot;
  }
};

const ReservationForm = () => {
  const navigate = useNavigate();

  const [covers, setCovers] = useState(2);
  const [date, setDate] = useState("");
  const [selectedTime, setSelectedTime] = useState<Slot | "">("");
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const { customer } = useCustomer();

  const createMutation = useCreateReservation();

  useEffect(() => {
    const today = new Date();
    const formatted = today.toISOString().split("T")[0];
    setDate(formatted);
  }, []);

  const toggleSection = (section: string) => {
    setActiveSection((prev) => (prev === section ? null : section));
  };

  const handleSelectTime = (hour: Slot) => {
    setSelectedTime(hour);
    setActiveSection(null);
  };

  const isActive = (section: string) => activeSection === section;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!selectedTime) {
      setError("Veuillez sélectionner un horaire.");
      return;
    }

    if (!customer) {
      setError("Utilisateur non connecté.");
      return;
    }

    const newReservation: Omit<Reservation, "id"> = {
      slot: selectedTime,
      nbPersons: covers,
      date,
      customer,
      version: 0,
    };

    createMutation.mutate(newReservation as Reservation, {
      onSuccess: () => {
        setSuccessMessage(
          `${
            customer.firstname
          } ${customer.lastname.toUpperCase()}: Réservation confirmée pour ${covers} personne${
            covers > 1 ? "s" : ""
          } le ${new Date(date).toLocaleDateString("fr-FR", {
            weekday: "long",
            day: "numeric",
            month: "long",
          })} (${slotToLabel(selectedTime)})`
        );
        setCovers(2);
        setSelectedTime("");
        setDate(new Date().toISOString().split("T")[0]);
      },
      onError: (err) => {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Erreur lors de la création de la réservation.");
        }
      },
    });
    navigate("/mesreservations");
  };

  return (
    <div
      className={styles.formContainer}
      d-flex
      flex-column
      justify-content-center
      align-items-center
      gap-3
      p-3
    >
      <form
        className={styles.reservationForm}
        onSubmit={handleSubmit}
        noValidate
      >
        <h2>Réserver une table</h2>

        {/* Couverts */}
        <label
          tabIndex={0}
          role="button"
          onClick={() => toggleSection("covers")}
          onKeyDown={(e) =>
            (e.key === "Enter" || e.key === " ") && toggleSection("covers")
          }
          aria-expanded={isActive("covers")}
          aria-controls="covers-selection"
          className={styles.toggleLabel}
        >
          <span>Couverts :</span>
          <span className={styles.selectedValue}>{covers}</span>
        </label>

        <div
          id="covers-selection"
          className={`${styles.toggleSection} ${
            isActive("covers") ? styles.active : ""
          }`}
          aria-hidden={!isActive("covers")}
        >
          <div className={styles.counterWrapper}>
            <button
              type="button"
              onClick={() => setCovers((c) => Math.max(1, c - 1))}
              aria-label="Diminuer le nombre de couverts"
            >
              −
            </button>
            <span className={styles.inputValue}>{covers}</span>
            <button
              type="button"
              onClick={() => setCovers((c) => c + 1)}
              aria-label="Augmenter le nombre de couverts"
            >
              +
            </button>
          </div>
        </div>

        <hr />

        {/* Date */}
        <label
          tabIndex={0}
          role="button"
          onClick={() => toggleSection("date")}
          onKeyDown={(e) =>
            (e.key === "Enter" || e.key === " ") && toggleSection("date")
          }
          aria-expanded={isActive("date")}
          aria-controls="date-selection"
          className={styles.toggleLabel}
        >
          <span>Date :</span>
          <span className={styles.selectedValue}>
            {date &&
              new Date(date).toLocaleDateString("fr-FR", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}
          </span>
        </label>

        <div
          id="date-selection"
          className={`${styles.toggleSection} ${
            isActive("date") ? styles.active : ""
          }`}
          aria-hidden={!isActive("date")}
        >
          <div className={styles.calendarWrapper}>
            <InlineCalendar
              selected={date ? new Date(date + "T00:00:00") : undefined}
              onSelect={(d) => {
                if (!d) return;
                const year = d.getFullYear();
                const month = String(d.getMonth() + 1).padStart(2, "0");
                const day = String(d.getDate()).padStart(2, "0");
                setDate(`${year}-${month}-${day}`);
                setActiveSection(null);
              }}
            />
          </div>
        </div>

        <hr />

        {/* Horaire */}
        <label
          tabIndex={0}
          role="button"
          onClick={() => toggleSection("time")}
          onKeyDown={(e) =>
            (e.key === "Enter" || e.key === " ") && toggleSection("time")
          }
          aria-expanded={isActive("time")}
          aria-controls="time-selection"
          className={styles.toggleLabel}
        >
          <span>Horaire :</span>
          <span className={styles.selectedValue}>
            {selectedTime ? slotToLabel(selectedTime as Slot) : ""}
          </span>
        </label>

        <div
          id="time-selection"
          className={`${styles.toggleSection} ${
            isActive("time") ? styles.active : ""
          }`}
          aria-hidden={!isActive("time")}
        >
          <ul className={styles.timeList}>
            {HOURS.map((hour) => (
              <li key={hour}>
                <button
                  type="button"
                  className={`${styles.timeSlot} ${
                    selectedTime === hour ? styles.active : ""
                  }`}
                  onClick={() => handleSelectTime(hour)}
                  aria-pressed={selectedTime === hour}
                >
                  {slotToLabel(hour)}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <button
          type="submit"
          disabled={!selectedTime || createMutation.status === "pending"}
          className={styles.submitButton}
          aria-live="polite"
        >
          {createMutation.status === "pending" ? "Envoi..." : "Réserver"}
        </button>

        {successMessage && (
          <p className={styles.successMessage}>{successMessage}</p>
        )}
        {error && <p className={styles.errorMessage}>{error}</p>}
      </form>
    </div>
  );
};

export default ReservationForm;
