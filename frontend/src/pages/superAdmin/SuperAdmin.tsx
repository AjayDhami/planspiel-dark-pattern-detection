import { Box, Grid } from "@mui/material";
import ClientCard from "../../components/superAdmin/ClientCard";
import {ClientsDetails, getClientsDetails} from "../../services/superAdminServices"
import React, { useContext, useEffect, useState } from "react";
import withSuperAdminAuth from "../../hoc/withSuperAdminAuth";
import { setRedirectCallback } from "../../utils/AxiosHelper";
import AuthContext from "../../context/AuthContext1";

const SuperAdmin: React.FC = () => {
  const authContext = useContext(AuthContext);
  useEffect(() => {
      setRedirectCallback(() => {
        authContext?.logoutUser();
      });
  
      return () => {
        setRedirectCallback(null);
      };
  }, [authContext]);

  const [clientDataList, setClientDataList] = useState<ClientsDetails[]>([]);

  const getClientsDataList = async (): Promise<void> => {
    try {
      const clientsData = await getClientsDetails();
      setClientDataList(clientsData);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(`Error: ${error.message}`);
      } else {
        console.log("An unknown error occurred.");
      }
    }
  };

  useEffect(() => {
    getClientsDataList();
  }, []);

    return (
      <Box>
        <Grid container spacing={3} style={{ margin: "1rem 0", width: "100%", justifyContent: 'center' }}>
        {clientDataList.map((client) => (
          <Grid item xs={12} md={10} key={client.userId}>
            <ClientCard
              userId={client.userId}
              firstName={client.firstName}
              lastName={client.lastName}
              websites={client.websites} email={""} role={""}            />
          </Grid>
            ))}
          </Grid>
      </Box>
      
    );
  };
  
export default withSuperAdminAuth(SuperAdmin);