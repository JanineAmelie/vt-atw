import React, { useRef, useMemo, useState } from "react";
import { MOCK_DATA } from "../utils/mock-data";
import { MapPin, PinType } from "./MapPin";
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
import { json } from "stream/consumers";

interface IMapProps {
  id: string;
  mapStyleURL: string;
  mapboxToken: string;
}

const VtuberMap: React.FunctionComponent<IMapProps> = ({ id, mapStyleURL, mapboxToken }) => {
  const mapRef = useRef<MapRef>(null);
  const [popupInfo, setPopupInfo] = useState<PinType | null>(null);
  const [viewState, setViewState] = React.useState({
    longitude: -100,
    latitude: 40,
    zoom: 1
  });
  // @TODO:
  // when input data with no city,
  // randomly scatter within country
  // if city randomly scatter in city
  // https://observablehq.com/@jeffreymorganio/random-coordinates-within-a-country

  /* Clustering Logic and "Viewbox" */
  const points = convertToGeoJSON(MOCK_DATA);
  const bounds: any = mapRef.current ? mapRef.current.getMap().getBounds().toArray().flat() : null;
  const bbox: any = [-180, -90, 180, 80];
  const { clusters, supercluster } = useSupercluster({
    points,
    bounds: viewState.zoom < 4.5 ? bbox : bounds,
    zoom: viewState.zoom,
    options: { radius: 75, maxZoom: 5 }
  });

  const handleMove = (evt: ViewStateChangeEvent) => {
    setViewState(evt.viewState);

    // if (popupInfo) {
    //   setPopupInfo(null);
    // }
  };

  const handleMarkerClick = (markerData: PinType) => {
    const { latitude, longitude } = markerData;

    setPopupInfo(markerData);
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
                  style={{
                    // set cluster size depending on how many points are contained
                    width: `${10 + (pointCount / points.length) * 20}px`,
                    height: `${10 + (pointCount / points.length) * 20}px`
                  }}
                  onClick={() => {
                    // How much to zoom to split the cluster
                    const expansionZoom = Math.min(
                      supercluster.getClusterExpansionZoom(cluster.id),
                      20
                    );

                    if (mapRef.current) {
                      mapRef.current.easeTo({
                        center: [longitude, latitude],
                        zoom: expansionZoom,
                        duration: 500
                      });
                    }
                  }}>
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
