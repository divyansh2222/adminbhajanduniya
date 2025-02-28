import React from "react";
import Modal from "./Model";

const ViewModal = ({ isOpen, closeModal, song }) => {
    // console.log(song.id)
  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <h2 className="text-xl font-bold mb-3">View Song</h2>
      <p><strong>Category:</strong> {song?.category}</p>
      <p><strong>Name:</strong> {song?.name}</p>
      <p><strong>Writer:</strong> {song?.singer}</p>
      <p><strong>Lyrics:</strong> {song?.lyrics}</p>
    </Modal>
  );
};

export default ViewModal;
