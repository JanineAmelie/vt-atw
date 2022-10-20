import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { DataItem } from "../types/types";
import CircularProgress from "@mui/material/CircularProgress";
import { GeoCoder } from "./GeoCoder";
import { GeoCodeResults } from "../types/interfaces";
import Chip from "@mui/material/Chip";
import WarningIcon from "@mui/icons-material/Warning";

interface IAddMarkerDialogProps {
  handleClose: () => void;
  open: boolean;
  user: DataItem | null;
  mapBoxToken: string;
  selectedLocation: GeoCodeResults | null | string;
  setSelectedLocation: (location: GeoCodeResults | null) => void;
  handleSubmit: () => void;
}

const AddMarkerDialog: React.FunctionComponent<IAddMarkerDialogProps> = ({
  handleClose,
  open,
  user,
  selectedLocation,
  setSelectedLocation,
  mapBoxToken,
  handleSubmit
}) => {
  return (
    <div>
      <Dialog open={open} onClose={handleClose} scroll="paper">
        <DialogTitle>Account Settings </DialogTitle>
        <DialogContent dividers>
          {user ? (
            <React.Fragment>
              <DialogContentText>
                Set your location here.
                <br />
                <br />
                In the interest of privacy your marker location is slightly off-set randomly. Due to
                this, there is a chance your marker will end up in the ocean or even outside your
                country borders. ¯\_(ツ)_/¯
              </DialogContentText>

              <SWarning>
                {/* <WarningIcon /> */}
                <Typography component="span">
                  Please be mindful of your safety and privacy when setting your location in this
                  app. <br />
                  Do *not* select your personal address.
                </Typography>
              </SWarning>
              <Divider sx={{ mt: 2, mb: 2 }} />
              <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                User Information
              </Typography>
              <SFormContainer>
                <TextField
                  value={user?.id}
                  disabled
                  id="id"
                  label="User ID"
                  type="text"
                  fullWidth
                />
                <TextField
                  value={user?.name}
                  disabled
                  id="name"
                  label="Name"
                  type="text"
                  fullWidth
                />
                <TextField value={user?.url} disabled id="Url" label="Url" type="url" fullWidth />
              </SFormContainer>

              <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                Marker Location
              </Typography>
              <GeoCoder
                selectedLocation={selectedLocation}
                setSelectedLocation={setSelectedLocation}
                mapBoxToken={mapBoxToken}
              />
            </React.Fragment>
          ) : (
            <CircularProgress color="inherit" />
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={() => handleClose()}>Cancel</Button>
          <Button onClick={() => handleSubmit()}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export { AddMarkerDialog };

const SWarning = styled.div`
  margin-top: 1em;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  background-color: #d32f2f;
  justify-content: center;
  padding: 1em;
  color: #fff;
  border-radius: 0px;
  align-items: center;
  text-align: center;
`;

const SFormContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-height: 200px;
`;
