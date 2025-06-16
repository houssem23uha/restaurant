import { useState, useEffect } from "react";
import styles from "./ReservationForm.module.scss";
import InlineCalendar from "./InlineCalendar.tsx";

import type { Slot } from "./models/enums";
import type { Reservation } from "./types";
import type { Customer } from "./models/Customer";
import {useCreateReservation} from "./hooks/reservation/useReservationMutations.ts";

// Client factice
const dummyCustomer: Customer = {
  id: 1,
  firstname: "John",
  lastname: "Doe",
  login: "john@example.com",
  phone: "0600000000",
  photo: "",
  password: "secret",
  orders: [],
  addresses: [],
  reservations: [],
  items: [],
  version: 0,
};

const HOURS: Slot[] = ["MORNING", "AFTERNOON", "EVENING"];

const slotToLabel = (slot: Slot) => {
  switch (slot) {
    case "MORNING": return "Matin";
    case "AFTERNOON": return "Midi";
    case "EVENING": return "Soir";
    default: return slot;
  }
};

const ReservationForm = () => {
  const [covers, setCovers] = useState(2);
  const [date, setDate] = useState("");
  const [selectedTime, setSelectedTime] = useState<Slot | "">("");
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

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

    const newReservation: Omit<Reservation, "id"> = {
      slot: selectedTime,
      nbPersons: covers,
      date,
      customer: dummyCustomer,
      version: 0,
    };

    createMutation.mutate(newReservation as Reservation, {
      onSuccess: () => {
        setSuccessMessage(
            `Réservation confirmée pour ${covers} personnes le ${new Date(date).toLocaleDateString(
                "fr-FR",
                { weekday: "long", day: "numeric", month: "long" }
            )} (${slotToLabel(selectedTime)})`
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
  };

  return (
      <div className={styles.formContainer}>
        <form className={styles.reservationForm} onSubmit={handleSubmit} noValidate>
          <h2>Le Cercle</h2>

          {error && <p className={styles.errorMessage}>{error}</p>}

          {/* COUVERTS */}
          <label
              tabIndex={0}
              role="button"
              onClick={() => toggleSection("covers")}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && toggleSection("covers")}
              aria-expanded={isActive("covers")}
              aria-controls="covers-selection"
              className={styles.toggleLabel}
          >
            <i className="fa-solid fa-utensils" />
            <strong>Couverts</strong>{" "}
            <span className={styles.selectedValue}>{covers}</span>
          </label>

          <div
              id="covers-selection"
              className={`${styles.toggleSection} ${isActive("covers") ? styles.active : ""}`}
              aria-hidden={!isActive("covers")}
          >
            <div className={styles.counterWrapper}>
              <button
                  type="button"
                  onClick={() => setCovers((c) => Math.max(1, c - 1))}
                  aria-label="Diminuer le nombre de couverts"
              >
                <i className="fa-solid fa-minus" />
              </button>
              <span className={styles.inputValueContainer}>{covers}</span>
              <button
                  type="button"
                  onClick={() => setCovers((c) => c + 1)}
                  aria-label="Augmenter le nombre de couverts"
              >
                <i className="fa-solid fa-plus" />
              </button>
            </div>
          </div>

          <hr />

          {/* DATE */}
          <label
              tabIndex={0}
              role="button"
              onClick={() => toggleSection("date")}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && toggleSection("date")}
              aria-expanded={isActive("date")}
              aria-controls="date-selection"
              className={styles.toggleLabel}
          >
            <strong>Date</strong>{" "}
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
              className={`${styles.toggleSection} ${isActive("date") ? styles.active : ""}`}
              aria-hidden={!isActive("date")}
          >
            <div className={styles.dateWrapper}>
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

          {/* HORAIRE */}
          <label
              tabIndex={0}
              role="button"
              onClick={() => toggleSection("time")}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && toggleSection("time")}
              aria-expanded={isActive("time")}
              aria-controls="time-selection"
              className={styles.toggleLabel}
          >
            <strong>Horaire</strong>{" "}
            <span className={styles.selectedValue}>
            {selectedTime ? slotToLabel(selectedTime as Slot) : ""}
          </span>
          </label>

          <div
              id="time-selection"
              className={`${styles.toggleSection} ${isActive("time") ? styles.active : ""}`}
              aria-hidden={!isActive("time")}
          >
            <ul className={styles.timeList}>
              {HOURS.map((hour) => (
                  <li key={hour}>
                    <button
                        type="button"
                        className={`${styles.timeSlot} ${selectedTime === hour ? styles.active : ""}`}
                        onClick={() => handleSelectTime(hour)}
                        aria-pressed={selectedTime === hour}
                    >
                      {slotToLabel(hour)}
                    </button>
                  </li>
              ))}
            </ul>
          </div>

          <button type="submit" disabled={!selectedTime || createMutation.isPending} className={styles.submitButton}>
            {createMutation.isPending ? "Envoi..." : "Réserver"}
          </button>

          {successMessage && (
              <p className={styles.successMessage}>
                {successMessage}
              </p>
          )}
        </form>
      </div>
  );
};

export default ReservationForm;