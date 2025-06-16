import { useState } from "react";
import GenericModal from "./GenericModal";
import Basket from "./Basket";

function TestModal() {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <>
            <button onClick={() => setModalOpen(true)}>Ouvrir le menu latéral</button>

            <GenericModal
                show={modalOpen}
                onClose={() => setModalOpen(false)}
                title="Mon panier"
                placement="end"
            >
                <Basket />
            </GenericModal>
        </>
    );
}

export default TestModal;
