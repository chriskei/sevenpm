import React, { useState } from "react";
import { Button, Typography } from "@material-ui/core";

const CategoriesButton = () => {
  const [categories, setCategories] = useState([]);

  return (
    <div>
      <Button
        size="large"
        variant="contained"
        onClick={async () => {
          await fetch("/randomize");
          const displayCategoriesResponse = await fetch(
            "/getDisplayCategories"
          );
          displayCategoriesResponse
            .json()
            .then(value => setCategories(value.data));
        }}
      >
        RANDOMIZE CATEGORIES
      </Button>
      <h1>Categories:</h1>
      {categories.map(category => (
        <Typography variant="h4">{category}</Typography>
      ))}
    </div>
  );
};

export { CategoriesButton };
