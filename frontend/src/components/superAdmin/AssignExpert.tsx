import React, { useEffect, useState } from 'react';
import {AdminExperts, AdminAssignProps } from '../../types';
import { Button, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormGroup, InputLabel, Link, MenuItem, Select, Switch} from '@mui/material';
import { assignExperts, getExpertsDetails } from '../../services/superAdminServices';

const AssignExpert: React.FC<AdminAssignProps> = ({onClose, websiteId, websiteName, websiteUrl}) => {

    // const [open, setOpen] = useState(false);
    const [expertIds, setExpertIds] = useState<string[]>([]);
    const [experts, setExperts] = useState([]);
    const [primaryExpertId, setPrimaryExpertId] = useState("");
    
    useEffect(() => {
        handleAssignToClick();
      }, []);

    const handleClose = () => {
        setExpertIds([]);
        onClose();
    };

    const handleSubmit = async() => {
        const updatedExpertIds = [...expertIds, primaryExpertId];
        const resp = await assignExperts(websiteId? websiteId: "", updatedExpertIds, primaryExpertId? primaryExpertId: "");
        if(resp === 200) {
            onClose();
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

    const handleAssignToClick = async () => {
        // setOpen(true);
        const resp = await getExpertsDetails();
        if(resp) {
          setExperts(resp)
        }
      };


  return (
    <>
       <DialogTitle>
            Assigning {websiteName} 
            <Link href={websiteUrl}>{websiteUrl}</Link>
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
    </>
  );
}; 

export default AssignExpert