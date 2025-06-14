import React from "react";
import { Offcanvas } from "react-bootstrap";
import styles from "./GenericModal.module.scss";

type OffcanvasPlacement = "start" | "end" | "top" | "bottom";
interface GenericModalProps {
  show: boolean;
  showHeader: boolean;

  onClose: () => void;
  title: string;
  placement?: OffcanvasPlacement;
  children: React.ReactNode;
}

function GenericModal({
  show,
  showHeader,
  onClose,
  title,
  placement = "end",
  children,
}: GenericModalProps) {
  return (
    <Offcanvas
      show={show}
      showHeader={showHeader}
      onHide={onClose}
      placement={placement}
      className={`${styles.customOffcanvas}`}
    >
      {showHeader && (
        <Offcanvas.Header className={`${styles.customOffcanvasHeader}`}>
          <button className={styles.customClose} onClick={onClose}>
            <i className="fa-solid fa-xmark"></i>
          </button>

          <Offcanvas.Title className={`${styles.customTitle}`}>
            {title}
          </Offcanvas.Title>
        </Offcanvas.Header>
      )}

      <Offcanvas.Body className={`${styles.customOffcanvasBody}`}>
        {children}
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default GenericModal;
