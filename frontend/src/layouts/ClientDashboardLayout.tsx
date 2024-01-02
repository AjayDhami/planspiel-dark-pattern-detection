import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Box, Container, CssBaseline } from "@mui/material";
import { useContext } from "react";
import AuthContext from "../context/AuthContext1";

const ClientDashboardLayout = () => {
  // const { user, authTokens: token } = useContext(AuthContext);
  // const isAuthenticated = user && token;

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

export default ClientDashboardLayout;
