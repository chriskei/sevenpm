import express from "express";
import cowsay from "cowsay";
import cors from "cors";

import displayCategories from "./categories/displayCategories";
import searchCategories from "./categories/searchCategories";

const displayCategoriesCopy = displayCategories;
const searchCategoriesCopy = searchCategories;

// Create the server
const app = express();

let chosenCategorieIndices = [];
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
