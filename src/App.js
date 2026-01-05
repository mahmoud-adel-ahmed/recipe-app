import React, { useEffect, useState } from "react";
import { Recipe } from "./components/Recipe";
import { Loading } from "./components/Loading";
import "./style.scss";

export const App = () => {
  // const APP_ID = "bac8feca";
  // const APP_KEY = "55e775bcecff22df31d75fd19ff89e4f";
  const APP_ID = process.env.REACT_APP_EDAMAM_ID;
  const APP_KEY = process.env.REACT_APP_EDAMAM_KEY;
  const USER_ID = process.env.REACT_APP_EDAMAM_USER;

  let [recipes, setRecipes] = useState([]);
  let [search, setSearch] = useState("");
  let [query, setQuery] = useState("chicken");

  useEffect(() => {
    getRecipes();
  }, [query]);

  let getRecipes = async () => {
    try {
      // let res = await fetch(
      //   `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
      // );
      let res = await fetch(
        `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`,
        {
          headers: {
            "Edamam-Account-User": USER_ID,
          },
        }
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
    if (!search.trim()) return;
    setQuery(search);
    setSearch("");
  };

  let resetSearch = () => {
    if (!search && query === "chicken") return;
    setSearch("");
    setQuery("chicken"); // default query
    setRecipes([]);
  };

  let recipe = recipes?.map(({ recipe }) => (
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
        <button
          type="button"
          className="reset-btn"
          onClick={resetSearch}
          disabled={!search && query === "chicken"}
        >
          Reset
        </button>
      </form>
      {recipe.length ? <div className="recipes">{recipe}</div> : <Loading />}
    </div>
  );
};

export default App;
