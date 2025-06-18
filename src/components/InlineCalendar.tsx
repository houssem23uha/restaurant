// ✅ Fichier : InlineCalendar.tsx
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { fr } from "date-fns/locale"; // Import de la locale française
import "./InlineCalendar.module.scss";

interface InlineCalendarProps {
    selected?: Date;
    onSelect?: (date?: Date) => void;
}

const InlineCalendar = ({ selected, onSelect }: InlineCalendarProps) => {
    return (
        <DayPicker
            mode="single"
            selected={selected}
            onSelect={onSelect}
            className="custom-calendar"
            weekStartsOn={1} // Lundi
            disabled={{ before: new Date() }}
            modifiersClassNames={{
                selected: "rdp-day_selected",
                today: "rdp-day_today",
            }}
            locale={fr} // Ajout de la locale française ici
        />
    );
};

export default InlineCalendar;
