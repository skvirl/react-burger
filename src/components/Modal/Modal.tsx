import { useEffect, FC, ReactNode } from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const modalsElement = document.getElementById("modal");

const Modal: FC<{ closeModal: () => void; children: ReactNode }> = ({
  children,
  closeModal,
}) => {
  return modalsElement !== null ? (
    ReactDOM.createPortal(
      <div className={styles.modal}>
        <ModalOverlay closeModal={closeModal} />
        <ModalContent closeModal={closeModal}>{children}</ModalContent>
      </div>,
      modalsElement
    )
  ) : (
    <></>
  );
};

const ModalOverlay: FC<{ closeModal: () => void }> = ({ closeModal }) => {
  return <div className={styles.modal__overlay} onClick={closeModal}></div>;
};

const ModalContent: FC<{ closeModal: () => void; children: ReactNode }> = ({
  children,
  closeModal,
}) => {
  useEffect(() => {
    const closeByEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", closeByEscape);
    return () => {
      document.removeEventListener("keydown", closeByEscape);
    };
  }, []);

  return (
    <div className={styles.modal__content}>
      {children}
      <div className={styles.modal__close} onClick={closeModal} data-cy="closeIcon">
        <CloseIcon type="primary"  />
      </div>
    </div>
  );
};

export default Modal;
