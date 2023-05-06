import React from "react";
import "./style.scss";
import { useSelector } from "react-redux";
const Genres = ({ genres_data }) => {
  const { genres } = useSelector((state) => state.home);
  console.log(genres_data);
  return (
    <div className="genres">
      {genres_data?.map((g, index) => {
        return (
          <div key={index} className="genre">
            {genres[g]}
          </div>
        );
      })}
    </div>
  );
};

export default Genres;
