import AnimatedBox from "./AnimatedBox.tsx";
import ReservationForm from "./ReservationForm.tsx";
function ReservationComponent() {
    return (
        <div className=" d-flex flex-column justify-content-start align-items-center py-5`"
            style={{ overflowY: 'auto' }}>
            <AnimatedBox>
                <ReservationForm />
            </AnimatedBox>
        </div>
    );
}

export default ReservationComponent;
