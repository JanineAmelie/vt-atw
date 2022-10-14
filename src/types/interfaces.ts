import { UserCredential } from "firebase/auth";
import { Pin, TwitterEntities } from "./types";
export interface IApplicationProps {
  name?: string;
}

export interface IPopupProps {
  id: string;
  longitude: number;
  latitude: number;
  twitterHandle: string;
  image: string;
  city?: string;
  country?: string;
  url?: string;
  name: string;
  onCloseCallback: () => void;
}

export interface IMapPinProps extends Pin {
  onClick: () => void;
  isLive?: boolean;
}

export interface TwitterData extends UserCredential {
  additionalUserInfo: {
    profile: {
      id_str: string;
      name: string;
      description: string;
      profile_image_url: string;
      entities: TwitterEntities;
    };
    username: string;
  };
}
interface Properties {
  short_code: string;
  wikidata: string;
}

interface Geometry {
  type: string;
  coordinates: number[];
}

export interface GeoCodeResults {
  id: string;
  type: string;
  place_type: string[];
  relevance: number;
  properties: Properties;
  "text_en-US": string;
  "language_en-US": string;
  "place_name_en-US": string;
  text: string;
  language: string;
  place_name: string;
  bbox: number[];
  center: number[];
  geometry: Geometry;
}
