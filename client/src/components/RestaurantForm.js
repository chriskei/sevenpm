import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button, Box, Chip, Grid, Typography } from "@material-ui/core";
import { CategoriesButton } from "./CategoriesButton";
import * as Yup from "yup";
import ReactMapGL, { Popup, FlyToInterpolator } from "react-map-gl";
import { RestaurantInfo } from "./RestaurantInfo";
import { Pins } from "./Pins";
require("dotenv").config();

// Styling
const styles = {
  formStyles: {
    color: "white"
  },
  widthStyles: {
    width: "300px"
  },
  textStyles: {
    fontSize: "x-large"
  },
  checkBoxStyles: {
    width: "15px",
    height: "15px"
  },
  finalStyles: {
    color: "yellow",
    fontWeight: "bold",
    margin: "3px"
  },
  popupStyles: {
    outline: "black"
  }
};

// Includes all of the inputs that the user gives
const RestaurantForm = props => {
  const { latitude, longitude } = props;
  const [restaurants, setRestaurants] = useState([]);
  const [viewport, setViewport] = useState({
    latitude: 37.0902,
    longitude: -95.7129,
    zoom: 3,
    width: "80vw",
    height: "80vh"
  });
  const [popupInfo, setPopupInfo] = useState(null);

  // Show pop up
  const renderPopup = () => {
    if (popupInfo) {
      return (
        <Popup
          tipSize={10}
          anchor="top"
          longitude={popupInfo.coordinates.longitude}
          latitude={popupInfo.coordinates.latitude}
          offsetLeft={10}
          offsetTop={27}
          closeOnClick={false}
          onClose={() => setPopupInfo(null)}
          style={styles.popupStyles}
        >
          <RestaurantInfo info={popupInfo} />
        </Popup>
      );
    }
  };

  return (
    <Grid container>
      <Grid item xs={5}>
        <CategoriesButton />
        <br />
        <Formik
          initialValues={{
            location: "",
            radius: 5,
            cheap: true,
            average: true,
            nice: false,
            fancy: false
          }}
          // Make sure that either geolocation is enabled or the user inputs a desired location
          validationSchema={
            !!latitude && !!longitude
              ? Yup.object()
              : Yup.object({
                  location: Yup.string()
                    .min(
                      1,
                      "If you disable geolocation, you must enter a location."
                    )
                    .required(
                      "If you disable geolocation, you must enter a location."
                    )
                })
          }
          onSubmit={async (values, { setSubmitting }) => {
            // Since validation occurs, we can be sure that if location is not filled out, the user has geolocation enabled
            if (values.location === "") {
              delete values.location;
              values["latitude"] = latitude;
              values["longitude"] = longitude;
            }
            // Get categories from the server and add them to the search
            const searchCategoriesResponse = await fetch(
              "/getSearchCategories"
            );
            await searchCategoriesResponse.json().then(value => {
              values["categories"] = value.data;
            });
            const searchRestaurantsResponse = await fetch(
              `/searchRestaurants/${JSON.stringify(values)}`
            );
            await searchRestaurantsResponse
              .json()
              .then(value => setRestaurants(value.data));
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            // Form
            <Form style={styles.formStyles}>
              <Box>
                <Typography variant="h5">
                  <b>Location:</b>
                </Typography>
                <Field type="text" name="location" style={styles.widthStyles} />
                <br />
                <ErrorMessage name="location" />
              </Box>
              <br />
              <Box>
                <Typography variant="h5">
                  <b>Radius (miles):</b>
                </Typography>
                <label for="radius" style={styles.textStyles}>
                  1
                </label>
                <Field
                  type="range"
                  min={1}
                  max={25}
                  name="radius"
                  style={styles.widthStyles}
                />
                <label for="radius" style={styles.textStyles}>
                  25
                </label>
              </Box>
              <br />
              <Box>
                <Typography variant="h5">
                  <b>Price:</b>
                </Typography>
                <Field
                  type="checkbox"
                  name="cheap"
                  style={styles.checkBoxStyles}
                />
                <label for="cheap" style={styles.textStyles}>
                  ${"  "}
                </label>
                <Field
                  type="checkbox"
                  name="average"
                  style={styles.checkboxStyles}
                />
                <label for="average" style={styles.textStyles}>
                  $${"  "}
                </label>
                <Field
                  type="checkbox"
                  name="nice"
                  style={styles.checkboxStyles}
                />
                <label for="nice" style={styles.textStyles}>
                  $$${" "}
                </label>
                <Field
                  type="checkbox"
                  name="fancy"
                  style={styles.checkboxStyles}
                />
                <label for="fancy" style={styles.textStyles}>
                  $$$$
                </label>
              </Box>
              <br />
              <Button
                type="submit"
                disabled={isSubmitting}
                size="large"
                variant="contained"
              >
                <Typography>FIND MY RESTAURANTS</Typography>
              </Button>
              <br />
              <br />
            </Form>
          )}
        </Formik>
        {restaurants.length > 0 && (
          <Typography variant="h4" style={styles.finalStyles}>
            <b>RESTAURANTS:</b>
          </Typography>
        )}
        {restaurants.map(restaurant => (
          // Restaurants returned
          <Chip
            label={restaurant.name}
            style={styles.finalStyles}
            variant="outlined"
            color="secondary"
            onClick={() =>
              setViewport({
                latitude: restaurant.coordinates.latitude,
                longitude: restaurant.coordinates.longitude,
                width: viewport.width,
                height: viewport.height,
                zoom: 15,
                // Smooth transition to restaurant on map
                transitionInterpolator: new FlyToInterpolator({ speed: 1 }),
                transitionDuration: "auto"
              })
            }
          />
        ))}
        <br />
        <br />
      </Grid>
      <Grid item xs={7}>
        <Box border={2} display="flex">
          <ReactMapGL
            // Map with markers
            {...viewport}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API_KEY}
            mapStyle="mapbox://styles/chriskei/ck77y4csm0ppw1io7rn6ajz21"
            onViewportChange={viewport => {
              setViewport(viewport);
            }}
          >
            <Pins
              data={restaurants}
              onClick={restaurant => setPopupInfo(restaurant)}
            />
            {renderPopup()}
          </ReactMapGL>
        </Box>
        <br />
        <br />
      </Grid>
    </Grid>
  );
};

export { RestaurantForm };
