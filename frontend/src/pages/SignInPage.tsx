import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./SignIn.css";
import AuthContext from "../context/AuthContext1";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { UserCredentials } from "../types";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme({
  palette: {
    background: {
      default: "#cccc",
    },
  },
});
const logo = require("./images/Logo.png");

const initialValues: UserCredentials = {
  email: "",
  password: "",
  role: "Client",
};

const validationSchema = Yup.object().shape({
  email: Yup.string().required("This field is required"),
  password: Yup.string().required("This field is required"),
});

const SignInPage = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const handleSubmit = async (values: UserCredentials): Promise<void> => {
    try {
      const isUserLogged = authContext?.loginUser(values);
      if (isUserLogged) {
        toast.success("User Authenticated successfully");
        navigate("/client/dashboard");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Error: ${error.message}`);
      } else {
        toast.error("An unknown error occurred.");
      }
    }
  };

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            display="flex"
            flexDirection={"column"}
            maxWidth={400}
            maxHeight={500}
            alignItems="center"
            justifyContent={"center"}
            margin="auto"
            marginTop={10}
            padding={4}
            borderRadius={5}
            boxShadow={"5px 5px 10px #ccc"}
            bgcolor="#ffff"
          >
            <Link href="/">
              <img src={logo} alt="..." className="logo-img" />
            </Link>
            <div className="text">
              <Typography component="h1">
                Sign In with your User Name
              </Typography>
            </div>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, errors, touched }) => (
                <Form noValidate>
                  <Field
                    as={TextField}
                    label="Email Address"
                    name="email"
                    fullWidth
                    required
                    error={touched.email && Boolean(errors.email)}
                    helperText={
                      touched.email && Boolean(errors.email) && errors.email
                    }
                    margin="normal"
                  />
                  <Field
                    as={TextField}
                    label="Password"
                    name="password"
                    fullWidth
                    required
                    error={touched.password && Boolean(errors.password)}
                    helperText={
                      touched.password &&
                      Boolean(errors.password) &&
                      errors.password
                    }
                    margin="normal"
                  />
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 3 }}
                  >
                    Sign In
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link href="#" variant="body2">
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link href="/signup" variant="body2">
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>

            <Copyright sx={{ mt: 3, mb: 3 }} />
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default SignInPage;
