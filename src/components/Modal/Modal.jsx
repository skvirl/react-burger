import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import styles from "./Modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const modalsElement = document.getElementById("modal");

const Modal = ({ children, isOpen, closeModal }) => {
  return (
    isOpen &&
    ReactDOM.createPortal(
      <div className={styles.modal}>
        <ModalOverlay closeModal={closeModal} />
        <ModalContent closeModal={closeModal}>{children}</ModalContent>
      </div>,
      modalsElement
    )
  );
};

const ModalOverlay = ({ closeModal }) => {
  return <div className={styles.modal__overlay} onClick={closeModal}></div>;
};

const ModalContent = ({ children, closeModal }) => {
  React.useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeModal();
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
      <div className={styles.modal__close} onClick={closeModal}>
        <CloseIcon type="primary" />
      </div>
    </div>
  );
};

export default Modal;

Modal.propTypes = {
  children: PropTypes.node,
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};

ModalContent.propTypes = {
  children: PropTypes.node,
  closeModal: PropTypes.func.isRequired,
};

ModalOverlay.propTypes = {
  closeModal: PropTypes.func.isRequired,
};
