import { useState, useEffect } from "react";
import styles from "./ReservationForm.module.scss";
import InlineCalendar from "./InlineCalendar";

const HOURS = ["MATIN", "MIDI", "SOIR"];

const ReservationForm = () => {
    const [covers, setCovers] = useState(2);
    const [date, setDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [activeSection, setActiveSection] = useState(null);

    useEffect(() => {
        setDate(new Date().toISOString().split("T")[0]);
    }, []);

    const toggleSection = (section) => {
        setActiveSection((prev) => (prev === section ? null : section));
    };

    const handleSelectTime = (hour) => {
        setSelectedTime(hour);
        setActiveSection(null);
    };

    const isActive = (section) => activeSection === section;

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Réservation pour ${covers} couverts le ${date} à ${selectedTime}`);
    };

    return (
        <form className={styles.reservationForm} onSubmit={handleSubmit} noValidate>
            <h2>Le Cercle</h2>

            {/* Couverts */}
            <label
                tabIndex={0}
                role="button"
                onClick={() => toggleSection("covers")}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && toggleSection("covers")}
                aria-expanded={isActive("covers")}
                aria-controls="covers-selection"
                className={styles.toggleLabel}
            >
                <i className="fa-solid fa-utensils" style={{ marginRight: "0.5rem" }} />
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

            <input type="hidden" name="covers" value={covers} readOnly />
            <hr />

            {/* Date */}
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
                            const month = String(d.getMonth() + 1).padStart(2, '0');
                            const day = String(d.getDate()).padStart(2, '0');
                            const formattedDate = `${year}-${month}-${day}`;
                            setDate(formattedDate);
                            setActiveSection(null); // referme après sélection
                            }
                        }
                    />
                </div>
            </div>

            <hr />

            {/* Horaire */}
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
                <span className={styles.selectedValue}>{selectedTime}</span>
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
                                aria-label={`Heure ${hour}`}
                            >
                                {hour}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            <button type="submit" disabled={!selectedTime} className={styles.submitButton}>
                Réserver
            </button>
        </form>
    );
};

export default ReservationForm;
