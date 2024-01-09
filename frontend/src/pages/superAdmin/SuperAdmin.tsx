import { Link } from "react-router-dom";
import { Box, Button, Grid, Stack } from "@mui/material";
import React from "react";
import ClientCard from "../../components/superAdmin/ClientCard";
import WebsiteCard from "../../components/superAdmin/WebsiteCard";


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

const SuperAdmin = () => {
    return (
      <Box>
        <Grid container spacing={3} style={{ margin: "1rem 0", width: "100%", justifyContent: 'center' }}>
        {clientList.map((client) => (
          <Grid item xs={12} md={10} key={client.id}>
            <ClientCard
              id={client.id}
              name={client.name}
              websites={client.websites}
              automation={client.automation}
              assignTo={client.assignTo}
            />
            {/* <Grid container spacing={2} style={{ margin: "1rem 0", width: "100%", justifyContent: 'left' }}>
              {clientList.map((website) => (
              <Grid item xs={12} md={4} key={website.id}>
                <WebsiteCard
                  id={website.id}
                  website={website.websites}
                  automation={website.automation}
                  assignTo={website.assignTo}
                />
              </Grid>
              ))}
            </Grid> */}
          </Grid>
            ))}
          </Grid>
      </Box>
      
    );
  };
  
export default SuperAdmin;