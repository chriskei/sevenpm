import React, { Fragment } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button } from "@material-ui/core";
import { CategoriesButton } from "./CategoriesButton";

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

const json1 = { addedValue: "1" };

const RestaurantForm = () => (
  <div>
    <CategoriesButton />
    <Formik
      initialValues={{
        location: "",

        radius: 1,

        cheap: false,
        average: false,
        nice: false,
        fancy: false
      }}
      onSubmit={(values, { setSubmitting }) => {
        for (var key in json1) {
          values[key] = json1[key];
        }
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form style={formStyles}>
          <div>
            <h1>Location:</h1>
            <Field type="text" name="location" style={widthStyles}></Field>
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

          <Fragment style={checkboxStyles}>
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
          </Fragment>

          <br />
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

export { RestaurantForm };
