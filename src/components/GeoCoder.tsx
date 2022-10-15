import React, { useState, useRef, useCallback } from "react";
import styled from "@emotion/styled";
import { GeoCodeResults } from "../types/interfaces";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import TextField from "@mui/material/TextField";
import { useEffectOnce } from "../utils/useEffectOnce";
import debounce from "lodash.debounce";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";

interface IGeoCoderProps {
  apiToken: string;
}

const GeoCoder: React.FunctionComponent<IGeoCoderProps> = ({ apiToken }) => {
  const [inputValue, setInputValue] = useState("");

  const [selectedLocation, setSelectedLocation] = useState<GeoCodeResults | null>(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<readonly GeoCodeResults[]>([]);
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
    geocoderRef.current.on("loading", () => setLoading(true));
    geocoderRef.current.on("error", (e) => setError(e));
    geocoderRef.current.on("results", (evt) => {
      setLoading(false);
      setResults(evt.features);
    });

    geocoderRef.current.addTo("#geocoder");
  });

  const queryGeoCoder = (value: string) => {
    console.log("queryingGeocoder", value);
    geocoderRef.current.setInput(value);
    geocoderRef.current.query(value);
  };

  const debounceQueryGeocoder = useCallback(debounce(queryGeoCoder, 300), []);

  const handleInputChange = (newValue: string) => {
    console.log("trigger handleInputChange");
    setInputValue(newValue);
    console.log("selectedLocation", selectedLocation);
    if (!selectedLocation) {
      console.log("line 54");
      debounceQueryGeocoder(newValue);
    }
  };

  const handleResultClick = (resultId: string) => {
    if (results?.length) {
      const selectedItem = results?.find((item) => item.id === resultId);
      if (selectedItem) {
        const placename = selectedItem.place_name;
        console.log("new Selected", selectedItem);
        // setInput(placename);
        setSelectedLocation(selectedItem);

        // geocoderRef.current.setInput(inputValue);
      }
    }

    //fix witr refs, or fix with persist., fix with everything in dep array

    // if user searched for only a country

    // then get longLat values of random point inside coutnry boundaries
  };

  return (
    <div>
      <SGeoCoder id="geocoder" />

      <Stack spacing={2} sx={{ m: 2, width: 300 }}>
        <Autocomplete
          freeSolo
          inputValue={inputValue}
          value={selectedLocation}
          onChange={(
            event: React.SyntheticEvent<Element, Event>,
            newValue: string | GeoCodeResults | null
          ) => {
            newValue && typeof newValue !== "string" && setSelectedLocation(newValue);

            // newValue && typeof newValue !== "string" && handleResultClick(newValue.id);
          }}
          onInputChange={(event, newInputValue) => {
            selectedLocation && setSelectedLocation(null);
            handleInputChange(newInputValue);
          }}
          options={results}
          getOptionLabel={(option) => (typeof option === "string" ? option : option.place_name)}
          renderInput={(params) => (
            <TextField {...params} id="outlined-name" label="Location Search" />
          )}
        />
      </Stack>
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
