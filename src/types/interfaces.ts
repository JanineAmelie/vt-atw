import { UserCredential } from "firebase/auth";
import { Pin, TwitterEntities } from "./types";

export interface IMapProps {
  id: string;
  mapStyleURL: string;
  mapboxToken: string;
}
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
