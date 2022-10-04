const convertToGeoJSON = (data: any) => {
  return data.map((item: any) => ({
    type: "Feature",
    properties: {
      cluster: false,
      id: item.id,
      twitterHandle: item.twitter_handle,
      image: item.image
    },
    geometry: {
      type: "Point",
      coordinates: [parseFloat(item.longitude), parseFloat(item.latitude)]
    }
  }));
};

export { convertToGeoJSON };
