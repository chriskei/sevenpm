import React from "react";
import { Box, Typography } from "@material-ui/core";

// Styling
const styles = {
  anchorStyles: {
    fontSize: "22px"
  },
  boxStyles: {
    marginTop: "0px",
    marginBottom: "0px"
  }
};

// Pop up that appears when you click on a restaurant pin
const RestaurantInfo = props => {
  const { info } = props;
  const { name, image_url, url, categories, price, location } = info;
  const { address1, city, zip_code, state } = location;
  const categoryTitles = categories.map(category => category.title);

  return (
    <Box maxWidth="250px">
      <a target="_new" href={url} style={styles.anchorStyles}>
        {name}
      </a>
      <Box style={styles.boxStyles}>
        <Typography>
          <b>Address:</b> {address1}, {city}, {state} {zip_code}
        </Typography>
        <Typography>
          <b>Categories:</b> {categoryTitles.join(", ")}
        </Typography>
        <Typography>
          <b>Price:</b> {price}
        </Typography>
        <img width={250} height={175} src={image_url} />
      </Box>
    </Box>
  );
};

export { RestaurantInfo };
