import React from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import PublicIcon from "@mui/icons-material/Public";

interface IHeaderProps {
  name: string;
  loginText: string;
}

const HeaderBar: React.FunctionComponent<IHeaderProps> = ({ name, loginText }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <PublicIcon sx={{ mr: 1 }} />

          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              flexGrow: 1,
              mr: 2,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none"
            }}>
            {name}
          </Typography>
          <Button color="secondary">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default HeaderBar;
