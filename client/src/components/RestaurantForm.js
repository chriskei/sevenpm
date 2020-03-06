import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button, Box, Chip } from "@material-ui/core";
import { CategoriesButton } from "./CategoriesButton";
import * as Yup from "yup";
import ReactMapGL, { Popup } from "react-map-gl";
import Grid from "@material-ui/core/Grid";
import { RestaurantInfo } from "./RestaurantInfo";
import { Pins } from "./Pins";
require("dotenv").config();

const formStyles = {
  color: "white"
};

const widthStyles = {
  width: "250px"
};

const textStyles = {
  fontSize: "x-large"
};

const checkboxStyles = {
  width: "15px",
  height: "15px"
};

const finalStyles = {
  color: "yellow",
  fontWeight: "bold",
  margin: "3px"
};

const RestaurantForm = props => {
  const { latitude, longitude } = props;
  const [restaurants, setRestaurants] = useState([]);
  const [viewport, setViewport] = useState({
    latitude: 42.3464,
    longitude: -71.0877,
    width: "80vw",
    height: "80vh",
    zoom: 15
  });
  const [popupInfo, setPopupInfo] = useState(null);

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
          style={{ outline: "black" }}
        >
          <RestaurantInfo info={popupInfo} />
        </Popup>
      );
    }
  };

  return (
    <Grid container>
      <Grid item xs={6}>
        <CategoriesButton />
        <Formik
          initialValues={{
            location: "",
            radius: 5,
            cheap: true,
            average: true,
            nice: false,
            fancy: false
          }}
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
            if (values.location === "") {
              delete values.location;
              values["latitude"] = latitude;
              values["longitude"] = longitude;
            }
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
            <Form style={formStyles}>
              <div>
                <h1>Location:</h1>
                <Field type="text" name="location" style={widthStyles}></Field>
                <br />
                <ErrorMessage name="location" />
              </div>
              <div>
                <h1>Radius (miles):</h1>
                <label for="radius" style={textStyles}>
                  1
                </label>
                <Field
                  type="range"
                  min={1}
                  max={25}
                  name="radius"
                  style={widthStyles}
                />
                <label for="radius" style={textStyles}>
                  25
                </label>
              </div>
              <div>
                <h1>Price:</h1>
                <Field type="checkbox" name="cheap" style={checkboxStyles} />
                <label for="cheap" style={textStyles}>
                  ${"  "}
                </label>
                <Field type="checkbox" name="average" style={checkboxStyles} />
                <label for="average" style={textStyles}>
                  $${"  "}
                </label>
                <Field type="checkbox" name="nice" style={checkboxStyles} />
                <label for="nice" style={textStyles}>
                  $$${" "}
                </label>
                <Field type="checkbox" name="fancy" style={checkboxStyles} />
                <label for="fancy" style={textStyles}>
                  $$$$
                </label>
              </div>
              <br />
              <br />
              <Button
                type="submit"
                disabled={isSubmitting}
                size="large"
                variant="contained"
              >
                FIND MY RESTAURANTS
              </Button>
              <br />
              <br />
            </Form>
          )}
        </Formik>
        {restaurants.length > 0 && <h1 style={finalStyles}>RESTAURANTS:</h1>}
        {restaurants.map(restaurant => (
          <Chip
            label={restaurant.name}
            style={finalStyles}
            variant="outlined"
            color="secondary"
            onClick={() =>
              setViewport({
                latitude: restaurant.coordinates.latitude,
                longitude: restaurant.coordinates.longitude,
                width: viewport.width,
                height: viewport.height,
                zoom: viewport.zoom
              })
            }
          />
        ))}
        <br />
        <br />
      </Grid>
      <Grid item xs={6}>
        <Box border={2} display="flex">
          <ReactMapGL
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
