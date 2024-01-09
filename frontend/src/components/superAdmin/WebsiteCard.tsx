import { Box, Button, Paper, Stack, Typography, styled, Dialog, DialogTitle, DialogContent, DialogActions, Link, FormControl, FormLabel, FormControlLabel, FormGroup, FormHelperText, Switch } from "@mui/material";
import React, { useState } from "react";

type CardProps = {
  id: string;
  website: string;
  automation: boolean;
  assignTo: Array<any>;
  children?: React.ReactNode;
};

const CustomPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
}));


const WebsiteCard = ({ id, website, automation, assignTo }: CardProps) => {

    const [open, setOpen] = useState(false);
    const [state, setState] = React.useState({
        Ajay: true,
        Drashti: false,
        Amay: true,
      });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = () => {
        // Perform any actions you want on confirmation (e.g., submit form)
        setOpen(false);
      };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({
          ...state,
          [event.target.name]: event.target.checked,
        });
      };


  return (
    <CustomPaper elevation={3} style={{ minHeight: "4rem" }}>
      <Stack spacing={3}>
        
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="subtitle1" component="span">
            {website}
          </Typography>
        </Box>
        <Box>
        {automation == false && (
            <Box>
              <Button size="small" variant="contained" color="info">
                Run Automation
              </Button>
            </Box>
          )}
          {automation && (
            <Box>
              <Button size="small" variant="contained" color="warning" onClick={handleClickOpen}>
                Assign To
              </Button>
            </Box>
          )}
        </Box>
      </Stack>


      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
            Assigning: <Link href='{website}'>{website}</Link>
        </DialogTitle>
        <DialogContent>
          {/* Add content for the popup here */}
            <FormControl component="fieldset" variant="standard">
                <FormGroup>
                    <FormControlLabel
                    control={
                        <Switch checked={state.Ajay} onChange={handleChange} name="Ajay" />
                    }
                    label="Ajay"
                    />
                    <FormControlLabel
                    control={
                        <Switch checked={state.Drashti} onChange={handleChange} name="Drashti" />
                    }
                    label="Drashti"
                    />
                    <FormControlLabel
                    control={
                        <Switch checked={state.Amay} onChange={handleChange} name="Amay" />
                    }
                    label="Amay"
                    />
                </FormGroup>
            </FormControl>
        </DialogContent>
        <DialogActions>
            <Button variant="contained" onClick={handleConfirm}>Submit</Button>
            <Button variant="outlined" onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>

    </CustomPaper>
  );
}; 

export default WebsiteCard;
