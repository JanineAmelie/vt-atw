import React, { useState, useRef, useCallback } from "react";
import { render } from "react-dom";
import { MapProvider, Map, NavigationControl, Source, Layer, Popup } from "react-map-gl";
import { clusterLayer, clusterCountLayer, unclusteredPointLayer } from "../utils/layers";

import type {
  MapRef,
  GeoJSONSource,
  ViewStateChangeEvent,
  MapLayerMouseEvent,
  LngLatLike
} from "react-map-gl";

interface IMapProps {
  id: string;
  mapStyleURL: string;
  mapboxToken: string;
}

const INITIAL_VIEW_STATE = {
  longitude: -122.4,
  latitude: 37.8,
  zoom: 3
};

const MapSpin: React.FunctionComponent<IMapProps> = ({ id, mapStyleURL, mapboxToken }) => {
  const mapRef = useRef<MapRef>(null);
  const [spinEnabled, setSpinEnabled] = useState<boolean>(true);
  const [viewState, setViewState] = useState(INITIAL_VIEW_STATE);
  const [showPopup, setShowPopup] = React.useState(false);

  let userInteracting = false;

  // At low zooms, complete a revolution every two minutes.
  const secondsPerRevolution = 120;
  // Above zoom level 5, do not rotate.
  const maxSpinZoom = 5;
  // Rotate at intermediate speeds between zoom levels 3 and 5.
  const slowSpinZoom = 3;

  /** MAP EVENTS */

  const spinGlobe = (): void => {
    if (mapRef.current) {
      //   console.log("userInteracting", userInteracting);
      const zoom = mapRef.current.getZoom();
      if (spinEnabled && !userInteracting && zoom < maxSpinZoom) {
        let distancePerSecond = 360 / secondsPerRevolution;
        if (zoom > slowSpinZoom) {
          // Slow spinning at higher zooms
          const zoomDif = (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom);
          distancePerSecond *= zoomDif;
        }
        const center = mapRef.current.getCenter();
        const targetLocation: LngLatLike = {
          lat: center.lat,
          lng: center.lng - distancePerSecond
        };

        // Smoothly animate the map over one second.
        // When this animation is complete, it calls a 'moveend' event.
        if (!mapRef.current.isEasing()) {
          mapRef.current?.easeTo({ center: targetLocation, duration: 1000, easing: (n) => n });
        }
      }
    }
  };

  const onMapLoad = useCallback(() => {
    const mapObject = mapRef.current;
    if (mapObject) {
      // Pause spinning on interaction
      mapObject.on("mousedown", () => {
        // setUserInteracting(true);
        userInteracting = true;
      });

      // Restart spinning the globe when interaction is complete
      mapObject.on("mouseup", () => {
        userInteracting = false;
        spinGlobe();
      });

      mapObject.on("wheel", () => {
        userInteracting = true;
      });

      mapObject.on("zoomend", () => {
        userInteracting = false;
        spinGlobe();
      });

      // These events account for cases where the mouse has moved
      // off the map, so 'mouseup' will not be fired.
      mapObject.on("dragend", () => {
        userInteracting = false;

        spinGlobe();
      });
      mapObject.on("pitchend", () => {
        userInteracting = false;

        spinGlobe();
      });
      mapObject.on("rotateend", () => {
        userInteracting = false;

        spinGlobe();
      });

      // When animation is complete, start spinning if there is no ongoing interaction

      mapObject.on("moveend", () => {
        spinGlobe();
      });
    }

    spinGlobe();
  }, []);

  return (
    <MapProvider>
      <Map
        id={id}
        initialViewState={INITIAL_VIEW_STATE}
        onMove={(event: any) => setViewState(event.viewState)}
        style={{ width: "100vw", height: "100vh" }}
        mapStyle={mapStyleURL}
        mapboxAccessToken={mapboxToken}
        onLoad={onMapLoad}
        projection="globe"
        ref={mapRef}
        onRender={(event) => event.target.resize()}>
        {showPopup && (
          <Popup longitude={-100} latitude={40} anchor="bottom" onClose={() => setShowPopup(false)}>
            You are here
          </Popup>
        )}
        <NavigationControl />
      </Map>
    </MapProvider>
  );
};

export default MapSpin;
