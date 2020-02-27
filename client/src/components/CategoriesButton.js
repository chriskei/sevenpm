import React, { useState } from "react";
import { Button, Chip, Typography } from "@material-ui/core";

const CategoriesButton = () => {
  const [categories, setCategories] = useState([]);

  return (
    <div style={{ color: "white" }}>
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
        <Chip label={category} />
      ))}
    </div>
  );
};

export { CategoriesButton };
