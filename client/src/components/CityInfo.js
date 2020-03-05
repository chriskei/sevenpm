import React from "react";

const CityInfo = props => {
  const { info } = props;
  const { city, state } = info;

  return (
    <div>
      <h1>
        {city}, {state}
      </h1>
    </div>
  );
};

export { CityInfo };
