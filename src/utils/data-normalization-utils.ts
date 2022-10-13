import { DataItem } from "../types/types";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// @TODO: types
const convertToGeoJSON = (data: DataItem[]) => {
  return data.map((item) => ({
    type: "Feature",
    properties: {
      cluster: false,
      id: item.id,
      twitterHandle: item?.username || "",
      image: item?.image || "",
      url: item?.url || ""
    },
    geometry: {
      type: "Point",
      coordinates: [item.longitude, item.latitude]
    }
  }));
};

// @TODO: any
const normalizeTwitterAuthResponse = (data: any) => {
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
