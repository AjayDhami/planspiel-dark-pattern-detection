import { AppBar, Container, Toolbar, Typography, styled } from "@mui/material";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext1";
import { useContext } from "react";
import AccountMenu from "./client/AccountMenu";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  ...theme.typography.body1,
  background: theme.palette.common.white,
  color: theme.palette.text.primary,
}));

const Navbar = () => {
  const authContext = useContext(AuthContext);

  const handleLogout = () => authContext?.logoutUser();

  return (
    <StyledAppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component={Link}
            to="/client/dashboard"
            noWrap
            flex={1}
          >
            <img
              src="/assets/logo.png"
              alt="Logo"
              style={{
                height: 60,
                marginTop: "0.5rem",
                marginBottom: "0.25rem",
              }}
            />
          </Typography>

          <AccountMenu onLogout={handleLogout} />
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
};

export default Navbar;
