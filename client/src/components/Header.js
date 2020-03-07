import React from "react";
import { Toolbar, Typography } from "@material-ui/core";
import "../fonts.css";

// Styling
const styles = {
  headerStyles: {
    fontSize: "100px",
    fontFamily: "Bungee Outline",
    fontStyle: "italic",
    fontWeight: "bold",
    color: "yellow",
    textShadow: "4px 4px #000000"
  },
  secondaryHeaderStyles: {
    fontSize: "15px",
    fontFamily: "Bungee Hairline",
    fontWeight: "bold",
    color: "yellow",
    fontStyle: "italic"
  }
};

// Header containing website title and description
const Header = () => {
  return (
    <Toolbar disableGutters={true}>
      <Typography style={styles.headerStyles}>7PM</Typography>
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
      <Typography style={styles.secondaryHeaderStyles}>
        Find your next dinner in a few easy steps: 1. Randomize until you find
        some interesting categories; 2. Enter location (or enable geolocation),
        radius, and price points; 3. Press find my restaurants; 4. Use the
        restaurant chips to fly to restaurants on the map; 5. Click on map
        markers to get more restaurant details!
      </Typography>
    </Toolbar>
  );
};

export { Header };
