import { Dialog, DialogTitle, FormControl, FormGroup, FormControlLabel, Switch, IconButton } from '@mui/material';
import React from 'react'
import {
    Close as CloseIcon,
  } from "@mui/icons-material";


interface Patterns {
    text: string;
    patternType: string;
}

interface DarkPatternListProp {
    onClose: () => void;
    isOpen: boolean;
    patterns: Patterns[];
} 

const DarkPatternListModal: React.FC<DarkPatternListProp> = ({onClose, isOpen, patterns}) => {

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
                  {patterns.map((pattern: Patterns) => (
                    <>
                    
                      <FormControlLabel 
                        sx={{
                            borderBottom: '1px solid #ccc',
                        }}
                      control={
                        <Switch/>
                      }
                      label={pattern.text+"  :  "+pattern.patternType}
                      />
                    </> 
                  ))}
                </FormGroup>
            </FormControl>
    </Dialog>
  );
}

export default DarkPatternListModal