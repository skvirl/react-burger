import React from "react";

const useModalController = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return {
    isModalOpen: isModalOpen,
    openModal: openModal,
    closeModal: closeModal,
  };
};

export default useModalController;
