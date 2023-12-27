import { Box, Button, Grid, Stack } from "@mui/material";
import React from "react";
import { MdAdd } from "react-icons/md";
import Card from "../../components/WebsiteCard";
import { Link } from "react-router-dom";

const websiteDataList = [
  {
    id: "1",
    name: "Website #1",
    isCertified: true,
    feedback: [],
  },
  {
    id: "2",
    name: "Website #2",
    isCertified: false,
    feedback: [],
  },
  {
    id: "3",
    name: "Website #3",
    isCertified: false,
    feedback: [
      {
        feedback_id: "301",
        feedback_type: "misdirection",
        feedback_description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut commodi officiis distinctio!",
        snaps: [],
        expert_id: "ex101",
        link: "https://dummy_link.com",
      },
    ],
  },
  {
    id: "4",
    name: "Website #4",
    isCertified: false,
    feedback: [],
  },
  {
    id: "5",
    name: "Website #5",
    isCertified: false,
    feedback: [],
  },
];

const DashboardPage = () => {
  return (
    <Box>
      <Stack direction="row" spacing={2} justifyContent="flex-end">
        <Button
          variant="contained"
          startIcon={<MdAdd />}
          component={Link}
          to="/client/onboarding"
        >
          Add Website for Certification
        </Button>
      </Stack>
      <Grid container spacing={2} style={{ margin: "1rem 0", width: "100%" }}>
        {websiteDataList.map((website) => (
          <Grid item xs={12} md={4} key={website.id}>
            <Card
              id={website.id}
              title={website.name}
              isCertified={website.isCertified}
              feedback={website.feedback}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DashboardPage;
