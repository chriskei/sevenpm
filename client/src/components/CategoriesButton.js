import React, { useState, useEffect } from "react";
import { Box, Button, List, ListItem, Typography } from "@material-ui/core";

// Styling
const styles = {
  boxStyles: {
    color: "white"
  },
  listItemStyles: {
    fontSize: "22px"
  }
};

// Randomizes categories and displays those categories
const CategoriesButton = () => {
  const [categories, setCategories] = useState([]);

  // Get initial 5 categories
  useEffect(() => {
    // Needs to be a separate function so we can use async in useEffect
    async function fetchInit() {
      const displayCategoriesResponse = await fetch("/getDisplayCategories");
      displayCategoriesResponse.json().then(value => setCategories(value.data));
    }
    fetchInit();
  });

  return (
    <Box style={styles.boxStyles}>
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
        <Typography>RANDOMIZE CATEGORIES</Typography>
      </Button>
      <br />
      <br />
      <Typography variant="h5">
        <b>Categories:</b>
      </Typography>
      <List dense={true} disablePadding={true}>
        {categories.map((category, index) => (
          <ListItem
            key={`list-item-${index}`}
            style={styles.listItemStyles}
          >
            <Typography variant="h6">
              · {category}
            </Typography>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export { CategoriesButton };
