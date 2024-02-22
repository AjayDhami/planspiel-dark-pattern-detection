import { Grid, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const WebsiteDetailsPage = () => {
  return (
    <Paper
      elevation={0}
      sx={{
        padding: (theme) => theme.spacing(2),
        color: (theme) => theme.palette.text.secondary,
        background: (theme) => theme.palette.background.paper,
        borderRadius: 2,
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5" fontWeight="600" color="primary">
            Website Name Details
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Stack>
            <Typography variant="subtitle1">Website URLs</Typography>
            <Typography variant="body1">
              <Link to="https://prabudh-mishra.vercel.app/" target="_blank">
                https://prabudh-mishra.vercel.app/
              </Link>
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default WebsiteDetailsPage;
