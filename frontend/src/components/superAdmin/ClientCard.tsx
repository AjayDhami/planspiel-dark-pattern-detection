import { Box, Grid, Paper, Stack, styled, Typography } from "@mui/material";
import React from "react";
import WebsiteCard from "../superAdmin/WebsiteCard";

const clientList = [
  {
    id: "1",
    name: "Borealis",
    websites: 'https://www.flipkey.com/',
    automation: false,
    assignTo: [],
  },
  {
    id: "2",
    name: "J&J",
    websites: 'https://www.britishairways.com/',
    automation: true,
    assignTo: ['Drashti', 'Ajay', 'Amay'],
  },
  {
    id: "3",
    name: "Bayer",
    websites: 'https://www.tripping.com/',
    automation: false,
    assignTo: [],
  },
  {
    id: "4",
    name: "J&J",
    websites: 'https://www.britishairways.com/',
    automation: true,
    assignTo: ['Drashti', 'Ajay', 'Amay'],
  },
  
];

type CardProps = {
  id: string;
  name: string;
  websites: string;
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

// to display sequence of clients along with websites list of each client
const ClientCard = ({ id, name, websites, automation, assignTo }: CardProps) => {
  return (
    <Box>
      <CustomPaper elevation={3} style={{ minHeight: "8rem" }} sx={{ backgroundColor: '#f0f0f0' }}>
      <Stack spacing={2} direction="row" useFlexGap flexWrap="wrap">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" component="span">
            {name}
          </Typography>
        </Box>
      </Stack>
      
      <Grid container spacing={2} style={{ margin: "1rem 0", width: "100%", justifyContent: 'left' }}>
          {clientList.map((website: { id: string; websites: string; automation: boolean; assignTo: any[]; }) => (
            <Grid item xs={12} md={4} key={website.id}>
              <WebsiteCard
                id={website.id}
                website={website.websites}
                automation={website.automation}
                assignTo={website.assignTo}
              />
            </Grid>
          ))}
      </Grid>
    </CustomPaper>
    </Box>
    
  );
};

export default ClientCard;
