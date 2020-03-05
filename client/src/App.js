import React, { useEffect, useState } from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import { Header } from "./components/Header";
import { RestaurantForm } from "./components/RestaurantForm";

// Indigo and yellow theme for nighttime
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#4b0082"
    },
    secondary: {
      main: "#ffff00"
    }
  }
});

const App = () => {
  const [latitude, setLatitude] = useState(undefined);
  const [longitude, setLongitude] = useState(undefined);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(pos => {
      setLatitude(pos.coords.latitude.toFixed(5));
      setLongitude(pos.coords.longitude.toFixed(5));
    });
  }, []);

  return (
    <MuiThemeProvider theme={theme}>
      <Container style={{ backgroundColor: "indigo" }}>
        <Header />
        <RestaurantForm latitude={latitude} longitude={longitude} />
      </Container>
    </MuiThemeProvider>
  );
};

export default App;
