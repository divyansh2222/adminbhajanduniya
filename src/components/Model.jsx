import React from "react";

const Modal = ({ isOpen, closeModal, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0  bg-opacity-30 backdrop-blur-md flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg shadow-lg w-[90%] sm:w-[400px] relative">
        <button className="absolute top-2 right-2 text-xl" onClick={closeModal}>
          ❌
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;


