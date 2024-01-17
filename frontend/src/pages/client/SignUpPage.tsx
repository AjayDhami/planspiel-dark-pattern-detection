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
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

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

type UserRegistrationCredentials = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
};

const initialValues: UserRegistrationCredentials = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  role: "Client",
};
const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("This field is required"),
  lastName: Yup.string().required("This field is required"),
  email: Yup.string()
    .required("This field is required")
    .email("Please enter proper email format. ex: user@example.com"),
  password: Yup.string().required("This field is required"),
});
export default function SignUp() {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  if (!authContext) {
    return null;
  }
  const { signUpUser } = authContext;

  const handleSubmit = async (
    values: UserRegistrationCredentials
  ): Promise<void> => {
    const signupSuccess = await signUpUser(values);
    if (signupSuccess) {
      toast.success("Your Account has been created. Please login to continue.");
      navigate("/signin");
    }
  };

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Grid container component="main" sx={{ height: "auto" }}>
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
              backgroundImage: `linear-gradient(to bottom,rgb(0,15,45) 30%,rgb(0, 5, 14))`,
              height: "auto",
              boxShadow: "10px rgb(0, 5, 14)",
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
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ values, errors, touched }) => (
                  <Form noValidate>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <h4 style={{ color: "#ffa500" }}>Enter First Name:</h4>
                        <Field
                          as={StyledTextField}
                          margin="normal"
                          required
                          fullWidth
                          label="First Name"
                          name="firstName"
                          error={touched.firstName && Boolean(errors.firstName)}
                          helperText={
                            touched.firstName &&
                            Boolean(errors.firstName) &&
                            errors.firstName
                          }
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
                        <Field
                          as={StyledTextField}
                          margin="normal"
                          required
                          fullWidth
                          label="Last Name"
                          name="lastName"
                          error={touched.lastName && Boolean(errors.lastName)}
                          helperText={
                            touched.lastName &&
                            Boolean(errors.lastName) &&
                            errors.lastName
                          }
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
                        <Field
                          as={StyledTextField}
                          margin="normal"
                          required
                          fullWidth
                          label="Email Address"
                          name="email"
                          error={touched.email && Boolean(errors.email)}
                          helperText={
                            touched.email &&
                            Boolean(errors.email) &&
                            errors.email
                          }
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
                        <Field
                          as={StyledTextField}
                          margin="normal"
                          required
                          fullWidth
                          name="password"
                          label="Password"
                          type="password"
                          error={touched.password && Boolean(errors.password)}
                          helperText={
                            touched.password &&
                            Boolean(errors.password) &&
                            errors.password
                          }
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
                  </Form>
                )}
              </Formik>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
}
