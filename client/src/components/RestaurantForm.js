import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button } from "@material-ui/core";
import { CategoriesButton } from "./CategoriesButton";
import * as Yup from "yup";

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

const RestaurantForm = props => {
  const { latitude, longitude } = props;

  return (
    <div>
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
          const searchCategoriesResponse = await fetch("/getSearchCategories");
          await searchCategoriesResponse.json().then(value => {
            values["categories"] = value.data;
          });
          const searchRestaurantsResponse = await fetch(
            `/searchRestaurants/${JSON.stringify(values)}`
          );
          await searchRestaurantsResponse.json().then(value => {
            console.log(value);
          });
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
    </div>
  );
};

export { RestaurantForm };
