import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useContext } from "react";
import { styled } from "@mui/system";
import AuthContext from "../context/AuthContext1";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { UserCredentials } from "../types";

interface Credentials {
  email: string;
  password: string;
  role: string;
}
const StyledTextField = styled(TextField)({
  "& label": {
    color: "white",
  },
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

const initialValues: UserCredentials = {
  email: "",
  password: "",
  role: "Client",
};

const validationSchema = Yup.object().shape({
  email: Yup.string().required("This field is required"),
  password: Yup.string().required("This field is required"),
});
export default function SignIn() {
  // const navigate = useNavigate();
  // const [credentials, setCredentials] = useState<Credentials>({
  //   email: "",
  //   password: "",
  //   role: "Client",
  // });
  // const authContext = useContext(AuthContext);
  // if (!authContext) {
  //   //console.log("not context");
  //   return null;
  // }
  // const { loginUser } = authContext;

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setCredentials((prevCredentials) => ({
  //     ...prevCredentials,
  //     [e.target.name]: e.target.value,
  //   }));
  // };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  // const loginSuccess = await loginUser(credentials);
  // if (loginSuccess) {
  //   toast.success("User Authenticated successfully");
  //   navigate("/client/dashboard");
  // }
  // };

  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  if (!authContext) {
    //console.log("not context");
    return null;
  }
  const { loginUser } = authContext;

  const handleSubmit = async (values: UserCredentials): Promise<void> => {
    console.log(values);
    console.log("loginUser", loginUser);
    const loginSuccess = await loginUser(values);
    if (loginSuccess) {
      toast.success("User Authenticated successfully");
      navigate("/client/dashboard");
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid
        container
        component="main"
        sx={{ height: "auto", backgroundColor: "#131f42" }}
      >
        <CssBaseline />
        <Grid
          item
          xs={12}
          sm={12}
          md={4}
          sx={{ borderRight: "thick double #ffa500" }}
        >
          <Box
            sx={{
              my: 8,
              mx: 6,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              height: "auto",
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
            <div>
              <Typography
                component="h1"
                variant="h5"
                sx={{
                  color: "white",
                  padding: "2rem",
                }}
              >
                Sign In To the Client portal
              </Typography>
            </div>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, errors, touched }) => (
                <Form noValidate>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                      <h4 style={{ color: "#ffa500" }}>Email:</h4>
                      <Field
                        as={StyledTextField}
                        label="Email Address"
                        name="email"
                        fullWidth
                        required
                        error={touched.email && Boolean(errors.email)}
                        helperText={
                          touched.email && Boolean(errors.email) && errors.email
                        }
                        margin="normal"
                        sx={{
                          input: {
                            backgroundColor: "Transparent ",
                            color: "white",
                          },
                          label: { color: "white" },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <h4 style={{ color: "#ffa500" }}>Password:</h4>
                      <Field
                        as={StyledTextField}
                        label="Password"
                        name="password"
                        type="password"
                        fullWidth
                        required
                        error={touched.password && Boolean(errors.password)}
                        helperText={
                          touched.password &&
                          Boolean(errors.password) &&
                          errors.password
                        }
                        margin="normal"
                        sx={{
                          input: {
                            backgroundColor: "Transparent ",
                            color: "white",
                          },
                          label: { color: "white" },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <Button type="submit" fullWidth variant="contained">
                        Sign In
                      </Button>
                    </Grid>
                    <Grid item>
                      <Link
                        sx={{
                          display: "flex",
                          justifyContent: "flex-end",
                          alignItems: "flex-end",
                        }}
                        href="/signup"
                        variant="subtitle1"
                      >
                        Already have an account? Sign Up
                      </Link>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
            {/* <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <Grid container spacing={4}>
                <Grid item xs={12} sm={12}>
                  <h4 style={{ color: "#ffa500" }}>Email:</h4>
                  <StyledTextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    onChange={handleChange}
                    sx={{
                      input: {
                        backgroundColor: "Transparent ",
                        color: "white",
                      },
                      label: { color: "white" },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <h4 style={{ color: "#ffa500" }}>Password:</h4>
                  <StyledTextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={handleChange}
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 4, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid sx={{ mt: 2 }} container justifyContent="flex-end">
                <Link href="/signup" variant="subtitle1">
                  Already have an account? Sign Up
                </Link>
              </Grid>
            </Box> */}
          </Box>
        </Grid>
        <Grid
          item
          xs={false}
          sm={false}
          md={8}
          sx={{
            display: { xs: "none", sm: "none", md: "flex" },
            backgroundImage: ` url(${process.env.PUBLIC_URL}/assets/signIn.svg)`,
            width: "100%",
            height: "100dvh",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></Grid>
      </Grid>
    </ThemeProvider>
  );
}
