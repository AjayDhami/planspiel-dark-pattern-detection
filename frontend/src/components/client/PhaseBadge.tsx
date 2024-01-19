import { Chip } from "@mui/material";
import React from "react";

const PhaseBadge = ({ phase }: { phase: string }) => {
  switch (phase) {
    case "Initial":
      return <Chip label="Certification Requested" color="primary" />;
    case "InProgress":
      return (
        <Chip
          label="Certification in Progress"
          color="secondary"
          style={{ color: "#fff" }}
        />
      );
    case "Feedback":
      return <Chip label="Website Rejected" color="error" />;
    case "Finished":
      return (
        <Chip label="Website Certified" color="success" variant="outlined" />
      );
    default:
      return <Chip label={phase} />;
  }
};

export default PhaseBadge;
