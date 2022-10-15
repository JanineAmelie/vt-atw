import React, { useState, useRef, useCallback, useEffect } from "react";
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
  const [error, setError] = useState("");
  const geocoderRef = useRef(
    new MapboxGeocoder({
      accessToken: apiToken,
      marker: false
    })
  );

  useEffectOnce(() => {
    geocoderRef.current.on("loading", () => setLoading(true));
    geocoderRef.current.on("error", (error: string) => setError(error));
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

  // if user searched for only a country
  // then get longLat values of random point inside coutnry boundaries

  useEffect(() => {
    if (!selectedLocation) {
      debounceQueryGeocoder(inputValue); // make api call
    }
  }, [inputValue, selectedLocation]);

  return (
    <div>
      <SGeoCoder id="geocoder" />

      <Stack spacing={2} sx={{ m: 2, width: 300 }}>
        <Autocomplete
          loading={loading}
          freeSolo
          inputValue={inputValue}
          value={selectedLocation}
          onChange={(
            event: React.SyntheticEvent<Element, Event>,
            newValue: string | GeoCodeResults | null
          ) => {
            newValue && typeof newValue !== "string" && setSelectedLocation(newValue);
          }}
          onInputChange={(event, newInputValue) => {
            selectedLocation && setSelectedLocation(null);
            setInputValue(newInputValue);
          }}
          options={results}
          getOptionLabel={(option) => (typeof option === "string" ? option : option.place_name)}
          renderInput={(params) => (
            <TextField
              error={!!error}
              helperText={error}
              {...params}
              id="outlined-name"
              label="Location Search"
            />
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
