import React, { useState } from "react";
import { Button, Typography } from "@material-ui/core";

const CategoriesButton = () => {
  const [categories, setCategories] = useState(["1", "2"]);

  return (
    <div>
      <Button
        size="large"
        variant="contained"
        onClick={async () => {
            //await fetch("/getIndices").then(result => (console.log(result.json())));
            await fetch("/randomize");
            const a = await fetch("/getIndices");
            const b = a.json().then(value => setCategories(value.indices));
            console.log(categories);
            console.log(b);
          /*
          await fetch("/randomize");
          const response = await fetch("/getIndices");
          const indices = await response.json();
          console.log(3);
          */
        }}
      >
        RANDOMIZE CATEGORIES
      </Button>
      <h1>Categories:</h1>
      {categories.map(category => (
        <Typography>{category}</Typography>
      ))}
    </div>
  );
};

export { CategoriesButton };
