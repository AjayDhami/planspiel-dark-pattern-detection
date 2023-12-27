import {
  AppBar,
  Container,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";
import { Logout as LogoutIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  ...theme.typography.body1,
  background: theme.palette.background.default,
  color: theme.palette.text.primary,
}));

const Navbar = () => {
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

          <Typography>Hello, Prabudh Mishra</Typography>

          <Tooltip title="Sign out" arrow>
            <IconButton color="secondary" sx={{ mx: 1 }}>
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
};

export default Navbar;
