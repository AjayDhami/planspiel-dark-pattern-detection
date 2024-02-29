import { Box, Grid, Link, Paper, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getWebsiteFeedbackPatterns } from "../../api";
import { PatternData, Website } from "../../types";
import { ImageCard } from "./CustomCards";

const FeedbackDetail = (props: PatternData) => {
  return (
    <Paper
      elevation={2}
      sx={{
        padding: (theme) => theme.spacing(2),
        my: (theme) => theme.spacing(1),
      }}
    >
      <Typography variant="h6" fontWeight="bold">
        {props.patternType}
      </Typography>
      <Typography variant="subtitle1">
        Detected at:{" "}
        <Link href={props.detectedUrl} target="_blank">
          {props.detectedUrl}
        </Link>
      </Typography>
      <Typography variant="body1" fontStyle="italic">
        {props.description}
      </Typography>

      {props.patternImageUrls && props.patternImageUrls.length > 0 && (
        <Box mt={1}>
          <Typography variant="subtitle1" fontWeight="bold">
            Feedback Images
          </Typography>
          <Grid container spacing={2}>
            {props.patternImageUrls.map((image, key) => (
              <Grid item key={key} xs={12} sm={6} md={3}>
                <ImageCard imageUrl={image} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Paper>
  );
};

const ExpertFeedbackSection = ({
  websiteId: webId,
  expertFeedback,
}: Website) => {
  const [feedbackList, setFeedbackList] = useState<PatternData[]>([]);

  const fetchFeedbacks = async (webId: string): Promise<void> => {
    try {
      const response = await getWebsiteFeedbackPatterns(webId);
      console.log(response);
      setFeedbackList(response);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Error: ${error.message}`);
      } else {
        toast.error("An unknown error occurred.");
      }
    }
  };

  useEffect(() => {
    fetchFeedbacks(webId);
  }, [webId]);

  return (
    <Stack>
      <Typography variant="h5" fontWeight="bold">
        Overview
      </Typography>
      <Typography variant="body1" mb={2}>
        {expertFeedback}
      </Typography>

      <Typography variant="h5" fontWeight="bold">
        Feedback Analysis
      </Typography>
      {feedbackList.map((item) => {
        return <FeedbackDetail {...item} key={item.id} />;
      })}
    </Stack>
  );
};

export default ExpertFeedbackSection;
