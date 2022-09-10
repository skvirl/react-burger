import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import styles from "./Modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const modalsElement = document.getElementById("modal");

const ModalController = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleModalToggle = (e) => {
    console.log(e);
    if ("key" in e) {
      e.key === "Escape" && setIsModalOpen(false);
      return;
    }
    setIsModalOpen(!isModalOpen);
  };

  return {
    isModalOpen: isModalOpen,
    modalToggle: handleModalToggle,
  };
};

const Modal = ({ children, isOpen, handleOpenModal }) => {
  return (
    isOpen &&
    ReactDOM.createPortal(
      <div className={styles.modal}>
        <ModalOverlay handleOpenModal={handleOpenModal} />
        <ModalContent handleOpenModal={handleOpenModal}>
          {children}
        </ModalContent>
      </div>,
      modalsElement
    )
  );
};

const ModalOverlay = ({ handleOpenModal }) => {
  return (
    <div className={styles.modal__overlay} onClick={handleOpenModal}></div>
  );
};

const ModalContent = ({ children, handleOpenModal }) => {
  React.useEffect(() => {
    document.addEventListener("keydown", handleOpenModal);
    return () => {
      document.removeEventListener("keydown", handleOpenModal);
    };
  }, []);

  return (
    <div className={styles.modal__content}>
      {children}
      <div className={styles.modal__close} onClick={handleOpenModal}>
        <CloseIcon type="primary" />
      </div>
    </div>
  );
};

export { Modal, ModalController };

Modal.propTypes = {
  children: PropTypes.node,
  isOpen: PropTypes.bool.isRequired,
  handleOpenModal: PropTypes.func.isRequired,
};

ModalContent.propTypes = {
  children: PropTypes.node,
  handleOpenModal: PropTypes.func.isRequired,
};

ModalOverlay.propTypes = {
  handleOpenModal: PropTypes.func.isRequired,
};
