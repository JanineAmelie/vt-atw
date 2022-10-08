import React from "react";
import styled from "@emotion/styled";
import { Marker } from "react-map-gl";
import { IMapPinProps } from "../types/interfaces";
import pinshape from "../assets/pinshape.svg";

const MapPin: React.FunctionComponent<IMapPinProps> = ({
  id,
  longitude,
  latitude,
  image,
  isLive = false,
  onClick
}) => {
  return (
    <Marker
      key={`marker-${id}`}
      longitude={longitude}
      latitude={latitude}
      anchor="bottom"
      onClick={(e) => {
        // If we let the click event propagates to the map, it will immediately close the popup
        // with `closeOnClick: true`
        e.originalEvent.stopPropagation();
        onClick();
      }}>
      <SMarkerContainer>
        <SMarkerShape>
          <img src={pinshape} />
          <SMarkerContent>
            <SMarkerImage src={image} />
          </SMarkerContent>
          {isLive && <SBeacon />}
        </SMarkerShape>
      </SMarkerContainer>
    </Marker>
  );
};

const SMarkerContainer = styled.div`
  animation: action 2s infinite alternate;

  &:hover {
    animation-play-state: paused;
  }
`;

const SMarkerShape = styled.div`
  position: relative;
  width: 65px;
  transform: scale(1);
  transition: 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }

  &:hover > .marker-svg {
    animation-name: grow;
    animation-duration: 0.3s;
    animation-timing-function: ease-in-out;
    animation-fill-mode: forwards;
  }
`;

const SMarkerContent = styled.div`
  border-radius: 50%;
  overflow: hidden;
  width: 50px;
  height: 50px;
  position: absolute;
  top: 6px;
  left: 7px;
`;

const SMarkerImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const SBeacon = styled.div`
  position: absolute;
  top: 70px;
  left: 38px;
  height: 3em;
  width: 3em;
  border-radius: 50%;
  transform: translateX(-50%);
  z-index: -1;

  &:before,
  &:after {
    position: absolute;
    content: "";
    height: 2em;
    width: 2em;
    left: 0;
    top: 0;
    background-color: transparent;
    border-radius: 50%;
    box-shadow: 0 0 0 2px #ed1f34;
    animation: active 2s infinite linear;
  }

  &:after {
    animation-delay: 1s;
  }
`;
export { MapPin };
