import React from "react";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";

interface IUserButtonProps {
  avatarUrl: string;
  userName: string;
  tooltipText: string;
  onClick: () => void;
}

const UserButton: React.FunctionComponent<IUserButtonProps> = ({
  avatarUrl,
  userName,
  tooltipText,
  onClick
}) => (
  <Tooltip title={tooltipText}>
    <IconButton sx={{ p: 0 }} onClick={() => onClick()}>
      <Avatar alt={userName} src={avatarUrl} />
    </IconButton>
  </Tooltip>
);

export { UserButton };
