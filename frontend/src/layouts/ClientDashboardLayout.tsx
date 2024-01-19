import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Box, CssBaseline } from "@mui/material";
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
      <Box
        component="main"
        sx={{
          padding: {
            xs: 2,
            md: 4,
          },
          height: {
            xs: "auto",
            md: `calc(100vh - 64px)`,
          },
          display: "flex",
          flexDirection: "column",
          backgroundColor: (theme) => theme.palette.grey[300],
          overflow: "auto",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default withAuth(ClientDashboardLayout);
