/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable  @typescript-eslint/explicit-module-boundary-types */
// @TODO: fix these warnings^

import { GeoCodeResults } from "../types/interfaces";
import { DataItem } from "../types/types";

const convertToGeoJSON = (data: DataItem[]): GeoJSON.Feature[] => {
  const newData: GeoJSON.Feature[] = [];

  data.forEach((item) => {
    if (item.latitude && item.longitude) {
      newData.push({
        type: "Feature",
        properties: {
          cluster: false,
          id: item.id,
          twitterHandle: item?.username || "",
          image: item?.image || "",
          url: item?.url || "",
          name: item.name
        },
        geometry: {
          type: "Point",
          coordinates: [parseFloat(item.longitude), parseFloat(item.latitude)]
        }
      });
    }
  });

  return newData;
};

// @TODO: any, <-- weakest point of the app
const normalizeTwitterAuthResponse = (data: any): DataItem => {
  const { id_str, name, description, profile_image_url, entities, location } =
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
    longitude: "",
    location
  };
};

const determineIfSelectedLocationIsTypeCountry = (
  selectedLocation: GeoCodeResults
): boolean | null => {
  if (selectedLocation.place_type.length) {
    return selectedLocation.place_type.includes("country");
  }

  return null;
};

const getUserDataById = (users: DataItem[], userId: string): DataItem | null =>
  users.find((element) => element.id === userId) || null;

export {
  convertToGeoJSON,
  normalizeTwitterAuthResponse,
  getUserDataById,
  determineIfSelectedLocationIsTypeCountry
};
