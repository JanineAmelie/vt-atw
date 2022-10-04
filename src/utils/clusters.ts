/* @TODO: cluster functionality
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
  // const onClick = (event: any): void => {
  //   if (event.features?.length) {
  //     const feature = event.features[0];
  //     const clusterId = feature.properties?.cluster_id; //@TODO: change

  //     const mapboxSource = mapRef.current?.getSource("earthquakes") as GeoJSONSource;

  //     mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
  //       if (err) {
  //         return;
  //       }
  //       console.log(feature.geometry.coordinates);
  //       mapRef.current?.easeTo({
  //         center: feature.geometry.coordinates,
  //         zoom,
  //         duration: 500
  //       });
  //     });
  //   }
  // };
// inspect a cluster on click
      mapObject.on("click", "clusters", (event) => {
        console.log("cluster click!");
        if (event.features?.length) {
          const feature = event.features[0];
          const clusterId = feature.properties?.cluster_id; //@TODO: change
          const mapboxSource = mapRef.current?.getSource("earthquakes") as GeoJSONSource;
          mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
            if (err) {
              return;
            }
            if (feature.geometry.type === "Point") {
              console.log("💩", feature.geometry.coordinates);
              const targetLocation: LngLatLike = {
                lng: feature.geometry.coordinates[0],
                lat: feature.geometry.coordinates[1]
              };
              mapRef.current?.easeTo({
                center: targetLocation,
                zoom,
                duration: 500
              });
            }
          });
        }
      });

      mapObject.on("click", "unclustered-point", (e: any) => {
        const coordinates = e.features[0].geometry.coordinates.slice();
        const mag = e.features[0].properties.mag;
        const tsunami = e.features[0].properties.tsunami === 1 ? "yes" : "no";

        // Ensure that if the map is zoomed out such that
        // multiple copies of the feature are visible, the
        // popup appears over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
        console.log("unclusterd point click");
      });
    */
export {};
