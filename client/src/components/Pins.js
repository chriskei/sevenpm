import React from "react";
import { Marker } from "react-map-gl";

// Custom map pointer SVG
const ICON = `M14,20L14,20L20,30L25,20L25.4,19A6.4,7,180,1,0,13.5,19L13.6,19L14,20z`;

// Pointers on map
const Pins = props => {
  const { data, onClick } = props;

  // Ensure there are some restaurants to create pointers for
  if (data.length > 0) {
    return data.map(restaurant => {
      const { id, coordinates } = restaurant;

      return (
        <Marker
          key={`marker-${id}`}
          latitude={coordinates.latitude}
          longitude={coordinates.longitude}
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
            onClick={() => onClick(restaurant)}
          >
            <path d={ICON} />
          </svg>
        </Marker>
      );
    });
  }

  // When there are no restaurants to create pointers for
  return null;
};

export { Pins };
