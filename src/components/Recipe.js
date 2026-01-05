import React from "react";

const Recipe = ({ label, image, calories }) => {
  console.log("🚀 ~ Recipe ~ calories:", calories);
  return (
    <div className="recipe">
      <img src={image} alt="" loading="lazy" />
      <h1>{label}</h1>
      <p>Calories: {calories.toFixed(2)}</p>
    </div>
  );
};

export { Recipe };
