import React, { useState } from "react";
import { MapProvider, Map, Marker, NavigationControl } from "react-map-gl";

interface IMapProps {
  id: string;
  mapStyleURL: string;
  mapboxToken: string;
}

const INITIAL_VIEW_STATE = {
  longitude: -122.4,
  latitude: 37.8,
  zoom: 1
};

const MapView: React.FunctionComponent<IMapProps> = ({ id, mapStyleURL, mapboxToken }) => {
  const [viewState, setViewState] = useState(INITIAL_VIEW_STATE);
  return (
    <MapProvider>
      <Map
        id={id}
        initialViewState={INITIAL_VIEW_STATE}
        onMove={(event: any) => setViewState(event.viewState)}
        style={{ width: "100vw", height: "100vh" }}
        mapStyle={mapStyleURL}
        mapboxAccessToken={mapboxToken}
        onRender={(event) => event.target.resize()}>
        {/* @TODO iterate over data */}
        <Marker longitude={-122.4} latitude={37.8} color="red" />
        <NavigationControl />
      </Map>
    </MapProvider>
  );
};

export default MapView;
