import React, { useState, useEffect } from "react";
import Modal from "./Model";

const EditModal = ({ isOpen, closeModal, song, updateSong }) => {
  const [editedSong, setEditedSong] = useState(song);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setEditedSong(song); // Reset song state when modal opens
  }, [song]);

  if (!isOpen || !song) return null;

  const handleChange = (e) => {
    setEditedSong({ ...editedSong, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://backend-eight-ruddy-59.vercel.app/api/songs/${song.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedSong),
      });

      if (!response.ok) {
        throw new Error("Failed to update song");
      }

      const updatedSong = await response.json();
      updateSong(updatedSong); // Update state in Entries component
      closeModal();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <h2 className="text-xl font-bold mb-3">Edit Song</h2>
      {error && <p className="text-red-500">{error}</p>}

      <label htmlFor="name" className="block mb-1">Name:</label>
      <input type="text" name="name" className="border p-2 w-full mb-2" value={editedSong?.name || ''} onChange={handleChange} />

      <label htmlFor="category" className="block mb-1">Category:</label>
      <input type="text" name="category" className="border p-2 w-full mb-2" value={editedSong?.category || ''} onChange={handleChange} />

      <label htmlFor="singer" className="block mb-1">Singer:</label>
      <input type="text" name="singer" className="border p-2 w-full mb-2" value={editedSong?.singer || ''} onChange={handleChange} />

      <label htmlFor="image" className="block mb-1">Image URL:</label>
      <input type="text" name="image" className="border p-2 w-full mb-2" value={editedSong?.image || ''} onChange={handleChange} />

      <label htmlFor="video" className="block mb-1">YouTube Video URL:</label>
      <input type="text" name="video" className="border p-2 w-full mb-2" value={editedSong?.youtubeLink || ''} onChange={handleChange} />

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </Modal>
  );
};

export default EditModal;
