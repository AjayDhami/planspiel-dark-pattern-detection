import {
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import WebsiteCard from "../../components/WebsiteCard";
import { websiteDataList } from "../../data";
import { useState } from "react";
import WebsiteOnboardingForm from "../../components/client/WebsiteOnboardingForm";

const BackgroundPaper = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
  borderRadius: 12,
}));

const DashboardPage = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{ py: 4, mb: 2 }}
      >
        <Typography variant="h4" component="h4">
          Welcome to Dark pattern detection application
        </Typography>
        <Typography variant="body1" m={2}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur porro
          accusantium hic molestiae distinctio minima cumque aperiam omnis,
          sapiente eos nemo quos corrupti ipsum nulla exercitationem unde
          ducimus illo modi voluptas laboriosam.
        </Typography>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Certify your Website
        </Button>
      </Stack>

      <Typography variant="h5" component="h5" sx={{ mb: 2 }}>
        Your Websites
      </Typography>

      <Grid container spacing={2}>
        {websiteDataList.map((website) => (
          <Grid item xs={12} md={4} key={website.id}>
            <WebsiteCard
              id={website.id}
              title={website.name}
              isCertified={website.isCertified}
              feedback={website.feedback}
            />
          </Grid>
        ))}
      </Grid>

      <WebsiteOnboardingForm open={open} onClose={handleClose} />
    </>
  );
};

export default DashboardPage;
