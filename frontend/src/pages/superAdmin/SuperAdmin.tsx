import { Box, Grid } from "@mui/material";
import ClientCard from "../../components/superAdmin/ClientCard";


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
          </Grid>
            ))}
          </Grid>
      </Box>
      
    );
  };
  
export default SuperAdmin;