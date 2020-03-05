import React from "react";
import { Toolbar, Typography } from "@material-ui/core";
import "../styles/header.css";

const headerStyles = {
  fontSize: "100px",
  fontFamily: "Bungee Outline",
  fontStyle: "italic",
  fontWeight: "bold",
  color: "yellow",
  textShadow: "4px 4px #000000"
};

const secondaryHeaderStyles = {
  fontSize: "19px",
  fontFamily: "Bungee",
  color: "yellow",
  fontStyle: "italic",
  textShadow: "4px 4px #000000"
};

const Header = () => {
  return (
    <Toolbar disableGutters={true}>
      <Typography style={headerStyles}>7PM</Typography>
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
      <Typography style={secondaryHeaderStyles}>
        It's 7 pm, do you know where your dinner is?
        <br /> Simply enter some details about what you're looking for, press
        "find my restaurants," and click on the restaurant chips to view them on
        the map!
      </Typography>
    </Toolbar>
  );
};

export { Header };
