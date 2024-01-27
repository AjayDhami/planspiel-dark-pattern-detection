import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

type TermsAndConditionsProps = {
  open: boolean;
  onAccept: () => void;
  onReject: () => void;
};

const TermsAndConditions = ({
  open,
  onAccept,
  onReject,
}: TermsAndConditionsProps) => {
  return (
    <Dialog open={open} onClose={onReject} fullWidth maxWidth="md">
      <DialogTitle>Terms and Conditions</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {/* Your terms and conditions text goes here */}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. ...
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onAccept} color="primary" variant="contained">
          Accept
        </Button>
        <Button onClick={onReject} color="error" variant="contained">
          Reject
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TermsAndConditions;
