import { AppBar, Container, Toolbar, Typography, styled } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext1";
import { useContext } from "react";
import AccountMenu from "./client/AccountMenu";

const StyledNavBar = styled(AppBar)(({ theme }) => ({
  ...theme.typography.body1,
  background: theme.palette.common.white,
  color: theme.palette.text.primary,
}));

const Navbar = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const handleProfile = () => navigate("/client/profile");

  const handleLogout = () => authContext?.logoutUser();

  return (
    <StyledNavBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar>
          <Link
            to="/client/dashboard"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <img
              src="/assets/logo.png"
              alt="Logo"
              style={{ width: 40, marginRight: 16 }}
            />
          </Link>
          <div style={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
            <Typography
              variant="h6"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              <Link
                to="/client/dashboard"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                V-Tenet
              </Link>
            </Typography>
          </div>

          <AccountMenu onProfile={handleProfile} onLogout={handleLogout} />
        </Toolbar>
      </Container>
    </StyledNavBar>
  );
};

export default Navbar;
