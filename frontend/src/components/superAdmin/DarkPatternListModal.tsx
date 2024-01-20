import { Dialog, DialogTitle, FormControl, FormGroup, FormControlLabel, Switch, Button, DialogContent } from '@mui/material';
import React, { useState } from 'react';
import { AdminDarkPatternListProp, AdminPatterns } from '../../types';
import { sendFilteredPatterns } from '../../services/superAdminServices';
import AssignExpert from './AssignExpert';

const DarkPatternListModal: React.FC<AdminDarkPatternListProp> = ({ websiteId, onClose, isOpen, patterns, websiteUrl}) => {

  const [darkPatternList, setDarkPatternList] = useState<AdminPatterns[]>([]);
  const [assignExpert, setAssignExpert] = useState(true);

  const expertId = localStorage.getItem("userId");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    
    const patternObj: AdminPatterns = {
      createdByExpertId: expertId? expertId: "",
      patternType: event.target.name,
      description: event.target.value,
      detectedUrl: websiteUrl,
    }

    setDarkPatternList((prevPatterns) => {
      // Check if the pattern with the same description already exists
      const isPatternExist = prevPatterns.some(
        (pattern) => pattern.description === patternObj.description
      );
  
      if (isPatternExist) {
        // If it exists, remove it
        return prevPatterns.filter(
          (pattern) => pattern.description !== patternObj.description
        );
      } else {
        // If it doesn't exist, add it
        return [...prevPatterns, patternObj];
      }
    });
  };

  const handleSubmit = async() => {
    console.log(darkPatternList);  
    try {
      const resp = await sendFilteredPatterns(websiteId, darkPatternList);
      if(resp === 200) {
        // onClose();
        setAssignExpert(false);
      };
    } catch (error) {
      console.error('Error is --', error);
      throw error;
    }
  };

  if(!isOpen) return null;

  return (
    <Dialog open={isOpen} onClose={onClose}>
        <DialogTitle>
          {assignExpert ? 'List of Dark Patterns' : 'Assign Experts'} 
        </DialogTitle>
        <DialogContent>
          {assignExpert ? (
              <FormControl component="fieldset" variant="standard">
                <FormGroup>
                  {patterns.map((pattern) => (
                    <>
                      <FormControlLabel 
                        key={pattern.text}
                        sx={{
                            borderBottom: '1px solid #ccc',
                        }}
                      control={
                        <Switch onChange={handleChange} name={pattern.patternType} value={pattern.text} />
                      }
                      label={pattern.text+"  :  "+pattern.patternType}
                      />
                    </> 
                  ))}
                <Button onClick={handleSubmit}>
                  Submit
                </Button>
                </FormGroup>
              </FormControl>
          ) : (
            <AssignExpert/>
             )}
         </DialogContent>   
        
    </Dialog>
  );
}

export default DarkPatternListModal