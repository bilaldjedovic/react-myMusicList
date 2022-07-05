import React, { useEffect, useState } from "react";
import "./Unos.css";
import { useNavigate } from "react-router-dom";

const Unos = () => {
  const navigate = useNavigate();
  const [favorite, setFavorite] = useState([]);
  const [category, setCategory] = useState([]);

  var newSong = {
    songName: "",
    categoryId: 0,
    author: "",
    rate: "",
    createdAt: "",
    link: "",
    favoriteId: 0,
  };

  const fetchFavorite = async () => {
    try {
      const response = await fetch(
        "https://localhost:44321/api/Favorite/getFavorite"
      );
      if (!response.ok) throw Error("Did not recived expected data");
      const data = await response.json();
      console.log(data);
      setFavorite(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchCategory = async () => {
    try {
      const response = await fetch(
        "https://localhost:44321/api/Category/getCategory"
      );
      if (!response.ok) throw Error("Did not recived expected data");
      const data = await response.json();
      console.log(data);
      setCategory(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    (async () => await fetchCategory())();
    (async () => await fetchFavorite())();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(newSong);

    try {
      fetch("https://localhost:44321/api/Song/addSong", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSong),
      }).then(() => {
        console.log("New song added");
        alert("New song added!");
      });
    } catch (error) {
      console.log(error);
    } finally {
      navigate("/songs");
    }
  };
  return (
    <div className="inputFormaDiv">
      <form>
        <label>Song name</label>
        <input
          required
          type="text"
          placeholder="Song name.."
          onChange={(e) => {
            newSong.songName = e.target.value;
          }}
        />

        <label>Category </label>
        <select
          id="category"
          required
          onChange={(e) => {
            newSong.categoryId = parseInt(e.target.value);
          }}
        >
          <option>Choose category</option>
          {category.map((cat) => (
            <option value={cat.categoryId}>{cat.categoryName}</option>
          ))}
        </select>

        <label>Author</label>
        <input
          required
          type="text"
          placeholder="Author name.."
          onChange={(e) => {
            newSong.author = e.target.value;
          }}
        />

        <label>Rate</label>
        <input
          required
          type="number"
          placeholder="Put your rate"
          onChange={(e) => {
            newSong.rate = parseInt(e.target.value);
          }}
        />

        <label>Created at</label>
        <input
          required
          type="date"
          placeholder="Choose date"
          onChange={(e) => {
            newSong.createdAt = e.target.value;
          }}
        />

        <label>Link</label>
        <input
          required
          type="text"
          placeholder="Paste link here"
          onChange={(e) => {
            newSong.link = e.target.value;
          }}
        />

        <label>Is favorite? </label>
        <select
          id="favorite"
          required
          onChange={(e) => {
            newSong.favoriteId = parseInt(e.target.value);
          }}
        >
          <option>favorite?</option>
          {favorite.map((fat) => (
            <option value={fat.favoriteId}>{fat.favoriteName}</option>
          ))}
        </select>
        <input type="submit" onClick={(e) => handleSubmit(e)} />
      </form>
    </div>
  );
};

export default Unos;
