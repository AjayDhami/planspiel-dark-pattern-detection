import { Chip } from "@mui/material";
import React from "react";

type PhaseBadgeProps = {
  phase: string;
  isCompleted: boolean;
  isDarkPatternFree: boolean;
};

const PhaseBadge = ({
  phase,
  isCompleted,
  isDarkPatternFree,
}: PhaseBadgeProps) => {
  if (isCompleted && isDarkPatternFree) {
    return <Chip label="Website Certified" color="success" />;
  } else if (isCompleted && !isDarkPatternFree) {
    return <Chip label="Website Rejected" color="error" />;
  } else {
    return (
      <Chip
        label="Certification in Progress"
        color="secondary"
        style={{ color: "#fff" }}
      />
    );
  }
};

export default PhaseBadge;
