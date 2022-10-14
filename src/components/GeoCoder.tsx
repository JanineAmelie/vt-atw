import React, { useState } from "react";
import styled from "@emotion/styled";
import Tooltip from "@mui/material/Tooltip";
import { GeoCodeResults } from "../types/interfaces";

interface IGeoCoderProps {
  apiToken: string;
}

const GeoCoder: React.FunctionComponent<IGeoCoderProps> = ({ apiToken }) => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResults] = useState<GeoCodeResults | null>(null);
  // https://raw.githubusercontent.com/visgl/react-map-gl/7.0-release/examples/geocoder/src/geocoder-control.tsx
  // const ctrl = new MapboxGeocoder({
  //   ...props,
  //   marker: false,
  //   accessToken: props.mapboxAccessToken
  // });
  // ctrl.on("loading", props.onLoading);
  // ctrl.on("results", props.onResults);
  // // ctrl.on("result", (evt) => {
  //   props.onResult(evt);

  //   const { result } = evt;
  //   const location =
  //     result &&
  //     (result.center || (result.geometry?.type === "Point" && result.geometry.coordinates));
  //   if (location && props.marker) {
  //     setMarker(<Marker {...props.marker} longitude={location[0]} latitude={location[1]} />);
  //   } else {
  //     setMarker(null);
  //   }
  // });
  // ctrl.on("error", props.onError);
  // return ctrl;

  return <div>geocoder goes here</div>;
};

export { GeoCoder };
