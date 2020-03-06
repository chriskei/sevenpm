import React, { useState, useEffect } from "react";
import { Box, Button, List, ListItem } from "@material-ui/core";

const listItemStyles = {
  fontSize: "22px"
};

const CategoriesButton = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Needs to be a separate function so we can use async in useEffect
    async function fetchInit() {
      const displayCategoriesResponse = await fetch("/getDisplayCategories");
      displayCategoriesResponse.json().then(value => setCategories(value.data));
    }
    fetchInit();
  });

  return (
    <Box style={{ color: "white" }}>
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
      <List dense={true} disablePadding={true}>
        {categories.map((category, index) => (
          <ListItem
            key={`list-item-${index}`}
            component="ul"
            style={listItemStyles}
          >
            <b>· {category}</b>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export { CategoriesButton };
