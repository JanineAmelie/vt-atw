import React, { useState } from "react";

/*
// @ts-expect-error: is for transpilation
import mapboxgl from "!mapbox-gl"; // eslint-disable-line
const { MapProvider, Map, Marker } = mapboxgl;
*/
import { MapProvider, Map, Marker } from "react-map-gl";

interface IMapProps {
  id: string;
  mapStyleURL: string;
  mapboxToken: string;
}

const INITIAL_VIEW_STATE = {
  longitude: -122.4,
  latitude: 37.8,
  zoom: 14
};

const MapView: React.FunctionComponent<IMapProps> = ({ id, mapStyleURL, mapboxToken }) => {
  const [viewState, setViewState] = useState(INITIAL_VIEW_STATE);

  return (
    <MapProvider>
      <Map
        id={id}
        initialViewState={INITIAL_VIEW_STATE}
        onMove={(event: any) => setViewState(event.viewState)}
        style={{ width: "100%", height: "100%" }}
        mapStyle={mapStyleURL}
        mapboxAccessToken={mapboxToken}>
        {/* @TODO iterate over data */}
        <Marker longitude={-122.4} latitude={37.8} color="red" />
      </Map>
    </MapProvider>
  );
};

export default MapView;
