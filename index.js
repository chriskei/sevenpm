const express = require("express");
const cors = require("cors");
const math = require("mathjs");
const displayCategories = require("./categories/displayCategories");
const searchCategories = require("./categories/searchCategories");

// Create the server
const app = express();

// Sets up category picking
const numCategories = displayCategories.length;
const categoryIndices = [];
for (let i = 0; i < numCategories; i++) {
  categoryIndices.push(i);
}
let chosenCategoryIndices = [0, 1, 2, 3, 4];

// Choose new category indices randomly
app.get("/randomize", cors(), async (req, res, next) => {
  chosenCategoryIndices = math.pickRandom(categoryIndices, 5);
  res.sendStatus(200);
});

// Return chosen category indices for display
app.get("/getDisplayCategories", cors(), async (req, res, next) => {
  const chosenDisplayCategories = chosenCategoryIndices.map(
    index => displayCategories[index]
  );
  res.json({ data: chosenDisplayCategories });
});

// Return chosen category indices for search
app.get("/getSearchCategories", cors(), async (req, res, next) => {
  const chosenSearchCategories = chosenCategoryIndices.map(
    index => searchCategories[index]
  );
  res.json({ data: chosenSearchCategories });
});

// Return the restaurants found given the form values
app.get("/searchRestaurants/:values", cors(), async (req, res, next) => {
  console.log(req.params.values);
  res.sendStatus(200);
});

const path = require("path");
// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, "client/build")));
// Anything that doesn't match the above, send back index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

// Choose the port and start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {});
