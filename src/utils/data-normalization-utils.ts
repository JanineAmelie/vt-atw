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

const getRandomNumberInRange = (num1: number, num2: number): number => {
  // get min max, of two numbers as when we pass coordinates, we don't know
  // which one of the two is the smaller number.
  const min = Math.min(num1, num2);
  const max = Math.max(num1, num2);

  return Math.random() * (max - min) + min;
};

const getRandomPointInBbox = (bbox: number[]): number[] => {
  const long1 = bbox[0];
  const lat1 = bbox[1]; //SW

  const long2 = bbox[2]; // NE
  const lat2 = bbox[3];

  const randomLat = getRandomNumberInRange(lat1, lat2);
  const randomLong = getRandomNumberInRange(long1, long2);

  return [randomLong, randomLat];
};

export {
  convertToGeoJSON,
  normalizeTwitterAuthResponse,
  getUserDataById,
  determineIfSelectedLocationIsTypeCountry,
  getRandomPointInBbox
};
