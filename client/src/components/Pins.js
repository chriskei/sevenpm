import React from "react";
import { Marker } from "react-map-gl";

const ICON = `M14,20L14,20L20,30L25,20L25.4,19A6.4,7,180,1,0,13.5,19L13.6,19L14,20z`;

const Pins = props => {
  const { data, onClick } = props;

  return data.map((city, index) => {
    return (
      <Marker
        key={`marker-${index}`}
        latitude={city.latitude}
        longitude={city.longitude}
      >
        <svg
          height={30}
          viewBox="12 8 15 24"
          style={{
            cursor: "pointer",
            fill: "yellow",
            stroke: "black",
            strokeWidth: "2px"
          }}
          onClick={() => onClick(city)}
        >
          <path d={ICON} />
        </svg>
      </Marker>
    );
  });
};

export { Pins };
