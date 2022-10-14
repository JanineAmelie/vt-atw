import React, { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import Tooltip from "@mui/material/Tooltip";
import { GeoCodeResults } from "../types/interfaces";
import MapboxGeocoder, { GeocoderOptions } from "@mapbox/mapbox-gl-geocoder";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useEffectOnce } from "../utils/useEffectOnce";

interface IGeoCoderProps {
  apiToken: string;
}

const GeoCoder: React.FunctionComponent<IGeoCoderProps> = ({ apiToken }) => {
  const [input, setInput] = useState("");

  const [selectedLocation, setSelectedLocation] = useState<GeoCodeResults | null>(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<GeoCodeResults[] | null>(null);
  const [error, setError] = useState(null);
  // https://raw.githubusercontent.com/visgl/react-map-gl/7.0-release/examples/geocoder/src/geocoder-control.tsx
  const geocoderRef = useRef(
    new MapboxGeocoder({
      accessToken: apiToken,
      marker: false,
      clearAndBlurOnEsc: true
    })
  );

  useEffectOnce(() => {
    // const geocoder = ;

    console.log("my effect is running");
    geocoderRef.current.on("loading", () => setLoading(true));
    // geocoder.on("results", () => setLoading(false));
    geocoderRef.current.on("error", (e) => setError(e));
    geocoderRef.current.on("results", (evt) => {
      const { result } = evt;
      const location =
        result &&
        (result.center || (result.geometry?.type === "Point" && result.geometry.coordinates));
      setResults(evt.features);
      // console.log(evt);
    });

    geocoderRef.current.addTo("#geocoder");
  });

  const queryGeoCoder = (searchInput: string) => {
    // geocoderRef.current.setInput(searchInput);
    geocoderRef.current.query(searchInput);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault;
    setInput(event.target.value);
  };

  const handleResultClick = (resultId: string) => {
    if (results?.length) {
      const selectedItem = results?.find((item) => item.id === resultId);
      if (selectedItem) {
        const placename = selectedItem.place_name;
        console.log(selectedItem);
        setInput(placename);
        setSelectedLocation(selectedItem);

        geocoderRef.current.setInput(input);
      }
    }

    // if user searched for only a country

    // then get longLat values of random point inside coutnry boundaries
  };

  return (
    <div>
      <p>ERROR: {JSON.stringify(error)}</p>
      <button onClick={() => queryGeoCoder(input)}>SEARCH </button>
      <SGeoCoder id="geocoder"></SGeoCoder>
      <TextField
        id="outlined-name"
        label="Location Search"
        value={input}
        onChange={handleInputChange}
      />

      {results && (
        <ul>
          {results.map((item) => (
            <li onClick={(e) => handleResultClick(item.id)} key={item.id}>
              {item.place_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const SGeoCoder = styled.div`
  display: none;
  .suggestions-wrapper {
    display: none;
  }

  .mapboxgl-ctrl-geocoder--pin-right {
    display: none;
  }

  .mapboxgl-ctrl-geocoder--icon {
    display: none;
  }
`;
export { GeoCoder };
