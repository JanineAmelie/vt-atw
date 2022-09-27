import React, { useState, useRef } from "react";
import { render } from "react-dom";
import { MapProvider, Map, NavigationControl, Source, Layer } from "react-map-gl";
import { clusterLayer, clusterCountLayer, unclusteredPointLayer } from "../utils/layers";

import type { MapRef, GeoJSONSource } from "react-map-gl";

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

  const onClick = (event: any) => {
    console.log(event);

    if (event.features.length) {
      const feature = event.features[0];
      const clusterId = feature.properties.cluster_id; //@TODO: change

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
