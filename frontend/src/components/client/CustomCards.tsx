import { Avatar, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { KpiCardProps } from "../../types";

const kpiCardPalettes = {
  primary: {
    backgroundColor: "rgb(4, 132, 243)",
    color: "rgb(255, 255, 255)",
    borderColor: "rgba(224, 224, 224, 0.596)",
    extraColor: "rgb(0, 100, 200)",
    iconColor: "rgb(1, 108, 210)",
  },
  secondary: {
    backgroundColor: "rgb(94, 53, 177)",
    color: "rgb(255, 255, 255)",
    borderColor: "rgba(224, 224, 224, 0.596)",
    extraColor: "rgb(69, 39, 160)",
    iconColor: "rgb(69, 39, 160)",
  },
  success: {
    backgroundColor: "rgb(46, 125, 50)",
    color: "rgb(255, 255, 255)",
    borderColor: "rgba(224, 224, 224, 0.596)",
    extraColor: "rgb(76, 175, 80)",
    iconColor: "rgb(27, 94, 32)",
  },
  error: {
    backgroundColor: "rgb(211, 47, 47)",
    color: "rgb(255, 255, 255)",
    borderColor: "rgba(224, 224, 224, 0.596)",
    extraColor: "rgb(229, 115, 115)",
    iconColor: "rgb(183, 28, 28)",
  },
};

export const KpiCard = ({ color, title, subtitle, icon }: KpiCardProps) => {
  const selectedTheme = kpiCardPalettes[color as keyof typeof kpiCardPalettes];

  return (
    <Paper
      sx={{
        padding: "18px",
        transition: (theme) =>
          `box-shadow 300ms ${theme.transitions.easing.easeInOut} 0ms`,
        boxShadow: "none",
        backgroundImage: "none",
        borderRadius: "8px",
        border: "none rgba(224, 224, 224, 0.596)",
        backgroundColor: selectedTheme.backgroundColor,
        color: selectedTheme.color,
        overflow: "hidden",
        position: "relative",
        "&::before, &::after": {
          content: '""',
          position: "absolute",
          width: "210px",
          height: "210px",
          background: selectedTheme.extraColor,
          borderRadius: "50%",
          opacity: 0.5,
        },
        "&::before": {
          top: "-125px",
          right: "-15px",
        },
        "&::after": {
          top: "-85px",
          right: "-95px",
        },
      }}
    >
      <Grid container direction="column">
        <Grid item>
          <Avatar
            sx={{ borderRadius: 1, background: selectedTheme.iconColor }}
            variant="square"
            children={icon}
          />
        </Grid>
        <Grid item>
          <Typography
            variant="body1"
            sx={{
              margin: "14px 8px 6px 0px",
              lineHeight: "1.334em",
              fontSize: "2.125rem",
              fontWeight: "500",
            }}
          >
            {title}
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            variant="body1"
            sx={{
              lineHeight: "1.334em",
              fontWeight: "500",
            }}
          >
            {subtitle}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};
