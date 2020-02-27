import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button } from "@material-ui/core";
import { CategoriesButton } from "./CategoriesButton";

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
        <Form style={{ color: "white" }}>
          <div>
            <h1>Location:</h1>
            <Field type="text" name="location"></Field>
          </div>

          <div>
            <h1>Radius (miles):</h1>
            <label for="radius">1</label>
            <Field type="range" min={1} max={25} name="radius" />
            <label for="radius">25</label>
          </div>

          <div>
            <h1>Price:</h1>
            <Field type="checkbox" name="cheap" />
            <label for="cheap">$ </label>
            <Field type="checkbox" name="average" />
            <label for="average">$$ </label>
            <Field type="checkbox" name="nice" />
            <label for="nice">$$$ </label>
            <Field type="checkbox" name="fancy" />
            <label for="fancy">$$$$</label>
          </div>

          <br />

          <Button
            type="submit"
            disabled={isSubmitting}
            size="large"
            variant="contained"
          >
            SUBMIT
          </Button>
        </Form>
      )}
    </Formik>
  </div>
);

export { RestaurantForm };
