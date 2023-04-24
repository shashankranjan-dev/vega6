import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [dataLength, setDataLength] = useState(null);
  const apiKey = "mwyG6N4ZzAp_dAhZXGYRCbIbeYsxBlXhupTxixJ9zro";

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async (query) => {
    console.log(
      `https://api.unsplash.com/search/photos?query=${query}&client_id=${apiKey}`
    );
    console.log(query);
    const response = await axios.get(
      `https://api.unsplash.com/search/photos?query=${query}&client_id=${apiKey}`
    );
    const data = response.data.results.map((result) => result.urls.regular);
    setDataLength(data.length);
    setSearchResults(data);
  };

  return (
    <div className="container mx-auto p-4 ">
      <div className="py-8">
        <h1 className="text-3xl font-bold mb-4 text-white">Imagify</h1>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="border p-2 rounded-lg flex-1 mr-4"
            value={searchTerm}
            onChange={handleInputChange}
          />
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => handleSearch(searchTerm)}
          >
            Search
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {dataLength === 0 && (
          <div className="flex justify-center bg-slate-50 rounded p-2 w-full">
            No Images Found.
          </div>
        )}
        {searchResults.length > 0 &&
          searchResults.map((result, index) => (
            <div key={index} className="bg-slate-50 rounded p-2 w-full">
              <img
                src={result}
                alt={searchTerm}
                className="object-cover w-96 h-96 rounded"
              />
              <div className="flex justify-center pt-4">
                <button
                  type="button"
                  className="w-96 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() =>
                    navigate(`/add-captions`, {
                      state: { imageUrl: result },
                    })
                  }
                >
                  Add Caption
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SearchPage;
