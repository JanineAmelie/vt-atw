export type Pin = {
  id: string;
  longitude: number;
  latitude: number;
  image: string;
};

export type DataItem = {
  id: string;
  image: string;
  latitude: number;
  longitude: number;
  twitterHandle: string;
  url: string;
};

export type AuthedUser = {
  id: string;
  name: string;
  username: string;
  description: string;
  image: string;
  url: string;
};
