import React from "react";

import { Popup } from "react-map-gl";

interface IPopupProps {
  longitude: number;
  latitude: number;
  twitter_handle: string;
  image: string;
  onCloseCallback: () => void;
}

const MapPopUp: React.FunctionComponent<IPopupProps> = ({
  longitude,
  latitude,
  twitter_handle,
  image,
  onCloseCallback
}) => {
  return (
    <div>
      <Popup
        anchor="top"
        longitude={Number(longitude)}
        latitude={Number(latitude)}
        onClose={() => onCloseCallback()}>
        <div>
          {latitude}, {longitude} |{" "}
          <a target="_new" href={`https://twitter.com/${twitter_handle}`}>
            {`@${twitter_handle}`}
          </a>
        </div>
        <img width="100%" src={image} />
      </Popup>
    </div>
  );
};

export default MapPopUp;
