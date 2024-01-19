import { Dialog, DialogTitle, FormControl, FormGroup, FormControlLabel, Switch, IconButton, Button } from '@mui/material';
import React, { useState } from 'react';
import { AdminDarkPatternListProp, AdminPatterns } from '../../types';
import {
    Close as CloseIcon,
  } from "@mui/icons-material";

const DarkPatternListModal: React.FC<AdminDarkPatternListProp> = ({onClose, isOpen, patterns, websiteUrl}) => {

  const [darkPatternList, setDarkPatternList] = useState<AdminPatterns[]>([]);
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

  const handleSubmit = () => {
    console.log(darkPatternList);   
  };

  if(!isOpen) return null;

  return (
    <Dialog open={isOpen} onClose={onClose}>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 14,
            top: 12,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon/>
        </IconButton>

        <DialogTitle>
            List of Dark Patterns
        </DialogTitle>
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
    </Dialog>
  );
}

export default DarkPatternListModal