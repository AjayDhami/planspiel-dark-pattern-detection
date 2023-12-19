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

// TODO extract to another file and rename it to something like PaperBackground
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
}));

const WebsiteCard = () => {
  return (
    <Card sx={{ mb: 2 }} elevation={5}>
      <CardContent sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="h5" sx={{ flex: 1 }}>
          Website Name 1
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
  return (
    <Grid container spacing={2} style={{ paddingBottom: "0.5rem" }}>
      <Grid item xs={12} md={8}>
        <Item elevation={3}>
          <Typography variant="h4" gutterBottom>
            Upload Your Website
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" paragraph>
            And leave the rest to us!
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                required
                fullWidth
                id="websiteName"
                label="Website Name"
                name="websiteName"
                // value={name}
                // onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                fullWidth
                id="websiteUrl"
                label="Website URL"
                name="websiteUrl"
                // value={name}
                // onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="websiteDescription"
                label="Description"
                name="websiteDescription"
                multiline
                rows={4}
                // value={name}
                // onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
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
                <Button variant="contained">Add Link</Button>
              </Stack>

              <Stack direction="row" spacing={2}>
                <TextField
                  fullWidth
                  id="additionalLink"
                  name="additionalLink"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LinkIcon />
                      </InputAdornment>
                    ),
                  }}
                />

                <IconButton>
                  <DeleteIcon />
                </IconButton>
              </Stack>
            </Grid>
          </Grid>
        </Item>
      </Grid>
      <Grid item xs={12} md={4}>
        <Item elevation={3}>
          <WebsiteCard />
          <Button variant="contained">Submit for certification</Button>
        </Item>
      </Grid>
    </Grid>
  );
};

export default WebsiteOnboardingPage;
