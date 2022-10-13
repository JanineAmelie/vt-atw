import React from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import PublicIcon from "@mui/icons-material/Public";
import { TwitterLoginButton } from "./TwitterButton";
import { UserButton } from "./UserButton";
import { AuthedUser } from "../types/types";
import { intl } from "../utils/intl";

interface IHeaderProps {
  onButtonClick: () => void;
  user: AuthedUser | null;
}

const HeaderBar: React.FunctionComponent<IHeaderProps> = ({ onButtonClick, user }) => {
  const { global } = intl.en;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <PublicIcon sx={{ mr: 1 }} />

          <Typography
            variant="h6"
            noWrap
            sx={{
              flexGrow: 1,
              mr: 2,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none"
            }}>
            {global.appTitle}
          </Typography>
          {user ? (
            <UserButton
              onClick={() => onButtonClick()}
              avatarUrl={user.image}
              userName={user.name}
              tooltipText={global.editMarker}
            />
          ) : (
            <TwitterLoginButton
              onClick={() => onButtonClick()}
              tooltipText={global.signUpToolTip}
              buttonText={global.loginWithTwitter}
            />
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default HeaderBar;
