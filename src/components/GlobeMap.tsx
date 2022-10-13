import React, { useRef, useState } from "react";
import type { MapRef } from "react-map-gl";
import useSupercluster from "use-supercluster";
import { BBox } from "geojson";
import styled from "@emotion/styled";

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

import { convertToGeoJSON } from "../utils/data-normalization-utils";
import { HEADER_BAR_HEIGHT } from "../utils/constants";

import { MapPin } from "./MapPin";
import MapPopUp from "./MapPopUp";

import { IMapProps, IPopupProps } from "../types/interfaces";

const GlobeMap: React.FunctionComponent<IMapProps> = ({ id, mapStyleURL, mapboxToken }) => {
  const mapRef = useRef<MapRef>(null);
  const [popupInfo, setPopupInfo] = useState<IPopupProps | null>();
  const [viewState, setViewState] = React.useState({
    longitude: -100,
    latitude: 40,
    zoom: 1
  });

  /* Clustering Logic and "Viewbox" */
  const points = convertToGeoJSON([]); // Prepare Data
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

  /** EVENT HANDLERS */
  const handleMove = (evt: ViewStateChangeEvent) => {
    setViewState(evt.viewState);
  };

  const handleMarkerClick = (markerData: IPopupProps) => {
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

  const mapStyles = {
    width: "100vw",
    height: `calc(100vh - ${HEADER_BAR_HEIGHT}px)`
  };

  return (
    <MapProvider>
      <Map
        {...viewState}
        id={id}
        style={mapStyles}
        mapStyle={mapStyleURL}
        mapboxAccessToken={mapboxToken}
        projection="globe"
        ref={mapRef}
        onMove={(evt) => handleMove(evt)}
        onRender={(event) => event.target.resize()}>
        <GeolocateControl position="top-left" />
        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" />
        <ScaleControl />
        {clusters.map((cluster) => {
          const [longitude, latitude] = cluster.geometry.coordinates;
          const { cluster: isCluster, point_count: pointCount, id, image } = cluster.properties;

          if (isCluster) {
            return (
              <Marker key={`cluster-${cluster.id}`} latitude={latitude} longitude={longitude}>
                <SClusterMarker
                  style={getClusterSize(pointCount)}
                  onClick={() => handleClusterClick(cluster.id, latitude, longitude)}>
                  {pointCount}
                </SClusterMarker>
              </Marker>
            );
          }

          return (
            <MapPin
              key={`point-${id}`}
              id={id}
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

const SClusterMarker = styled.div`
  color: #fff;
  background: #1978c8;
  border-radius: 50%;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default GlobeMap;
