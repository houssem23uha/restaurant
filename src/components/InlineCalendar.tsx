import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { fr } from 'date-fns/locale';

const InlineCalendar = ({ selected, onSelect }) => {
    return (
        <DayPicker
            mode="single"
            selected={selected}
            onSelect={onSelect}
            locale={fr}
            weekStartsOn={1}
            hidden={{ before: new Date() }}// empêche sélection des dates passées
            disabled={{ before: new Date() }} // désactive les dates avant aujourd'hui
            modifiersClassNames={{
                selected: 'selected-day',
                today: 'today-day',
                disabled: 'disabled-day', // classe CSS pour dates désactivées
            }}
            className="custom-calendar"
        />
    );
};

export default InlineCalendar;
