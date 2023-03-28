import { useEffect, FC, ReactNode, KeyboardEvent, MouseEventHandler } from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const modalsElement = document.getElementById("modal");

const Modal: FC<{ closeModal: Function, children: ReactNode }> = ({ children, closeModal }) => {

  return (

    modalsElement !== null ? ReactDOM.createPortal(
      <div className={styles.modal}>
        <ModalOverlay closeModal={closeModal as unknown as MouseEventHandler} />
        <ModalContent closeModal={closeModal as unknown as MouseEventHandler}>{children}</ModalContent>
      </div>,
      modalsElement
    ) :
      <></>
  );
};

const ModalOverlay: FC<{ closeModal: Function }> = ({ closeModal }) => {
  return <div className={styles.modal__overlay} onClick={ closeModal as unknown as MouseEventHandler}></div>;
};

const ModalContent: FC<{ closeModal: Function, children: ReactNode }> = ({ children, closeModal }) => {
  useEffect(() => {
    function closeByEscape(evt: Event) {
      const keyboardEvent = evt as unknown as KeyboardEvent;
      if (keyboardEvent.key === "Escape") {
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
      <div className={styles.modal__close} onClick={closeModal as unknown as MouseEventHandler}>
        <CloseIcon type="primary" />
      </div>
    </div>
  );
};

export default Modal;

 