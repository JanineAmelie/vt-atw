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
  Marker
} from "react-map-gl";

import type { MapRef } from "react-map-gl";
import MapPopUp from "./MapPopUp";
import { convertToGeoJSON } from "../utils/convert-to-geojson";

interface IMapProps {
  id: string;
  mapStyleURL: string;
  mapboxToken: string;
}

// const INITIAL_VIEW_STATE = {
//   longitude: -122.4,
//   latitude: 37.8,
//   zoom: 1
// };

const VtuberMap: React.FunctionComponent<IMapProps> = ({ id, mapStyleURL, mapboxToken }) => {
  const mapRef = useRef<MapRef>(null);
  const [popupInfo, setPopupInfo] = useState<PinType | null>(null);
  const [viewState, setViewState] = React.useState({
    longitude: -100,
    latitude: 40,
    zoom: 1
  });

  // const pins = useMemo(
  //   () =>
  //     MOCK_DATA.map((item) => (
  //       <MapPin key={item.id} {...item} onClick={() => setPopupInfo(item)} />
  //     )),
  //   []
  // );

  const points = convertToGeoJSON(MOCK_DATA);
  const bounds: any = mapRef.current ? mapRef.current.getMap().getBounds().toArray().flat() : null;

  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom: viewState.zoom,
    options: { radius: 75, maxZoom: 5, minZoom: 1, extent: 3000 }
  });

  // console.log(points);

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
        onMove={(evt) => setViewState(evt.viewState)}
        onRender={(event) => event.target.resize()}>
        <GeolocateControl position="top-left" />
        <FullscreenControl position="top-left" />
        <NavigationControl />
        <ScaleControl />
        {/* {pins} */}
        {clusters.map((cluster) => {
          const [longitude, latitude] = cluster.geometry.coordinates;
          const { cluster: isCluster, point_count: pointCount } = cluster.properties;
          //https://www.leighhalliday.com/mapbox-clustering
          if (isCluster) {
            return (
              <Marker key={`cluster-${cluster.id}`} latitude={latitude} longitude={longitude}>
                <div
                  className="cluster-marker"
                  style={{
                    width: `${10 + (pointCount / points.length) * 20}px`,
                    height: `${10 + (pointCount / points.length) * 20}px`
                  }}
                  onClick={() => {
                    console.log("poop");
                    // const expansionZoom = Math.min(
                    //   supercluster.getClusterExpansionZoom(cluster.id),
                    //   20
                    // );

                    // setViewport({
                    //   ...viewport,
                    //   latitude,
                    //   longitude,
                    //   zoom: expansionZoom,
                    //   transitionInterpolator: new FlyToInterpolator({
                    //     speed: 2
                    //   }),
                    //   transitionDuration: "auto"
                    // });
                  }}>
                  {pointCount}
                </div>
              </Marker>
            );
          }

          return (
            <MapPin
              key={`point-${cluster.properties.id}`}
              id={cluster.properties.id}
              twitter_handle={cluster.properties.twitter_handle}
              image={cluster.properties.image}
              onClick={() => setPopupInfo(cluster.properties)}
              latitude={latitude}
              longitude={longitude}
            />
          );
        })}

        {popupInfo && <MapPopUp {...popupInfo} onCloseCallback={() => setPopupInfo(null)} />}
      </Map>
    </MapProvider>
  );
};

export default VtuberMap;
