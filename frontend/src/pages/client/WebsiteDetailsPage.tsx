import {
  Box,
  Button,
  Grid,
  Paper,
  Skeleton,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  Celebration as CelebrationIcon,
  OpenInNew as OpenInNewIcon,
} from "@mui/icons-material";
import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Website } from "../../types";
import { getWebsite } from "../../api";
import { toast } from "react-toastify";
import PhaseBadge from "../../components/client/PhaseBadge";
import CertificateSection from "../../components/client/CertificateSection";

const Section = styled(Paper)(({ theme }) => ({
  background: theme.palette.background.paper,
  padding: theme.spacing(2),
  borderRadius: 8,
}));

const LinkText = ({ url }: { url: string }) => {
  return (
    <Box display="flex">
      <Typography
        variant="body1"
        component="span"
        color="primary"
        noWrap
        mr={"4px"}
      >
        <Link to={url} target="_blank">
          {url}
        </Link>
      </Typography>
      <Link to={url} target="_blank">
        <OpenInNewIcon sx={{ width: "20px", height: "20px" }} color="primary" />
      </Link>
    </Box>
  );
};

const WebsiteDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [website, setWebsite] = useState<Website | null>(null);

  const isWebsiteDarkPatternFree = useMemo(() => {
    return (
      website &&
      website.phase === "Published" &&
      website.isCompleted &&
      website.isDarkPatternFree
    );
  }, [website]);

  const fetchWebsiteDetails = async (webId: string): Promise<void> => {
    try {
      const response = await getWebsite(webId);
      setWebsite(response);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Error: ${error.message}`);
      } else {
        toast.error("An unknown error occurred.");
      }
    }
  };

  useEffect(() => {
    if (id) fetchWebsiteDetails(id);
  }, [id]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={4}>
        <Section>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/client/dashboard")}
            color="secondary"
            sx={{ mb: 3 }}
          >
            Back
          </Button>

          {website ? (
            <>
              <Typography variant="h5" color="primary" mb={2}>
                {website.websiteName}
              </Typography>

              <Typography variant="subtitle1" color="primary">
                Website URL
              </Typography>
              <Typography variant="body1" mb={2}>
                <LinkText url={website.baseUrl} />
              </Typography>

              <Typography variant="subtitle1" color="primary">
                Additional URLs
              </Typography>
              {website.additionalUrls && website.additionalUrls.length ? (
                website.additionalUrls.map((url, index) => (
                  <LinkText key={index} url={url} />
                ))
              ) : (
                <Typography variant="body1" color="gray" mb={2}>
                  No additional URLs
                </Typography>
              )}

              <Typography variant="subtitle1" color="primary">
                Description
              </Typography>
              {website.description ? (
                <Typography variant="body1" mb={2}>
                  <Skeleton
                    variant="rectangular"
                    animation="wave"
                    height={100}
                  />
                </Typography>
              ) : (
                <Typography variant="body1" color="gray" mb={2}>
                  No Description
                </Typography>
              )}

              <Typography variant="subtitle1" color="primary">
                Website Status
              </Typography>
              <Typography variant="body1" mb={2}>
                <PhaseBadge
                  phase={website.phase}
                  isCompleted={website.isCompleted}
                  isDarkPatternFree={website.isDarkPatternFree}
                />
              </Typography>
            </>
          ) : (
            <>
              <Typography variant="h4" mb={4}>
                <Skeleton animation="wave" />
              </Typography>
              <Typography variant="subtitle1" color="primary">
                Website URL
              </Typography>
              <Typography variant="body1" mb={2}>
                <Skeleton animation="wave" />
              </Typography>
              <Typography variant="subtitle1" color="primary">
                Additional URLs
              </Typography>
              <Typography variant="body1" mb={2}>
                <Skeleton variant="rectangular" animation="wave" height={100} />
              </Typography>
              <Typography variant="subtitle1" color="primary">
                Description
              </Typography>
              <Typography variant="body1" mb={2}>
                <Skeleton variant="rectangular" animation="wave" height={100} />
              </Typography>
              <Typography variant="subtitle1" color="primary">
                Website Status
              </Typography>
              <Typography variant="body1" mb={2}>
                <Skeleton animation="wave" />
              </Typography>
            </>
          )}
        </Section>
      </Grid>

      {website && isWebsiteDarkPatternFree && (
        <Grid item xs={12} sm={8}>
          <Section>
            <CertificateSection {...website} />
          </Section>
        </Grid>
      )}

      <Grid item xs={12} sm={isWebsiteDarkPatternFree ? 12 : 8}>
        <Section
          sx={{
            minHeight: "300px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="h6" component="h6" color="primary">
            Website Feedbacks
          </Typography>

          {website ? (
            <Box
              display="flex"
              flex={1}
              justifyContent="center"
              alignItems="center"
            >
              <Stack
                spacing={2}
                direction="column"
                alignItems="center"
                color="gray"
              >
                <CelebrationIcon
                  sx={{ width: "80px", height: "80px" }}
                  color="success"
                />
                <Typography variant="subtitle1" component="p" color="green">
                  Hurray! No Feedbacks. Seems like your website is pretty
                  perfect and clean off Dark Patterns.
                </Typography>
              </Stack>
            </Box>
          ) : (
            <Skeleton variant="rectangular" animation="wave" height={100} />
          )}
        </Section>
      </Grid>
    </Grid>
  );
};

export default WebsiteDetailsPage;
