import React from "react";
import { Popup } from "react-map-gl";
import { IPopupProps } from "../types/interfaces";
import cx from "clsx";
// import { makeStyles } from "@material-ui/core/styles";
import styled from "@emotion/styled";
// import Card from "@material-ui/core/Card";
// import CardMedia from "@material-ui/material/CardMedia";

import { CardMedia, Card, CardContent } from "@mui/material";
// import CardContent from "@material-ui/core/CardContent";
// import Button from "@material-ui/core/Button";
// import TextInfoContent from "@mui-treasury/components/content/textInfo";
// import { useBlogTextInfoContentStyles } from "@mui-treasury/styles/textInfoContent/blog";
// import { useOverShadowStyles } from "@mui-treasury/styles/shadow/over";

const MapPopUp: React.FunctionComponent<IPopupProps> = ({
  longitude,
  latitude,
  twitterHandle,
  image,
  onCloseCallback
}) => {
  return (
    <div>
      <SPopup
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
      </SPopup>
    </div>
  );
};
const SPopup = styled(Popup)`
  position: relative;
  background: transparent;
  border-radius: 3px;
  box-shadow: none;
  padding: 0;
`;

const SCard = styled(Card)`
  margin: auto;
  border-radius: 16px;
  transition: 0.3s;
  box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
  position: relative;
  max-width: 500;
  margin-left: auto;
  overflow: initial;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 16px;
  flex-direction: row;
  padding-top: 16px;
`;
const SMedia = styled(CardMedia)`

width: 88%;
margin-left: auto;
margin-right: auto;
margin-top: 24px;
height: 0;
padding-bottom: 48%;
border-radius: 16px;
background-color: #fff;
position: relative;
width: 100%;
margin-left: -24px;
margin-top: 0;
transform: translateX(-8px);

&:after: {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(147deg, #fe8a39 0%, #fd3838 74%);
  border-radius: 16px;
  opacity: 0.5;
`;

export default MapPopUp;

/**
 * 
 * <SCard>
          <SMedia
            image={
              "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Git_icon.svg/2000px-Git_icon.svg.png"
            }
          />
          <CardContent>
            Git is a distributed version control system. Every dev has a working copy of the code
            and...
            {/* <TextInfoContent
              classes={contentStyles}
              overline={"28 MAR 2019"}
              heading={"What is Git ?"}
              body={
                "Git is a distributed version control system. Every dev has a working copy of the code and..."
              }
            /> 
            // {/* <Button className={buttonStyles}>Read more</Button> 
            </CardContent>
            </SCard>
 */
