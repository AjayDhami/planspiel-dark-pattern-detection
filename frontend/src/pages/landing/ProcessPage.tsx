import React from "react";
import { Box } from "@mui/material";

import "./ProcessPage.css";

const ProcessPage = () => {
  return (
    <Box className="process-container">
      <h1
        style={{
          fontSize: "3rem",
          color: "white",
          fontWeight: "600",
          marginTop: "3vw",
          textAlign: "center",
        }}
      >
        Let's a Look Our Product Demo
      </h1>
      <p
        style={{
          fontSize: "1.2rem",
          color: "rgba(255,255,255,.9)",
          fontWeight: "400",
          marginTop: "1vw",
          marginBottom: "4vw",
          textAlign: "center",
        }}
      >
        Here is our  Product RoadMap
      </p>

      <Box className="timeline">
        <Box className="timeline-container left-timeline-container">
          <Box className="pic"></Box>
          <Box className="text-box">
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "500",
                color: "rgb(255,255,255)",
              }}
            >
              Enter URL
            </h2>
            <p>
              Enter URL is a user interface prompt commonly found in web
              browsers, search engines, and various online platforms. This
              instructive text invites users to input a URL, the web address.
            </p>
          </Box>
        </Box>
      </Box>
      <Box className="timeline">
        <Box className="timeline-container right-timeline-container">
          <Box className="pic"></Box>
          <Box className="text-box">
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "500",
                color: "rgb(255,255,255)",
              }}
            >
              Dark Patterns Detection
            </h2>
            <p>
              Dark Pattern Detection is crucial in preventing deceptive
              practices. This step ensures a clean and transparent user
              experience.
            </p>
          </Box>
        </Box>
      </Box>
      <Box className="timeline">
        <Box className="timeline-container left-timeline-container">
          <Box className="pic"></Box>
          <Box className="text-box">
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "500",
                color: "rgb(255,255,255)",
              }}
            >
              Got Ceretification
            </h2>
            <p>
              After successfully completing the process, your product receives
              certification, proving its legitimacy and adherence to standards.
            </p>
          </Box>
        </Box>
      </Box>
      <Box className="timeline">
        <Box className="timeline-container right-timeline-container">
          <Box className="pic"></Box>
          <Box className="text-box">
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "500",
                color: "rgb(255,255,255)",
              }}
            >
              Got Feed Back
            </h2>
            <p>
              Enter URL is a user interface prompt commonly found in web
              browsers, search engines, and various online platforms. This
              instructive text invites users to input a URL the web address .
            </p>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProcessPage;
