import { PinType } from "../types/types";

// @TODO: types
const convertToGeoJSON = (data: PinType[]): any => {
  return data.map((item) => ({
    type: "Feature",
    properties: {
      cluster: false,
      id: item.id,
      twitterHandle: item.twitterHandle,
      image: item.image
    },
    geometry: {
      type: "Point",
      coordinates: [item.longitude, item.latitude]
    }
  }));
};

export { convertToGeoJSON };
