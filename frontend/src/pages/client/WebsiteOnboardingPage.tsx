import {
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Info as InfoIcon,
  Link as LinkIcon,
} from "@mui/icons-material";
import { Formik, FieldArray, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";

// TODO extract to another file and rename it to something like PaperBackground
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
  borderRadius: 16,
}));

// Typescript Type for website details
type WebsiteCardType = {
  websiteName: string;
  baseUrl: string;
};

type WebsiteDetails = {
  websiteName: string;
  baseUrl: string;
  description: string;
  additionalUrls: string[];
};

const validationSchema = Yup.object().shape({
  websiteName: Yup.string().required("This field is required"),
  baseUrl: Yup.string().required("This field is required"),
  description: Yup.string(),
  additionalUrls: Yup.array().of(Yup.string().url("Invalid URL")),
});

const initialValues: WebsiteDetails = {
  websiteName: "",
  baseUrl: "",
  description: "",
  additionalUrls: [""],
};

const WebsiteCard = ({ websiteName }: WebsiteCardType) => {
  return (
    <Card sx={{ mb: 3 }} elevation={5}>
      <CardContent
        sx={{ display: "flex", alignItems: "center" }}
        style={{ padding: "0.5rem 1rem" }}
      >
        <Typography variant="h5" sx={{ flex: 1 }}>
          {websiteName}
        </Typography>
        <IconButton aria-label="edit">
          <EditIcon />
        </IconButton>
        <IconButton aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </CardContent>
    </Card>
  );
};

const WebsiteOnboardingPage = () => {
  const [websiteDetails, setWebsiteDetails] = useState<WebsiteDetails[]>([]);

  const handleSubmit = (values: WebsiteDetails, { resetForm }: any) => {
    setWebsiteDetails((prevDetails) => [...prevDetails, values]);
    resetForm();
  };

  useEffect(() => {
    console.log(websiteDetails);
  }, [websiteDetails]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, errors }) => (
        <Form noValidate>
          <Grid
            container
            spacing={4}
            style={{ paddingBottom: "0.5rem" }}
            justifyContent="center"
            alignItems="flex-start"
          >
            <Grid item xs={12} md={6}>
              <Item elevation={3}>
                <Typography variant="h4" gutterBottom>
                  Upload Your Website
                </Typography>
                <Typography variant="subtitle1" color="textSecondary" paragraph>
                  And leave the rest to us!
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Field
                      as={TextField}
                      label="Website Name"
                      name="websiteName"
                      fullWidth
                      required
                    />
                    <ErrorMessage
                      name="websiteName"
                      component="div"
                      className="form-error"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field
                      as={TextField}
                      label="Website URL"
                      name="baseUrl"
                      fullWidth
                      required
                    />
                    <ErrorMessage
                      name="baseUrl"
                      component="div"
                      className="form-error"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      label="Description"
                      name="description"
                      fullWidth
                      multiline
                      rows={4}
                      required
                    />
                    <ErrorMessage
                      name="description"
                      component="div"
                      className="form-error"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FieldArray name="additionalUrls">
                      {({ push, remove }) => (
                        <>
                          <Stack
                            direction="row"
                            spacing={2}
                            justifyContent="space-between"
                            alignItems="center"
                            sx={{ mb: 2 }}
                          >
                            <Stack direction="row" alignItems="center">
                              <Typography variant="h6" component="span">
                                Additional Links (optional)
                              </Typography>
                              <Tooltip
                                title="Add a few specific links of the website which you want to be checked with priority"
                                arrow
                              >
                                <IconButton>
                                  <InfoIcon />
                                </IconButton>
                              </Tooltip>
                            </Stack>
                            <Button
                              type="button"
                              variant="contained"
                              onClick={() => push("")}
                            >
                              Add Link
                            </Button>
                          </Stack>

                          <Stack direction="column" spacing={1}>
                            {values.additionalUrls.map((url, index) => (
                              <Stack direction="row" spacing={2} key={index}>
                                <Field
                                  as={TextField}
                                  id={`additionalUrls.${index}`}
                                  name={`additionalUrls.${index}`}
                                  fullWidth
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <LinkIcon />
                                      </InputAdornment>
                                    ),
                                  }}
                                />
                                {values.additionalUrls.length > 1 && (
                                  <IconButton
                                    type="button"
                                    onClick={() => remove(index)}
                                  >
                                    <DeleteIcon />
                                  </IconButton>
                                )}
                              </Stack>
                            ))}
                          </Stack>
                        </>
                      )}
                    </FieldArray>
                  </Grid>
                  <Grid item xs={12}>
                    <Button type="submit" variant="contained">
                      Add Website
                    </Button>
                  </Grid>
                </Grid>
              </Item>
            </Grid>
            <Grid item xs={12} md={3}>
              <Item elevation={3} sx={{ p: 4 }}>
                <Typography
                  variant="h5"
                  gutterBottom
                  style={{ marginBottom: 16 }}
                >
                  Added Websites
                </Typography>
                {websiteDetails.map((wDetails, index) => (
                  <WebsiteCard
                    key={index}
                    websiteName={wDetails.websiteName}
                    baseUrl={wDetails.baseUrl}
                  />
                ))}
                <Button variant="contained" fullWidth sx={{ mt: 1 }}>
                  Submit for certification
                </Button>
              </Item>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default WebsiteOnboardingPage;
