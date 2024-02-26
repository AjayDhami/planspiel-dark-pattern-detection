import {
  Box,
  Button,
  Divider,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  Celebration as CelebrationIcon,
  OpenInNew as OpenInNewIcon,
} from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PhaseBadge from "../../components/client/PhaseBadge";
import { Website } from "../../types";
import { getWebsite } from "../../api";
import { toast } from "react-toastify";
import CertificateSection from "../../components/client/CertificateSection";

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
    <Paper
      sx={(theme) => ({
        background: theme.palette.background.paper,
        padding: theme.spacing(2),
      })}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h4" color="primary">
          Website Details
        </Typography>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/client/dashboard")}
          color="secondary"
          sx={{
            display: { xs: "none", md: "inline-flex" },
          }}
        >
          Back
        </Button>
      </Stack>

      {website ? (
        <>
          <Typography variant="subtitle1" fontWeight="bold">
            Website Name
          </Typography>
          <Typography variant="body1" mb={2}>
            {website.websiteName}
          </Typography>

          <Typography variant="subtitle1" fontWeight="bold">
            Website URL
          </Typography>
          <Typography variant="body1" mb={2}>
            <LinkText url={website.baseUrl} />
          </Typography>

          <Typography variant="subtitle1" fontWeight="bold">
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

          <Typography variant="subtitle1" fontWeight="bold">
            Website Status
          </Typography>
          <PhaseBadge
            isCompleted={website.isCompleted}
            isDarkPatternFree={website.isDarkPatternFree}
            sx={{
              mb: 2,
            }}
          />

          <Typography variant="subtitle1" fontWeight="bold">
            Description
          </Typography>
          {website.description ? (
            <Typography variant="body1">{website.description}</Typography>
          ) : (
            <Typography variant="body1" color="gray">
              No Description
            </Typography>
          )}
        </>
      ) : (
        <>
          <Typography variant="subtitle1" fontWeight="bold">
            Website Name
          </Typography>
          <Typography variant="body1" mb={2}>
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
          <Typography variant="body1">
            <Skeleton animation="wave" />
          </Typography>
        </>
      )}

      {website &&
        website.phase === "Published" &&
        website.isDarkPatternFree && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h5" color="primary">
              Website Certification
            </Typography>
            <CertificateSection {...website} />
          </>
        )}

      {website && website.phase === "Published" && (
        <>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h5" color="primary">
            Website Feedbacks
          </Typography>
          {website.expertFeedback ? (
            <Box>
              <Typography
                variant="body1"
                component="p"
                sx={{
                  whiteSpace: "pre-wrap",
                }}
              >
                {website.expertFeedback}
              </Typography>
            </Box>
          ) : (
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
          )}
        </>
      )}
    </Paper>
  );
};

export default WebsiteDetailsPage;
