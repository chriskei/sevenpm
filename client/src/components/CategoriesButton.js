import React, { useState, useEffect } from "react";
import { Button, Chip } from "@material-ui/core";

const CategoriesButton = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchInit() {
      const displayCategoriesResponse = await fetch(
      "/getDisplayCategories"
    );
    displayCategoriesResponse
      .json()
      .then(value => setCategories(value.data));
    };
    fetchInit();
  });

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
