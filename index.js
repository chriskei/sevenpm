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

// Return chosen category indices
app.get("/getDisplayCategories", cors(), async (req, res, next) => {
  const chosenDisplayCategories = chosenCategoryIndices.map(index =>
    displayCategories[index]
  );
  res.json({ data: chosenDisplayCategories });
});

/*
// Serve our api route /cow that returns a custom talking text cow
app.get("/api/cow/:say", cors(), async (req, res, next) => {
  try {
    const text = req.params.say;
    const moo = cowsay.say({ text });
    res.json({ moo });
  } catch (err) {
    next(err);
  }
});
// Serve our base route that returns a Hello World cow
app.get("/api/cow/", cors(), async (req, res, next) => {
  try {
    const moo = cowsay.say({ text: "Hello World!" });
    res.json({ moo });
  } catch (err) {
    next(err);
  }
});
*/

const path = require("path");
// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, "client/build")));
// Anything that doesn't match the above, send back index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

// Choose the port and start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Mixing it up on port ${PORT}`);
});
