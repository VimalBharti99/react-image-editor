import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const searchImages = async () => {
    if (!searchTerm.trim()) {
      alert("Please enter a search term");
      return;
    }

    setLoading(true);
    try {
      const PIXABAY_API_KEY = "49707751-675bfff183d462455a7b5907c"; 
      const url = `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(
        searchTerm
      )}&image_type=photo`;

      const res = await fetch(url);
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Pixabay API Error: ${res.status} - ${errorText}`);
      }

      const data = await res.json();
      setImages(data.hits);
    } catch (err) {
      console.error("Error fetching images:", err.message);
      alert("Failed to fetch images. Check your API key or try again later.");
    }
    setLoading(false);
  };

  const handleAddCaptions = (imgUrl) => {
    navigate("/editor", { state: { imgUrl } });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Image Search</h1>
      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          className="border px-2 py-1 w-64"
          placeholder="Search for images..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={searchImages}
          className="bg-blue-600 text-white px-4 py-1 rounded"
        >
          Search
        </button>
      </div>

      {loading ? (
        <p>Loading images...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((img) => (
            <div key={img.id} className="border p-2">
              <img
                src={img.previewURL}
                alt={img.tags}
                className="w-full h-auto mb-2"
              />
              <button
                onClick={() => handleAddCaptions(img.largeImageURL)}
                className="bg-green-600 text-white px-3 py-1 text-sm rounded"
              >
                Add Captions
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
