import { useEffect, FC, ReactNode, KeyboardEvent, MouseEventHandler, FormEventHandler } from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const modalsElement = document.getElementById("modal");

const Modal: FC<{ closeModal: () => void, children: ReactNode }> = ({ children, closeModal }) => {

  return (

    modalsElement !== null ? ReactDOM.createPortal(
      <div className={styles.modal}>
        <ModalOverlay closeModal={closeModal} />
        <ModalContent closeModal={closeModal}>{children}</ModalContent>
      </div>,
      modalsElement
    ) :
      <></>
  );
};

const ModalOverlay: FC<{ closeModal: Function }> = ({ closeModal }) => {
  return <div className={styles.modal__overlay} onClick={closeModal as MouseEventHandler}></div>;
};

const ModalContent: FC<{ closeModal: Function, children: ReactNode }> = ({ children, closeModal }) => {
  useEffect(() => {

    const closeByEscape = (ev: { key: string }) => {
      if (ev.key === "Escape") {
        closeModal(undefined);
      }
    }

    document.addEventListener("keydown", closeByEscape);
    return () => {
      document.removeEventListener("keydown", closeByEscape);
    };
  }, []);

  return (
    <div className={styles.modal__content}>
      {children}
      <div className={styles.modal__close} onClick={closeModal as MouseEventHandler}>
        <CloseIcon type="primary" />
      </div>
    </div>
  );
};

export default Modal;

