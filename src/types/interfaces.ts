import { PinType } from "./types";

export interface IMapProps {
  id: string;
  mapStyleURL: string;
  mapboxToken: string;
}
export interface IApplicationProps {
  name?: string;
}

export interface IPopupProps {
  longitude: number;
  latitude: number;
  twitterHandle: string;
  image: string;
  onCloseCallback: () => void;
}

export interface IMapPinProps extends PinType {
  onClick: () => void;
  isLive?: boolean;
}
