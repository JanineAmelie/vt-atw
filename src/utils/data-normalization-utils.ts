import { AuthedUser, DataItem } from "../types/types";

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

const twitterOriginalImageRegex = "/(_normal|_bigger|_mini)/g";

const normalizeTwitterAuthResponse = (data: any): any => {
  // debugger;
  // const { id_str, name, description, profile_image_url, entities } =
  //   data.additionalUserInfo.profile;
  // const { username } = data.additionalUserInfo;

  // return {
  //   id: id_str,
  //   name,
  //   username,
  //   description,
  //   image: profile_image_url.replace("_normal", ""), // @TODO: use regex
  //   url: entities?.url?.urls[0]?.expanded_url || ""
  // };

  return {};
};

export { convertToGeoJSON, normalizeTwitterAuthResponse };
