import React, { useEffect, useState } from "react";
import { Container } from "@material-ui/core";
import { Header } from "./components/Header";
import { RestaurantForm } from "./components/RestaurantForm";

const App = () => {
  const [latitude, setLatitude] = useState(undefined);
  const [longitude, setLongitude] = useState(undefined);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(pos => {
      setLatitude(pos.coords.latitude.toFixed(5));
      setLongitude(pos.coords.longitude.toFixed(5));
    });
  }, [latitude, longitude]);

  return (
    <Container style={{ backgroundColor: "indigo" }}>
      <Header />
      <RestaurantForm latitude={latitude} longitude={longitude} />
    </Container>
  );
};

export default App;
