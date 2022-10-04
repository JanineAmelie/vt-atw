import React, { useRef, useMemo } from "react";
import { MOCK_DATA } from "../utils/mock-data";
import { MapPin, PinType } from "./MapPin";

import {
  MapProvider,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  Map,
  GeolocateControl
} from "react-map-gl";

import type { MapRef } from "react-map-gl";
import MapPopUp from "./MapPopUp";

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

const VtuberMap: React.FunctionComponent<IMapProps> = ({ id, mapStyleURL, mapboxToken }) => {
  const mapRef = useRef<MapRef>(null);
  const [popupInfo, setPopupInfo] = React.useState<PinType | null>(null);

  const pins = useMemo(
    () =>
      MOCK_DATA.map((item) => (
        <MapPin key={item.id} {...item} onClick={() => setPopupInfo(item)} />
      )),
    []
  );

  return (
    <MapProvider>
      {mapRef.current && (
        <Map
          id={id}
          initialViewState={INITIAL_VIEW_STATE}
          style={{ width: "100vw", height: "100vh" }}
          mapStyle={mapStyleURL}
          mapboxAccessToken={mapboxToken}
          projection="globe"
          ref={mapRef}
          onRender={(event) => event.target.resize()}>
          <GeolocateControl position="top-left" />
          <FullscreenControl position="top-left" />
          <NavigationControl />
          <ScaleControl />
          {pins}

          {popupInfo && <MapPopUp {...popupInfo} onCloseCallback={() => setPopupInfo(null)} />}
        </Map>
      )}
    </MapProvider>
  );
};

export default VtuberMap;
