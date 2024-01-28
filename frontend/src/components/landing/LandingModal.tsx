import React from 'react'
import { Dialog, DialogTitle, Typography, Box} from '@mui/material'
import {styled} from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

interface LandingModalProps {
    isOpen : boolean,
    onClose: () => void,
    urlForCheck: string,
}

const LandingModal:React.FC<LandingModalProps> = ({isOpen, onClose, urlForCheck}) => {
  let percentage = 100
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 20,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
    },
  }));
    if(!isOpen) return null
  return (
    <Dialog open={isOpen} onClose={onClose} fullScreen={false} maxWidth="md" fullWidth>
      <DialogTitle
        sx={{
          fontStyle:"normal",
          justifyContent: "center",
          alignItems:"center"
        }}
      >
        <Typography variant="h5" component="span">
          Pattern Check by V-Tenet AI
        </Typography>
      </DialogTitle>
      <Box
        sx={{
          margin:"2rem"
        }}
      >
        <BorderLinearProgress variant='determinate' value={50}/>
      </Box>
      <Box>
        <Typography>
          {percentage===100 ? "Your website doesn't contain any dark patterns" : `${percentage}% of your website text can potentially be dark patterns`}
        </Typography>
      </Box>
      {/* <Grid
        container
        spacing={0}
        height={{
          xs: "inherit",
          md: "auto",
        }}
      >
        <Grid
          item
          md={7}
          xs={12}
          display="flex"
          flexDirection="column"
          alignItems="start"
          justifyContent="start"
        >
          <h2>{urlForCheck}</h2>
        </Grid>
        <Grid item md={4} xs={12}>
        <PieChart
          series={[
          {
            data: [
              { id: 0, value: 90},
              { id: 1, value: 10}
            ],
          },
          ]}
          width={350}
          height={200}
        />
        </Grid>
      </Grid> */}
    </Dialog>
  )
}

export default LandingModal