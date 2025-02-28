import { useState } from "react";

const Formpage = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    singer: "",
    lyrics: "",
    image: "",
    youtubeLink: "",
    likes: 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // List of categories
  const categories = [
    "हनुमान जी के भजन",
    "शिव जी के भजन",
    "राम जी के भजन",
    "खाटूश्याम जी के भजन",
    "कृष्ण जी के भजन",
    "दुर्गा जी के भजन",
    "गणेश जी के भजन",
    "विष्णु जी के भजन",
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  
    console.log("Submitting Data:", formData); // Check data before sending
  
    try {
      const response = await fetch("https://backend-eight-ruddy-59.vercel.app/api/songs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, likes: Number(formData.likes) || 0 }),
      });
  
      console.log("Response Status:", response.status);
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error Response:", errorData);
        throw new Error(errorData.message || "Failed to submit data");
      }
  
      alert("Entry Submitted Successfully!");
      setFormData({
        name: "",
        category: "",
        singer: "",
        lyrics: "",
        image: "",
        youtubeLink: "",
        likes: 0,
      });
    } catch (error) {
      console.error("Submission error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Submit a New Song</h2>
      
      {error && <p className="text-red-500 text-center">{error}</p>}
      
      <form onSubmit={handleSubmit} className="space-y-3">
        <input 
          type="text" 
          name="name" 
          placeholder="Song Name" 
          value={formData.name} 
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />

        {/* Dropdown for Category */}
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        >
          <option value="" disabled>Select a Category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <input 
          type="text" 
          name="singer" 
          placeholder="Singer" 
          value={formData.singer} 
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />
        
        <textarea 
          name="lyrics" 
          placeholder="Lyrics (optional)" 
          value={formData.lyrics} 
          onChange={handleChange}
          className="border p-2 w-full rounded h-24"
        />
        
        <input 
          type="text" 
          name="image" 
          placeholder="Image URL" 
          value={formData.image} 
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
        
        <input 
          type="text" 
          name="youtubeLink"
          placeholder="YouTube Video URL" 
          value={formData.youtubeLink} 
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
        
        <input 
          type="number" 
          name="likes" 
          placeholder="Likes (default 0)" 
          value={formData.likes} 
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
        
        <button 
          type="submit" 
          className="bg-green-500 text-white p-2 w-full rounded hover:bg-green-700"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Formpage;
