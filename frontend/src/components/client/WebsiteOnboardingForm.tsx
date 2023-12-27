import { Button, Dialog, DialogTitle, IconButton } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

const WebsiteOnboardingForm = ({ open, onClose }: any) => {
  return (
    <Dialog
      //   fullScreen={fullScreen}
      open={open}
      fullWidth
      aria-labelledby="website-onboarding"
      onClose={onClose}
    >
      <DialogTitle>
        Add new Website{" "}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 14,
            top: 12,
            color: (theme) => theme.palette.grey[500],
          }}
          //   disabled={isFormLoading}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
    </Dialog>
  );
};

export default WebsiteOnboardingForm;
