import React, { useEffect, useState } from "react";
import { Website } from "../../types";
import { toast } from "react-toastify";
import { getWebsite } from "../../api";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import {
  Close as CloseIcon,
  OpenInNew as OpenInNewIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import PhaseBadge from "./PhaseBadge";

type WebsiteDetailsModalProps = {
  websiteId: string;
  open: boolean;
  onClose: () => void;
};

const WebsiteDetailsModal = ({
  websiteId,
  open,
  onClose,
}: WebsiteDetailsModalProps) => {
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
    if (open) fetchWebsiteDetails(websiteId);

    return () => {
      setWebsite(null);
    };
  }, [open, websiteId]);

  return (
    <Dialog
      open={open}
      maxWidth="md"
      fullWidth
      aria-labelledby="website-details"
      onClose={onClose}
    >
      <DialogTitle>
        <Typography variant="h5" component="span" color="primary">
          {website === null ? (
            <Skeleton width={210} animation="wave" />
          ) : (
            website.websiteName
          )}
        </Typography>
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
        <Stack direction="column" gap={2}>
          <Grid container>
            <Grid item xs={12} sm={2}>
              Website ID
            </Grid>
            <Grid item xs={12} sm={10}>
              <Typography variant="subtitle1">
                {website === null ? (
                  <Skeleton animation="wave" />
                ) : (
                  website.websiteId
                )}
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} sm={2}>
              Website URL
            </Grid>
            <Grid item xs={12} sm={10}>
              <Typography variant="subtitle1" color="primary">
                {website === null ? (
                  <Skeleton animation="wave" />
                ) : (
                  <Link to={website.baseUrl} target="_blank">
                    {website?.baseUrl}&nbsp;
                    <OpenInNewIcon sx={{ width: "20px", height: "20px" }} />
                  </Link>
                )}
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} sm={2}>
              Additional URLs
            </Grid>
            <Grid item xs={12} sm={10}>
              {website === null ? (
                <Skeleton variant="rectangular" animation="wave" height={100} />
              ) : website.additionalUrls?.length ? (
                <Stack>
                  {website.additionalUrls.map((url, index) => (
                    <Typography
                      variant="subtitle1"
                      component="span"
                      color="primary"
                      key={index}
                    >
                      <Link to={url} target="_blank">
                        {url}&nbsp;
                        <OpenInNewIcon sx={{ width: "20px", height: "20px" }} />
                      </Link>
                    </Typography>
                  ))}
                </Stack>
              ) : (
                <Typography variant="subtitle1" component="span">
                  No additional URLs
                </Typography>
              )}
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} sm={2}>
              Description
            </Grid>
            <Grid item xs={12} sm={10}>
              <Typography variant="subtitle1">
                {website === null ? (
                  <Skeleton animation="wave" />
                ) : (
                  website.description
                )}
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} sm={2}>
              Website Status
            </Grid>
            <Grid item xs={12} sm={10}>
              {website === null ? (
                <Skeleton animation="wave" />
              ) : (
                <PhaseBadge phase={website.phase} />
              )}
            </Grid>
          </Grid>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default WebsiteDetailsModal;
