require("dotenv").config();
const express = require("express");
const cors = require("cors");
const math = require("mathjs");
const yelp = require("yelp-fusion");
const displayCategories = require("./categories/displayCategories");
const searchCategories = require("./categories/searchCategories");

// Create the server
const app = express();

// Create the Yelp client
const client = yelp.client(process.env.YELP_API_KEY, {
  method: "GET",
  headers: {
    Authorization: "Bearer ".concat(process.env.YELP_API_KEY)
  }
});

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
  const values = JSON.parse(req.params.values);
  const location = values.location;
  const radius = math.min(values.radius * 1609, 40000);
  const priceArray = [];
  if (values.cheap) priceArray.push("1");
  if (values.average) priceArray.push("2");
  if (values.nice) priceArray.push("3");
  if (values.fancy) priceArray.push("4");
  const price = priceArray.toString();
  const latitude = values.latitude;
  const longitude = values.longitude;
  const categories = values.categories.toString();

  if (location) {
    client
      .search({
        location: location,
        radius: radius,
        price: price,
        categories: categories,
        limit: 10,
        open_now: true
      })
      .then(response => {
        const restaurants = response.jsonBody.businesses.map(
          business => business.name
        );
        return res.json({ data: restaurants });
      })
      .catch(err => console.log(err));
  } else {
    client
      .search({
        latitude: latitude,
        longitude: longitude,
        radius: radius,
        price: price,
        categories: categories,
        limit: 10,
        open_now: true
      })
      .then(response => {
        const restaurants = response.jsonBody.businesses.map(
          business => business.name
        );
        return res.json({ data: restaurants });
      })
      .catch(err => console.log(err));
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
app.listen(PORT, () => {});
