import { Box, Grid, Paper, Skeleton, Stack, Typography } from "@mui/material";
import {
  Celebration as CelebrationIcon,
  Close as CloseIcon,
  OpenInNew as OpenInNewIcon,
} from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Website } from "../../types";
import { getWebsite } from "../../api";
import { toast } from "react-toastify";
import PhaseBadge from "../../components/client/PhaseBadge";
import CertificateSection from "../../components/client/CertificateSection";

const WebsiteDetailsPage = () => {
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
    <Grid container spacing={3}>
      <Grid xs={12} md={4} item>
        <Paper
          elevation={0}
          sx={{
            padding: (theme) => theme.spacing(2),
            color: (theme) => theme.palette.text.secondary,
            background: (theme) => theme.palette.background.paper,
            borderRadius: 2,
          }}
        >
          {website ? (
            <>
              <Typography variant="h5" color="primary" mb={4}>
                {website.websiteName}
              </Typography>

              <Typography variant="subtitle1" color="primary">
                Website URL
              </Typography>
              <Typography variant="body1" mb={2}>
                {website?.baseUrl}
              </Typography>

              <Typography variant="subtitle1" color="primary">
                Additional URLs
              </Typography>
              <Stack mb={2}>
                {website.additionalUrls && website.additionalUrls.length ? (
                  website.additionalUrls.map((url, index) => (
                    <Box display="flex" key={`${url}-${index}`}>
                      <Typography
                        variant="body1"
                        component="span"
                        color="primary"
                        noWrap
                      >
                        <Link to={url} target="_blank">
                          {url}
                        </Link>
                      </Typography>
                      <Link to={url} target="_blank">
                        <OpenInNewIcon
                          sx={{ width: "20px", height: "20px" }}
                          color="primary"
                        />
                      </Link>
                    </Box>
                  ))
                ) : (
                  <Typography variant="body1" color="gray">
                    No additional URLs
                  </Typography>
                )}
              </Stack>

              <Typography variant="subtitle1" color="primary">
                Description
              </Typography>
              {website.description ? (
                <Typography variant="body1" mb={2}>
                  {website.description}
                </Typography>
              ) : (
                <Typography variant="body1" color="gray" mb={2}>
                  No Description
                </Typography>
              )}

              <Typography variant="subtitle1" color="primary">
                Website Status
              </Typography>
              <PhaseBadge
                phase={website.phase}
                isCompleted={website.isCompleted}
                isDarkPatternFree={website.isDarkPatternFree}
              />
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
            </>
          )}
        </Paper>
      </Grid>
      {website?.phase === "Published" &&
        website.isCompleted &&
        website.isDarkPatternFree && (
          <Grid xs={12} md={8} item>
            <Paper
              elevation={0}
              sx={{
                padding: (theme) => theme.spacing(2),
                color: (theme) => theme.palette.text.secondary,
                background: (theme) => theme.palette.background.paper,
                borderRadius: 2,
              }}
            >
              <CertificateSection {...website} />
            </Paper>
          </Grid>
        )}
      <Grid xs={12} md={8} item>
        <Paper
          elevation={0}
          sx={{
            padding: (theme) => theme.spacing(2),
            color: (theme) => theme.palette.text.secondary,
            background: (theme) => theme.palette.background.paper,
            borderRadius: 2,
          }}
        ></Paper>
      </Grid>
    </Grid>
  );
};

export default WebsiteDetailsPage;
