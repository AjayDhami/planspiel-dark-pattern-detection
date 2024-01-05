import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Box, Container, CssBaseline } from "@mui/material";
import withAuth from "../hoc/withAuth";
import { useContext, useEffect } from "react";
import { setRedirectCallback } from "../utils/AxiosHelper";
import AuthContext from "../context/AuthContext1";

const ClientDashboardLayout = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    setRedirectCallback(() => {
      console.log("setRedirectCallback executed");
      authContext?.logoutUser();
    });

    return () => {
      setRedirectCallback(null);
    };
  }, [authContext]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        maxHeight: "100vh",
        overflow: "hidden",
      }}
    >
      <CssBaseline />
      <Navbar></Navbar>
      <Container
        component="main"
        maxWidth="xl"
        sx={{
          my: 1,
          overflowY: "auto",
          height: "inherit",
        }}
      >
        <Outlet />
      </Container>
    </Box>
  );
};

export default withAuth(ClientDashboardLayout);
