import React, { useState, useRef, useCallback } from "react";
import { render } from "react-dom";
import { MapProvider, Map, NavigationControl, Source, Layer } from "react-map-gl";
import { clusterLayer, clusterCountLayer, unclusteredPointLayer } from "../utils/layers";

import type { MapRef, GeoJSONSource, ViewStateChangeEvent, MapLayerMouseEvent } from "react-map-gl";

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

const MapView: React.FunctionComponent<IMapProps> = ({ id, mapStyleURL, mapboxToken }) => {
  const mapRef = useRef<MapRef>(null);
  const [userInteracting, setUserInteracting] = useState<boolean>(false);
  const [spinEnabled, setSpinEnabled] = useState<boolean>(true);

  // At low zooms, complete a revolution every two minutes.
  const secondsPerRevolution = 120;
  // Above zoom level 5, do not rotate.
  const maxSpinZoom = 5;
  // Rotate at intermediate speeds between zoom levels 3 and 5.
  const slowSpinZoom = 3;

  /** MAP EVENTS */
  const onClick = (event: any): void => {
    if (event.features?.length) {
      const feature = event.features[0];
      const clusterId = feature.properties?.cluster_id; //@TODO: change

      const mapboxSource = mapRef.current?.getSource("earthquakes") as GeoJSONSource;

      mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
        if (err) {
          return;
        }

        mapRef.current?.easeTo({
          center: feature.geometry.coordinates,
          zoom,
          duration: 500
        });
      });
    }
  };

  const spinGlobe = (): void => {
    if (mapRef.current) {
      const zoom = mapRef.current.getZoom();
      if (spinEnabled && !userInteracting && zoom < maxSpinZoom) {
        let distancePerSecond = 360 / secondsPerRevolution;
        if (zoom > slowSpinZoom) {
          // Slow spinning at higher zooms
          const zoomDif = (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom);
          distancePerSecond *= zoomDif;
        }
        const center = mapRef.current.getCenter();
        center.lng -= distancePerSecond;
        // Smoothly animate the map over one second.
        // When this animation is complete, it calls a 'moveend' event.
        mapRef.current?.easeTo({ center, duration: 1000, easing: (n) => n });
      }
    }
  };

  const onMapLoad = useCallback(() => {
    const mapObject = mapRef.current;
    if (mapObject) {
      // Pause spinning on interaction
      mapObject.on("mousedown", () => {
        setUserInteracting(true);
      });

      // Restart spinning the globe when interaction is complete
      mapObject.on("mouseup", () => {
        setUserInteracting(false);
        spinGlobe();
      });

      // These events account for cases where the mouse has moved
      // off the map, so 'mouseup' will not be fired.
      mapObject.on("dragend", () => {
        setUserInteracting(false);
        spinGlobe();
      });
      mapObject.on("pitchend", () => {
        setUserInteracting(false);
        spinGlobe();
      });
      mapObject.on("rotateend", () => {
        setUserInteracting(false);
        spinGlobe();
      });

      // When animation is complete, start spinning if there is no ongoing interaction
      mapObject.on("moveend", () => {
        console.log("moveend");
        spinGlobe();
      });
    }
    spinGlobe();
  }, []);

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
        interactiveLayerIds={[clusterLayer.id || ""]}
        onClick={onClick}
        onLoad={onMapLoad}
        projection="globe"
        ref={mapRef}
        onRender={(event) => event.target.resize()}>
        {/* @TODO iterate over data */}
        <Source
          id="earthquakes"
          type="geojson"
          data="https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson"
          cluster={true}
          clusterMaxZoom={14}
          clusterRadius={50}>
          <Layer {...clusterLayer} />
          <Layer {...clusterCountLayer} />
          <Layer {...unclusteredPointLayer} />
        </Source>

        <NavigationControl />
      </Map>
    </MapProvider>
  );
};

export default MapView;
