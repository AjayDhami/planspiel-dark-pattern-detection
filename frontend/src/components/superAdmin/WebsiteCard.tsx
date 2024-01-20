import { Box, Button, Paper, Stack, Typography, styled, Dialog, DialogTitle, DialogContent, DialogActions, Link, FormControl, FormControlLabel, FormGroup, Switch, InputLabel, Select, MenuItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import { AdminWebsiteDetails, AdminExperts } from "../../types";
import { assignExperts, checkPrimaryExpert, getExpertsDetails, runAutomation } from "../../services/superAdminServices";
import DarkPatternListModal from "./DarkPatternListModal";

const CustomPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
}));

// to display website list for a particular client
const WebsiteCard: React.FC<AdminWebsiteDetails> = ({websiteId, baseUrl, websiteName}) => {

    const [open, setOpen] = useState(false);
    const [experts, setExperts] = useState([]);
    const [expertIds, setExpertIds] = useState<string[]>([]);
    const [primaryExpertId, setPrimaryExpertId] = useState("");
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [patterns, setPatterns] = useState([]);
    const [websiteUrl, setWebsiteUrl] = useState("");
    const [showAutomationButton, setShowAutomationButton] = useState<boolean>(false);

    useEffect(() => {
      console.log(primaryExpertId);
    }, [primaryExpertId])

    useEffect(() => {
      checkAssign();
    }, []);

    const checkAssign = async () => {
      try {
        const response = await checkPrimaryExpert(websiteId? websiteId: "");
        if (response) {
          setShowAutomationButton(true);
        }
      } catch (error) {
        console.error('Error--', error);
      }
    };

    const handleAssignToClick = async () => {
      setOpen(true);
      const resp = await getExpertsDetails();
      if(resp) {
        setExperts(resp)
      }
    };

    const handleRunAutomationClick = async () => {
      const resp = await runAutomation(websiteId? websiteId: "", baseUrl? baseUrl: "");
      if(resp) {
        setIsModalOpen(true);
        setPatterns(resp);
        setWebsiteUrl(baseUrl? baseUrl: "");
      }
    }

    const handleClose = () => {
        setExpertIds([]);
        setOpen(false);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = async() => {
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
        <DarkPatternListModal websiteId={websiteId? websiteId:""} onClose={handleModalClose} isOpen={isModalOpen} patterns={patterns} websiteUrl={websiteUrl}/>
        <Box
          sx={{
            display: "block",
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
          <Box>
          <div>
            {showAutomationButton ? (
              <Button variant="contained" color="primary" onClick={handleRunAutomationClick}>
                Run Automation
              </Button>
            ) : (
              <Button variant="outlined" color="success">
                Assigned
              </Button>
            )}
            {/* {showAutomationButton && (
              <Button variant="contained" color="primary" onClick={handleRunAutomationClick}>
                Run Automation
              </Button>
            )} */}
          </div>
          </Box>
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
            <Button variant="contained" onClick={handleSubmit}>Assign</Button>
            <Button variant="outlined" onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>

    </CustomPaper>
  );
}; 

export default WebsiteCard;
