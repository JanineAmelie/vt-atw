import React, { useRef, useState } from "react";
import { MOCK_DATA } from "../utils/mock-data";
import { MapPin } from "./MapPin";
import useSupercluster from "use-supercluster";
import { BBox } from "geojson";

import {
  MapProvider,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  Map,
  GeolocateControl,
  Marker,
  ViewStateChangeEvent
} from "react-map-gl";

import type { MapRef } from "react-map-gl";
import MapPopUp from "./MapPopUp";
import { convertToGeoJSON } from "../utils/convert-to-geojson";
import { IMapProps } from "../types/interfaces";
import { PinType } from "../types/types";

const VtuberMap: React.FunctionComponent<IMapProps> = ({ id, mapStyleURL, mapboxToken }) => {
  const mapRef = useRef<MapRef>(null);
  const [popupInfo, setPopupInfo] = useState<PinType | null>(null);
  const [viewState, setViewState] = React.useState({
    longitude: -100,
    latitude: 40,
    zoom: 1
  });

  /* Clustering Logic and "Viewbox" */
  const points = convertToGeoJSON(MOCK_DATA);
  let bounds: BBox | undefined = undefined; // @TODO: double check typing and guards

  if (mapRef.current) {
    bounds = mapRef.current.getMap().getBounds().toArray().flat() as BBox;
  }

  const bbox: BBox = [-180, -90, 180, 80];
  const { clusters, supercluster } = useSupercluster({
    points,
    bounds: viewState.zoom < 4.5 ? bbox : bounds,
    zoom: viewState.zoom,
    options: { radius: 75, maxZoom: 5 }
  });

  const handleMove = (evt: ViewStateChangeEvent) => {
    setViewState(evt.viewState);
  };

  const handleMarkerClick = (markerData: PinType) => {
    const { latitude, longitude } = markerData;

    // move to the clicked cluster
    if (mapRef.current) {
      mapRef.current.easeTo({
        center: [longitude, latitude]
      });
      setPopupInfo(markerData);
    }
  };

  const handleClusterClick = (clusterId: string, latitude: number, longitude: number) => {
    // How much to zoom to split the cluster
    const expansionZoom = Math.min(supercluster.getClusterExpansionZoom(clusterId), 20);
    // move to the clicked cluster
    if (mapRef.current) {
      mapRef.current.easeTo({
        center: [longitude, latitude],
        zoom: expansionZoom,
        duration: 500
      });
    }
  };

  // set cluster size depending on how many points are contained
  const getClusterSize = (pointCount: number) => {
    const size = `${10 + (pointCount / points.length) * 20}px`;
    return {
      width: size,
      height: size
    };
  };

  return (
    <MapProvider>
      <Map
        {...viewState}
        id={id}
        style={{ width: "100vw", height: "100vh" }}
        mapStyle={mapStyleURL}
        mapboxAccessToken={mapboxToken}
        projection="globe"
        ref={mapRef}
        onMove={(evt) => handleMove(evt)}
        onRender={(event) => event.target.resize()}>
        <GeolocateControl position="top-left" />
        <FullscreenControl position="top-left" />
        <NavigationControl />
        <ScaleControl />
        {clusters.map((cluster) => {
          const [longitude, latitude] = cluster.geometry.coordinates;
          const {
            cluster: isCluster,
            point_count: pointCount,
            id,
            image,
            twitterHandle
          } = cluster.properties;

          if (isCluster) {
            return (
              <Marker key={`cluster-${cluster.id}`} latitude={latitude} longitude={longitude}>
                <div
                  className="cluster-marker"
                  style={getClusterSize(pointCount)}
                  onClick={() => handleClusterClick(cluster.id, latitude, longitude)}>
                  {pointCount}
                </div>
              </Marker>
            );
          }

          return (
            <MapPin
              key={`point-${id}`}
              id={id}
              twitterHandle={twitterHandle}
              image={image}
              latitude={latitude}
              longitude={longitude}
              onClick={() =>
                handleMarkerClick({
                  ...cluster.properties,
                  latitude,
                  longitude
                })
              }
            />
          );
        })}

        {popupInfo && <MapPopUp {...popupInfo} onCloseCallback={() => setPopupInfo(null)} />}
      </Map>
    </MapProvider>
  );
};

export default VtuberMap;
