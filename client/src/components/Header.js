import React from "react";
import { Toolbar, Typography } from "@material-ui/core";

const Header = () => {
  return (
    <Toolbar>
      <Typography
        variant="h1"
        style={{ "background-color": "indigo", color: "white" }}
      >
        7PM
      </Typography>
    </Toolbar>
  );
};

export { Header };
