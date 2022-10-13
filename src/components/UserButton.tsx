import React from "react";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Logout from "@mui/icons-material/Logout";
import { intl } from "../utils/intl";
import { MENU_ITEMS } from "../utils/constants";
interface IUserButtonProps {
  avatarUrl: string;
  userName: string;
  tooltipText: string;
  onMenuClick: (menuItem: string) => void;
}

const UserButton: React.FunctionComponent<IUserButtonProps> = ({
  avatarUrl,
  userName,
  tooltipText,
  onMenuClick
}) => {
  const [anchorElement, setAnchorElement] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorElement);
  const { accountSettings, logout } = intl.en.menuItems;
  const handleAvatarButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElement(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorElement(null);
  };
  return (
    <React.Fragment>
      <Tooltip title={tooltipText}>
        <IconButton
          sx={{ p: 0 }}
          onClick={(event) => handleAvatarButtonClick(event)}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}>
          <Avatar alt={userName} src={avatarUrl} />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorElement}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: PaperProps
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
        <MenuItem onClick={() => onMenuClick(MENU_ITEMS.SETTINGS)}>
          <Avatar />
          {accountSettings}
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => onMenuClick(MENU_ITEMS.LOGOUT)}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          {logout}
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};
const PaperProps = {
  overflow: "visible",
  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
  mt: 1.5,
  "& .MuiAvatar-root": {
    width: 32,
    height: 32,
    ml: -0.5,
    mr: 1
  },
  "&:before": {
    content: '""',
    display: "block",
    position: "absolute",
    top: 0,
    right: 14,
    width: 10,
    height: 10,
    bgcolor: "background.paper",
    transform: "translateY(-50%) rotate(45deg)",
    zIndex: 0
  }
};

export { UserButton };
