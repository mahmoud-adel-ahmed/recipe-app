import React, { useEffect, useState } from "react";
import { Recipe } from "./components/Recipe";
import { Error } from "./components/Error";
import "./style.scss";

export const App = () => {
  const APP_ID = "4dc45330";
  const APP_KEY = "b9cde236f4b6c780bb64ea506b87f91a";

  let [recipes, setRecipes] = useState([]);
  let [search, setSearch] = useState("");
  let [query, setQuery] = useState("chicken");

  useEffect(() => {
    getRecipes();
  }, [query]);

  let getRecipes = async () => {
    try {
      let res = await fetch(
        `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
      );
      let data = await res.json();
      setRecipes(data.hits);
    } catch (error) {
      console.log(error);
    }
  };

  let searchRecipes = (e) => {
    setSearch(e.target.value);
  };

  let getSearchRecipes = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  let recipe = recipes.map(({ recipe }) => (
    <Recipe key={Math.random() * 1} {...recipe} />
  ));

  return (
    <div className="App">
      <form onSubmit={getSearchRecipes} className="search-form">
        <input
          type="text"
          className="search-input"
          value={search}
          onChange={searchRecipes}
          placeholder="search
          recipes"
        />
        <button type="submit" className="submit-btn">
          search
        </button>
      </form>
      {recipe.length ? <div className="recipes">{recipe}</div> : <Error />}
    </div>
  );
};

export default App;
