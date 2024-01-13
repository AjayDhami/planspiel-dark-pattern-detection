import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  Stack,
  Typography,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Verified as VerifiedIcon } from "@mui/icons-material";
import WebsiteCard from "../../components/WebsiteCard";
import { useEffect, useState } from "react";
import WebsiteOnboardingForm from "../../components/client/WebsiteOnboardingForm";
import { getAllWebsites, getClientDashboardKPIData } from "../../api";
import { DashboardKPI, WebsiteResponse } from "../../types";
import { toast } from "react-toastify";

const CustomPaper = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
  background: theme.palette.background.paper,
  borderRadius: 16,
}));

const DashboardPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [kpiData, setKpiData] = useState<DashboardKPI | null>(null);
  const [websiteDataList, setWebsiteDataList] = useState<WebsiteResponse[]>([]);
  const [onboardingForm, setOnboardingForm] = useState<boolean>(false);

  const getWebsiteList = async (): Promise<void> => {
    try {
      const websites = await getAllWebsites();
      setWebsiteDataList(websites);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(`Error: ${error.message}`);
      } else {
        toast.error("An unknown error occurred.");
      }
    }
  };

  const getDashboardKPIData = async (): Promise<void> => {
    try {
      const data = await getClientDashboardKPIData();
      setKpiData(data);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Error: ${error.message}`);
      } else {
        toast.error("An unknown error occurred.");
      }
    }
  };

  const handleOnboardingSuccess = (): void => {
    getWebsiteList();
    getDashboardKPIData();
  };

  useEffect(() => {
    getWebsiteList();
  }, []);

  useEffect(() => {
    getDashboardKPIData();
  }, []);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item>
          <div className="card css-9ed8bs">
            <Box sx={{ p: "18px" }}>
              <Grid container direction="column">
                <Grid item>
                  <Typography variant="h5">$6000</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1">Total Earning</Typography>
                </Grid>
              </Grid>
            </Box>
          </div>
        </Grid>
      </Grid>

      <Grid container spacing={4} sx={{ mt: -1, mb: 4 }}>
        <Grid item xs={12} md={3}>
          <Card sx={{ borderRadius: 4 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography color="primary" variant="h6">
                Total Websites
              </Typography>
              <Typography color="textPrimary" variant="h4">
                {kpiData?.totalWebsites}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ borderRadius: 4 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography color="primary" variant="h6">
                Certification In Progress
              </Typography>
              <Typography color="textPrimary" variant="h4">
                {kpiData?.websitesInProgress}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ borderRadius: 4 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography color="primary" variant="h6">
                Websites Certified
              </Typography>
              <Typography color="textPrimary" variant="h4">
                {kpiData?.websitesCertified}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ borderRadius: 4 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography color="primary" variant="h6">
                Websites Rejected
              </Typography>
              <Typography color="textPrimary" variant="h4">
                {kpiData?.websitesRejected}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} md={7} order={isMobile ? 2 : 1}>
          <CustomPaper
            sx={{
              height: "100%",
            }}
          >
            <Stack
              direction={{ xs: "column", sm: "row" }}
              justifyContent="space-between"
            >
              <Typography variant="h5" component="div" color="primary">
                Your Websites
              </Typography>
              {websiteDataList.length > 6 && (
                <Button variant="text" color="secondary">
                  View all
                </Button>
              )}
            </Stack>
            <Grid container spacing={4} sx={{ mt: "-8px" }}>
              {/* slice function to display first 6 items */}
              {websiteDataList.slice(0, 6).map((website) => (
                <Grid item xs={12} md={4} key={website.websiteId}>
                  <WebsiteCard
                    websiteId={website.websiteId}
                    baseUrl={website.baseUrl}
                    websiteName={website.websiteName}
                    isCompleted={website.isCompleted}
                    phase={website.phase}
                  />
                </Grid>
              ))}
            </Grid>
          </CustomPaper>
        </Grid>
        <Grid item xs={12} md={5} order={isMobile ? 1 : 2}>
          <CustomPaper
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              height: "100%",
            }}
          >
            <Typography variant="h4" color="primary">
              Certify your website
            </Typography>
            <VerifiedIcon
              sx={{ m: 4, width: 100, height: 100 }}
              color="primary"
            />
            <Typography variant="body1" sx={{ mb: 2 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
              facilis aliquam nostrum doloribus provident est neque
              reprehenderit repellendus ipsum quis id, error aut beatae numquam
              tempora, cum corporis aspernatur odio excepturi sunt magni alias?
              Deserunt.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setOnboardingForm(true)}
            >
              Certify your website
            </Button>
          </CustomPaper>
        </Grid>
      </Grid>

      <WebsiteOnboardingForm
        fullScreen={isMobile}
        open={onboardingForm}
        onClose={() => setOnboardingForm(false)}
        onSuccess={handleOnboardingSuccess}
      />
    </>
  );
};

export default DashboardPage;
