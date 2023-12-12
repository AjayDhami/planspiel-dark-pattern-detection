import * as React from "react";
import GoogleIcon from "@mui/icons-material/Google";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./SignUp.css";

const defaultTheme = createTheme({
  palette: {
    background: {
      default: "#cccc",
    },
  },
});

export default function SignUp() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      first_name: data.get("first_name"),
      last_name: data.get("last_name"),
      email: data.get("email"),
      password: data.get("password"),
    });
  };
  const logo = require("./images/Logo.png");
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            display="flex"
            flexDirection={"column"}
            maxWidth={530}
            maxHeight={520}
            alignItems="center"
            justifyContent={"center"}
            margin="auto"
            marginTop={8}
            marginLeft={-5}
            padding={4}
            borderRadius={5}
            boxShadow={"5px 5px 10px #ccc"}
            bgcolor="#ffff"
          >
            <Link href="/">
              <img src={logo} alt="..." className="logo-img" />
            </Link>
            <div className="text">
              <Typography component="h1">Sign In with V-Tenet</Typography>
            </div>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <Grid container>
                <Grid item md>
                  <TextField
                    sx={{ mr: 1 }}
                    margin="normal"
                    required
                    id="first_name"
                    label="First Name"
                    name="text"
                    autoComplete="first_name"
                    autoFocus
                  />
                </Grid>
                <Grid item md>
                  <TextField
                    sx={{ ml: 1 }}
                    margin="normal"
                    required
                    id="last_name"
                    label="Last Name"
                    name="text"
                    autoComplete="text"
                  />
                </Grid>
              </Grid>

              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
              <TextField
                sx={{ mr: 1 }}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2, mb: 1 }}
              >
                Sign Up
              </Button>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 4 }}
              >
                <GoogleIcon className="Google_Icon"></GoogleIcon>
                <span className="span"> Sign In with Google</span>
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
