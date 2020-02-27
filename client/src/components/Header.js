import React from "react";
import { Toolbar, Typography } from "@material-ui/core";
import "../styles/header.css";

const HeaderStyles = {
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
}

const Header = () => {
  return (
    <Toolbar disableGutters={true}>
      <Typography style={HeaderStyles}>7PM</Typography>
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
      <Typography style={secondaryHeaderStyles}>
        Please enter some information about what you want to eat! Each field is
        optional but what you choose to enter will help in matching you to a
        restaurant!
      </Typography>
    </Toolbar>
  );
};

export { Header };
