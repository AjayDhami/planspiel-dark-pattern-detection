import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  Close as CloseIcon,
  Delete as DeleteIcon,
  Info as InfoIcon,
  Link as LinkIcon,
} from "@mui/icons-material";
import { Formik, FieldArray, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

type WebsiteDetails = {
  websiteName: string;
  baseUrl: string;
  description: string;
  additionalUrls: string[];
};

const validationSchema = Yup.object().shape({
  websiteName: Yup.string().required("This field is required"),
  baseUrl: Yup.string().required("This field is required").url("Invalid URL"),
  description: Yup.string(),
  additionalUrls: Yup.array().of(Yup.string().url("Invalid URL")),
});

const initialValues: WebsiteDetails = {
  websiteName: "",
  baseUrl: "",
  description: "",
  additionalUrls: [""],
};

const WebsiteOnboardingForm = ({ open, onClose, fullScreen = false }: any) => {
  const handleSubmit = (values: WebsiteDetails, { resetForm }: any) => {
    console.log(values);
    resetForm();
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      fullWidth
      aria-labelledby="website-onboarding"
      onClose={onClose}
    >
      <DialogTitle>
        <Typography variant="h5">Add new Website</Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 14,
            top: 12,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors }) => (
            <Form noValidate>
              <Grid container spacing={2} sx={{ mt: 0 }}>
                <Grid item xs={12}>
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
                <Grid item xs={12}>
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
                            <Typography variant="body1" component="span">
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
                            color="secondary"
                            style={{ color: "#fff" }}
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
                              <ErrorMessage
                                name={`additionalUrls.${index}`}
                                component="div"
                                className="form-error"
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
                <Grid item xs={12} display="flex" justifyContent="end">
                  <Button type="submit" variant="contained">
                    Add Website
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default WebsiteOnboardingForm;
