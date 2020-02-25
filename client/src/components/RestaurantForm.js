import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Slider } from "@material-ui/core";

const click = () => {
  alert(3);
}

const RestaurantForm = () => (
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

        <div>
          <h1>Categories:</h1>
          <Field type="checkbox" name="african" />
          <label for="african">$ </label>
        </div>

        <button id="3" onClick={click} value="3">  </button>

        <button type="submit" disabled={isSubmitting}>
          Submit
        </button>
      </Form>
    )}
  </Formik>
);

export { RestaurantForm };
