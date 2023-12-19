import React, { useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const settings = ["Profile", "Logout"];

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#ffffff" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component={Link}
            to="/client/dashboard"
            noWrap
            sx={{ mr: 2 }}
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

          <Box sx={{ display: "flex", flexGrow: 1, justifyContent: "end" }}>
            <Tooltip title="User Settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="Prabudh Mishra"
                  src="/static/images/avatar/2.jpg"
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
