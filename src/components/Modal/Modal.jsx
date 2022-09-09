import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import styles from "./Modal.module.css";

const modalsElement = document.getElementById("modal");

const Modal = ({ isOpen, handleOpenModal }) => {
  const [state, setState] = React.useState(null);
  return (
    isOpen &&
    ReactDOM.createPortal(
      <div className={styles.modal}>
        <ModalOverlay />
        <ModalContent handleOpenModal={handleOpenModal}>
          here some words....
        </ModalContent>
      </div>,
      modalsElement
    )
  );
};

const ModalOverlay = () => {
  return <div className={styles.modal__overlay}></div>;
};

const ModalContent = ({ children, handleOpenModal }) => {
  return (
    <div className={styles.modal__content}>
      {children}
      <div className={styles.modal__close} onClick={handleOpenModal}>
        X
      </div>
    </div>
  );
};

export default Modal;
