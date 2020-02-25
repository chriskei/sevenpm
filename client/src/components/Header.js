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

const Header = () => {
  return (
    <Toolbar disableGutters={true}>
      <Typography style={HeaderStyles}>7PM</Typography>
    </Toolbar>
  );
};

export { Header };
