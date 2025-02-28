import { useEffect, useState } from "react";
import ViewModal from "../components/ViewModel";
import EditModal from "../components/EditModel";
import DeleteModal from "../components/DeleteModel";
import Loader from "../components/Loader";

const Entries = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSong, setSelectedSong] = useState(null);
  const [modalType, setModalType] = useState(null);

  useEffect(() => {
    fetch("https://backend-eight-ruddy-59.vercel.app/api/songs")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        setSongs(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const openModal = (type, song) => {
    setSelectedSong(song);
    setModalType(type);
  };

  const closeModal = () => {
    setSelectedSong(null);
    setModalType(null);
  };

  const updateSong = (updatedSong) => {
    setSongs((prevSongs) => prevSongs.map(song => song.id === updatedSong.id ? updatedSong : song));
  };

  const deleteSong = (id) => {
    setSongs((prevSongs) => prevSongs.filter(song => song.id !== id));
    closeModal();
  };

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-2xl font-bold mb-4 text-center">List of Songs</h1>

      {loading && <Loader/>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] border-collapse border border-gray-300">
            <thead>
              <tr className="bg-blue-500 text-white text-sm sm:text-base">
                <th className="border p-2">S.No</th>
                <th className="border p-2">Category</th>
                <th className="border p-2">Name of Song</th>
                <th className="border p-2">Writer</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {songs.map((song, index) => (
                <tr key={song.id} className="text-center border-b text-sm sm:text-base">
                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2">{song.category}</td>
                  <td className="border p-2">{song.name}</td>
                  <td className="border p-2">{song.singer}</td>
                  <td className="border p-2 flex justify-center space-x-2">
                    <button className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-700 text-xs sm:text-sm" onClick={() => openModal("view", song)}> 📝 View </button>
                    <button className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-700 text-xs sm:text-sm" onClick={() => openModal("edit", song)}> ✏️ Edit </button>
                    <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700 text-xs sm:text-sm" onClick={() => openModal("delete", song)}> ❌ Delete </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modals */}
      <ViewModal isOpen={modalType === "view"} closeModal={closeModal} song={selectedSong} />
      <EditModal isOpen={modalType === "edit"} closeModal={closeModal} song={selectedSong} updateSong={updateSong} />
      <DeleteModal isOpen={modalType === "delete"} closeModal={closeModal} song={selectedSong} deleteSong={deleteSong} />
    </div>
  );
};

export default Entries;
