import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AuthContext from "../../context/AuthContext1";
import { useContext } from "react";
import { styled } from "@mui/system";

const StyledTextField = styled(TextField)({
  "& label": {
    color: "white",
  },
  // "&:hover label": {
  //   fontWeight: 700,
  // },
  "& label.Mui-focused": {
    color: "white",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "white",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white",
    },
    "&:hover fieldset": {
      borderColor: "white",
      borderWidth: 2,
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
  },
});

const defaultTheme = createTheme({});

export default function SignUp() {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    console.log("not context");
    return null;
  }
  const { signUpUser } = authContext;
  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid
        container
        component="main"
        sx={{ height: "100dvh", backgroundColor: "#131f42" }}
      >
        <Grid
          item
          xs={false}
          sm={false}
          md={8}
          sx={{
            display: { xs: "none", sm: "none", md: "flex" },
            backgroundImage: `url(${process.env.PUBLIC_URL}/assets/signIn1.svg)`,
            width: "100%",
            height: "auto",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={4}
          sx={{
            backgroundColor: "#141b3a",
            height: "auto",
            borderLeft: "thick double #ffa500",
          }}
        >
          <Box
            sx={{
              my: 7,
              mx: 7,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "80%",
            }}
          >
            <Link href="/" sx={{ m: 1 }}>
              <img
                src="/assets/logo.png"
                alt="..."
                style={{
                  width: "4rem",
                  height: "4rem",
                }}
              />
            </Link>
            <Typography
              component="h1"
              variant="h5"
              sx={{
                color: "white",
                padding: "2rem",
              }}
            >
              Sign Up To the Client portal
            </Typography>
            <Box component="form" onSubmit={signUpUser} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <h4 style={{ color: "#ffa500" }}>Enter First Name:</h4>
                  <StyledTextField
                    margin="normal"
                    name="firstName"
                    required
                    fullWidth
                    label="First Name"
                    sx={{
                      input: {
                        backgroundColor: "Transparent ",
                        color: "white",
                      },

                      label: { color: "white" },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <h4 style={{ color: "#ffa500" }}>Enter Last Name:</h4>
                  <StyledTextField
                    margin="normal"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    sx={{
                      input: {
                        backgroundColor: "Transparent ",
                        color: "white",
                      },
                      label: { color: "white" },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <h4 style={{ color: "#ffa500" }}>Enter Email:</h4>
                  <StyledTextField
                    margin="normal"
                    required
                    fullWidth
                    label="Email Address"
                    name="email"
                    sx={{
                      input: {
                        backgroundColor: "Transparent ",
                        color: "white",
                      },
                      label: { color: "white" },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <h4 style={{ color: "#ffa500" }}>Enter Password:</h4>
                  <StyledTextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    sx={{
                      input: {
                        backgroundColor: "Transparent ",
                        color: "white",
                      },
                      label: { color: "white" },
                    }}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12} sx={{ mt: 2 }}>
                <Button type="submit" fullWidth variant="contained">
                  Sign In
                </Button>
              </Grid>
              <Grid item xs={12} sm={12} sx={{ mt: 1, textAlign: "end" }}>
                <Link href="/signin" variant="subtitle1">
                  Already have an account? Sign In
                </Link>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
