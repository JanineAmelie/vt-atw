import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import styled from "@emotion/styled";
import { AuthedUser } from "../types/types";
interface IAddMarkerDialogProps {
  handleClose: () => void;
  open: boolean;
  user: AuthedUser | null;
}

const AddMarkerDialog: React.FunctionComponent<IAddMarkerDialogProps> = ({
  handleClose,
  open,
  user
}) => {
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Marker </DialogTitle>
        <SAvatar>
          <img src={user?.image} />
        </SAvatar>
        <SHeader></SHeader>
        <DialogContent>
          <DialogContentText>
            Set your marker here. Your map marker will be randomly scattered within your country of
            choice if no city is given.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose()}>Cancel</Button>
          <Button onClick={handleClose}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export { AddMarkerDialog };

const SHeader = styled.div`
  background-color: #003;
  height: 200px;
`;

const SAvatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: rgba(236, 240, 241, 1);
  border: 5px solid rgb(236, 240, 241);
  display: inline-block;
  margin-top: -55px;
  overflow: hidden;
`;
