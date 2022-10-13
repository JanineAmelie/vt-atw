export type Pin = {
  id: string;
  longitude: number;
  latitude: number;
  image: string;
};

export type DataItem = {
  id: string;
  name: string;
  username: string;
  description: string;
  image: string;
  url: string;
  latitude: string;
  longitude: string;
};

export type AuthedUser = {
  id: string;
  image: string;
  name: string;
};

type TwitterUrlObject = {
  display_url: string;
  expanded_url: string;
  indices: number[];
  url: string;
};

export type TwitterEntities = {
  url: {
    urls: TwitterUrlObject[];
  };
};
