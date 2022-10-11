import { dataItem } from "../types/types";

// @TODO: types
const convertToGeoJSON = (data: dataItem[]): any => {
  return data.map((item) => ({
    type: "Feature",
    properties: {
      cluster: false,
      id: item.id,
      twitterHandle: item?.twitterHandle || "",
      image: item?.image || "",
      url: item?.url || ""
    },
    geometry: {
      type: "Point",
      coordinates: [item.longitude, item.latitude]
    }
  }));
};

export { convertToGeoJSON };
