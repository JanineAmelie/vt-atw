import React from "react";
import { Marker } from "react-map-gl";
import { IMapPinProps } from "../types/interfaces";

const MapPin: React.FunctionComponent<IMapPinProps> = ({
  id,
  longitude,
  latitude,
  image,
  onClick
}) => {
  return (
    <Marker
      key={`marker-${id}`}
      longitude={longitude}
      latitude={latitude}
      anchor="bottom"
      onClick={(e) => {
        // If we let the click event propagates to the map, it will immediately close the popup
        // with `closeOnClick: true`
        e.originalEvent.stopPropagation();
        onClick();
      }}>
      <img src={image} width="40" height={40} />
    </Marker>
  );
};

export { MapPin };
