import React from "react";
import { Box, Typography } from "@material-ui/core";

const RestaurantInfo = props => {
  const { info } = props;
  const { name, image_url, url, categories, rating, price, location } = info;
  const { address1, city, zip_code, state } = location;
  const categoryTitles = categories.map(category => category.title);

  return (
    <Box maxWidth="250px">
      <a target="_new" href={url} style={{ fontSize: "22px" }}>
        {name}
      </a>
      <Box style={{ marginTop: "0px", marginBottom: "0px" }}>
        <Typography>
          <b>Address:</b> {address1}, {city}, {state} {zip_code}
        </Typography>
        <Typography>
          <b>Categories:</b> {categoryTitles.join(", ")}
        </Typography>
        <Typography>
          <b>Rating:</b> {rating}/5, <b>Price:</b> {price}
        </Typography>
        <img width={250} height={175} src={image_url} />
      </Box>
    </Box>
  );
};

export { RestaurantInfo };
