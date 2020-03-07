import React, { useEffect, useState } from "react";
import { Container, MuiThemeProvider, createMuiTheme} from "@material-ui/core";
import { Header } from "./components/Header";
import { RestaurantForm } from "./components/RestaurantForm";

// Indigo and yellow colors for nighttime
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

// Styling
const styles = {
  app: {
    backgroundColor: "indigo"
  }
};

// Overall app
const App = () => {
  const [latitude, setLatitude] = useState(undefined);
  const [longitude, setLongitude] = useState(undefined);

  // Allow the user to accept geolocation usage to use their current location for searching
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(pos => {
      setLatitude(pos.coords.latitude.toFixed(5));
      setLongitude(pos.coords.longitude.toFixed(5));
    });
  }, []);

  return (
    <MuiThemeProvider theme={theme}>
      <Container style={styles.app}>
        <Header />
        <RestaurantForm latitude={latitude} longitude={longitude} />
      </Container>
    </MuiThemeProvider>
  );
};

export default App;
