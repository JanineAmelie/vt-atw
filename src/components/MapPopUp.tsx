import React from "react";
import { Popup } from "react-map-gl";
import { IPopupProps } from "../types/interfaces";
import styled from "@emotion/styled";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Flag, LocationCity, Link } from "@mui/icons-material";

const MapPopUp: React.FunctionComponent<IPopupProps> = ({
  longitude,
  latitude,
  twitterHandle,
  image,
  city,
  country,
  url,
  name,
  onCloseCallback
}) => {
  const LinksList = [
    {
      text: city ? city : " - ",
      icon: <LocationCity />
    },
    {
      text: country ? country : " - ",
      icon: <Flag />
    },
    {
      isLink: true,
      text: url ? url : "-",
      icon: <Link />
    }
  ];
  return (
    <SPopup
      anchor="top"
      maxWidth="400"
      longitude={Number(longitude)}
      latitude={Number(latitude)}
      onClose={() => onCloseCallback()}>
      <STextContainer>
        <SImage width="100%" src={image} />
        <STextBox>
          <Sh2>{name}</Sh2>
          <Sh3>{`@${twitterHandle}`}</Sh3>
        </STextBox>
      </STextContainer>

      <SList dense={true}>
        {LinksList.map(({ text, icon, isLink }, index) => (
          <SListItem key={`key-${index}`}>
            <ListItemIcon>{icon}</ListItemIcon>
            <SListItemText>
              {isLink && text !== "-" ? (
                <a href={text} target="_blank" rel="noreferrer">
                  {text}
                </a>
              ) : (
                <span>{text}</span>
              )}
            </SListItemText>
          </SListItem>
        ))}
      </SList>
    </SPopup>
  );
};

const STextBox = styled.figcaption`
  position: relative;
  justify-content: flex-end;
  padding-left: 10px;
`;

const STextContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const SListItemText = styled(ListItemText)`
  span {
    width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const SList = styled(List)`
  padding: 0;
`;

const SListItem = styled(ListItem)`
  padding: 0;
  margin-bottom: -4px;
`;

const SPopup = styled(Popup)`
  border-radius: 16px;
  transition: 0.3s;
  margin-left: auto;
  box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
  background: #fff;
  border-radius: 5px;
  min-width: 300px;
  padding: 20px;

  .mapboxgl-popup-content {
    box-shadow: none;
    padding: 0;
  }

  .mapboxgl-popup-close-button {
    top: -20px;
    right: -16px;
    font-size: 2.5em;
  }

  .mapboxgl-popup-tip {
    position: absolute;
    top: -9px;
  }
`;

const SImage = styled.img`
  max-width: 100px;
  margin-top: -40px;
  margin-left: -100px;
  backface-visibility: hidden;
  vertical-align: top;
  border-radius: 55px;
`;

const Sh2 = styled.h2`
  font-family: como, sans-serif;
  font-style: normal;
  font-weight: 800;
  width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 18px;
  line-height: 27px;
`;

const Sh3 = styled.h3`
  margin-top: -4px;
  color: #ea5e90;
`;

export default MapPopUp;
