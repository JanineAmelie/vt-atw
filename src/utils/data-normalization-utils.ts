import { DataItem } from "../types/types";

// @TODO: types
const convertToGeoJSON = (data: DataItem[]): any => {
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

const normalizeTwitterAuthResponse = (data: any): any => {
  const { id_str, name, description, profile_image_url, entities } =
    data.additionalUserInfo.profile;
  const { username } = data.additionalUserInfo;

  return {
    id: id_str,
    name,
    username,
    description,
    image: profile_image_url.replace("_normal", ""),
    url: entities?.url?.urls[0]?.expanded_url || "",
    latitude: "",
    longitude: ""
  };
};

export { convertToGeoJSON, normalizeTwitterAuthResponse };
