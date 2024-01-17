import { Box, Button, Paper, Stack, Typography, styled, Dialog, DialogTitle, DialogContent, DialogActions, Link, FormControl, FormControlLabel, FormGroup, Switch, InputLabel, Select, MenuItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import { AdminWebsiteDetails, AdminExperts } from "../../types";
import { assignExperts, getExpertsDetails } from "../../services/superAdminServices";

const CustomPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
}));

// to display website list for a particular client
const WebsiteCard: React.FC<AdminWebsiteDetails> = ({websiteId, baseUrl, websiteName, description}) => {

    const [open, setOpen] = useState(false);
    const [experts, setExperts] = useState([]);
    const [expertIds, setExpertIds] = useState<string[]>([]);
    const [primaryExpertId, setPrimaryExpertId] = useState("");

    useEffect(() => {
      console.log(primaryExpertId);
    }, [primaryExpertId])

    const handleAssignToClick = async () => {
      // logic for the Assign to button 
      setOpen(true);
      const resp = await getExpertsDetails();
      if(resp) {
        setExperts(resp)
        console.log(resp); 

      }
    };

    const handleRunAutomationClick = async () => {
      
    }

    const handleClose = () => {
        setExpertIds([]);
        setOpen(false);
    };

    const handleSubmit = async() => {
        // Perform any actions you want on confirmation (e.g., submit form)
        const updatedExpertIds = [...expertIds, primaryExpertId];
        const resp = await assignExperts(websiteId? websiteId: "", updatedExpertIds, primaryExpertId? primaryExpertId: "");
        if(resp === 200) {
          setOpen(false);
        }
      };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const selectedUserId = event.target.name;

      if (expertIds.includes(selectedUserId)) {
        setExpertIds((prevIds) => prevIds.filter((id) => id !== selectedUserId));
      } else {
        setExpertIds((prevIds) => [...prevIds, selectedUserId]);
      }
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
            {websiteName}
          </Typography>
          <Typography variant="body1" component="span">
            {baseUrl}
          </Typography>
        </Box>
        <Box>
          <Button variant="contained" color="success" onClick={handleAssignToClick}>
            Assign To
          </Button>
        </Box>
        <Box>
          <Button variant="contained" color="success" onClick={handleRunAutomationClick}>
            Run Automation
          </Button>
        </Box>
      </Stack>


      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
            Assigning {websiteName} 
            <Link href={baseUrl}>{baseUrl}</Link>
        </DialogTitle>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Primary expert</InputLabel>
            <Select
              id="primaryexpert"
              value={primaryExpertId}
              label="Select primary expert"
              onChange={(e) => setPrimaryExpertId(e.target.value)}
              >
              {experts.map((expert: AdminExperts) => (
                <MenuItem value={expert.userId}>{expert.firstName}</MenuItem>
              ))}
            </Select>
          </FormControl>
        <DialogContent>
          {/* Add content for the popup here */}
            <FormControl component="fieldset" variant="standard">
                <FormGroup>
                  {experts.map((expert: AdminExperts) => (
                      expert.userId !== primaryExpertId ? 
                      <FormControlLabel 
                      control={
                        <Switch onChange={handleChange} value={expert.userId} name={expert.userId}/>
                      }
                      label={expert.firstName}
                      />
                      : null
                  ))}
                </FormGroup>
            </FormControl>
        </DialogContent>
        <DialogActions>
            <Button variant="contained" onClick={handleSubmit}>Submit</Button>
            <Button variant="outlined" onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>

    </CustomPaper>
  );
}; 

export default WebsiteCard;
