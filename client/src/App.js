import React from "react";
import { Container, Typography } from "@material-ui/core";
import { Header } from "./components/Header";
import { RestaurantForm } from "./components/RestaurantForm";

const App = () => {
  return (
    <Container style={{ backgroundColor: "indigo" }}>
      <Header />
      <Typography>
        Please give us some information about what you want to eat! Each field
        is optional but what you choose to enter will help us match you to a
        restaurant!
      </Typography>
      <RestaurantForm />
    </Container>
  );
};

export default App;
