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
        {/* <img src={user?.image} /> */}
        <DialogContent dividers>
          {user ? (
            <React.Fragment>
              <DialogContentText>
                Set your location here. Your map marker will be randomly scattered within your
                country* of choice if only country is selected.
                <SSmall>
                  <br />
                  *There is a chance your marker will end up in the ocean or lakes etc, due to the
                  nature of geographic country borders. ¯\_(ツ)_/¯
                </SSmall>
              </DialogContentText>
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

const SFormContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-height: 200px;
`;

const SSmall = styled.small`
  font-size: 10px;
  color: #e84079;
`;
