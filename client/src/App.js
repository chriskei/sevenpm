import React from "react";
import { Container } from "@material-ui/core";
import { Header } from "./components/Header";
import Basic from "./Basic";

const App = () => {
  return (
    <Container style={{ backgroundColor: "purple" }}>
      <Header />
      <Basic />
    </Container>
  );
};

export default App;
