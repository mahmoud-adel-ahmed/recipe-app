import React from "react";

const Recipe = ({ label, image, calories }) => {
  return (
    <div className="recipe">
      <img src={image} alt="" />
      <h1>{label}</h1>
      <p>Calories: {calories}</p>
    </div>
  );
};

export { Recipe };
