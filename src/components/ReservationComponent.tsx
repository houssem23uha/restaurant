import AnimatedBox from "./AnimatedBox";
import ReservationForm from "./ReservationForm";
function ReservationComponent() {
    return (
        <div
            className={` d-flex flex-column justify-content-start align-items-center py-5 vh-100`}
        >
            <AnimatedBox>
                <ReservationForm />
            </AnimatedBox>
        </div>
    );
}

export default ReservationComponent;
