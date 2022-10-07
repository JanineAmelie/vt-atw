import React from "react";
import { Popup } from "react-map-gl";
import { IPopupProps } from "../types/interfaces";

const MapPopUp: React.FunctionComponent<IPopupProps> = ({
  longitude,
  latitude,
  twitterHandle,
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
          <a target="_new" href={`https://twitter.com/${twitterHandle}`}>
            {`@${twitterHandle}`}
          </a>
        </div>
        <img width="100%" src={image} />
      </Popup>
    </div>
  );
};

export default MapPopUp;
