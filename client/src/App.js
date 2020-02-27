import React, { useState } from "react";
import { Container, Typography } from "@material-ui/core";
import { Header } from "./components/Header";
import { RestaurantForm } from "./components/RestaurantForm";

const App = () => {
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

  navigator.geolocation.getCurrentPosition(pos => {
    setLatitude(pos.coords.latitude.toFixed(5));
    setLongitude(pos.coords.longitude.toFixed(5));
  });

  return (
    <Container style={{ backgroundColor: "indigo" }}>
      <Header />
      <RestaurantForm latitude={latitude} longitude={longitude} />
    </Container>
  );
};

export default App;
