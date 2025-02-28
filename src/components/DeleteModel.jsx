import React, { useState } from "react";

const DeleteModal = ({ isOpen, closeModal, song, deleteSong }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen || !song) return null;

  const handleDelete = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://backend-eight-ruddy-59.vercel.app/api/songs/${song.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete song");
      }

      deleteSong(song.id); // Update state in Entries component
      closeModal();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0  bg-opacity-30 backdrop-blur-md flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg shadow-lg w-[90%] sm:w-[400px] relative">
        <button className="absolute top-2 right-2 text-xl" onClick={closeModal}>
          ❌
        </button>
        <h2 className="text-xl font-bold mb-3">Confirm Deletion</h2>
        <p>Are you sure you want to delete <strong>{song.name}</strong>?</p>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <div className="mt-4 flex justify-end space-x-3">
          <button className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-700" onClick={closeModal}>
            Cancel
          </button>
          <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700" onClick={handleDelete} disabled={loading}>
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
