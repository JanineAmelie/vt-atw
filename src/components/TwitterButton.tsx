import React from "react";
import Button from "@mui/material/Button";
import styled from "@emotion/styled";
import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";
import Tooltip from "@mui/material/Tooltip";

interface TwitterLoginButton {
  buttonText: string;
  onClick: () => void;
  tooltipText: string;
}

const TwitterIcon: React.FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon {...props}>
      <path
        fill="#fff"
        d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
      />
    </SvgIcon>
  );
};

const TwitterLoginButton: React.FunctionComponent<TwitterLoginButton> = ({
  buttonText,
  tooltipText,
  onClick
}) => (
  <Tooltip title={tooltipText}>
    <STwitterLoginButton variant="contained" startIcon={<TwitterIcon />} onClick={() => onClick()}>
      {buttonText}
    </STwitterLoginButton>
  </Tooltip>
);

export { TwitterLoginButton };

const STwitterLoginButton = styled(Button)`
  background: rgb(90, 164, 235);
`;
