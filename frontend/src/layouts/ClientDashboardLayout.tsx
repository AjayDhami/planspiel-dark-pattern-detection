import { Outlet } from "react-router-dom";
import Navbar from "../components/client/Navbar";
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
    <Box sx={{ position: "relative" }}>
      <CssBaseline />
      <Navbar />
      <Container
        maxWidth={false}
        sx={{
          position: "absolute",
          height: {
            xs: "auto",
            md: `calc(100vh - 88px)`,
          },
          py: {
            xs: 2,
            md: 3,
          },
          backgroundColor: (theme) => theme.palette.grey[300],
        }}
        component="main"
      >
        <Outlet />
      </Container>
    </Box>
  );
};

export default withAuth(ClientDashboardLayout);
