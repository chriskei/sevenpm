import React from "react";
import { Container, Typography } from "@material-ui/core";
import { Header } from "./components/Header";
import { RestaurantForm } from "./components/RestaurantForm";

const App = () => {
  return (
    <Container style={{ backgroundColor: "indigo" }}>
      <Header />
      <RestaurantForm />
    </Container>
  );
};

export default App;
