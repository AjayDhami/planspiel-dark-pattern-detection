import {
  Box,
  Divider,
  Grid,
  Link,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getWebsiteFeedbackPatterns } from "../../api";
import { PatternData, Website } from "../../types";
import { ImageCard } from "./CustomCards";

const FeedbackDetail = (props: PatternData) => {
  return (
    <Box
      sx={{
        my: (theme) => theme.spacing(2),
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

      <Divider sx={{ mt: 1 }} />
    </Box>
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
      <Typography
        variant="body1"
        mb={2}
        sx={{
          borderBottom: "2px solid #ccc;",
          paddingBlock: "15px",
        }}
      >
        {expertFeedback}
      </Typography>
      {/* 
      <Typography variant="h5" fontWeight="bold">
        Feedback Analysis
      </Typography> */}
      {feedbackList.map((item) => {
        item.patternImageUrls = [
          "https://fastly.picsum.photos/id/1/5000/3333.jpg?hmac=Asv2DU3rA_5D1xSe22xZK47WEAN0wjWeFOhzd13ujW4",
          "https://fastly.picsum.photos/id/1/5000/3333.jpg?hmac=Asv2DU3rA_5D1xSe22xZK47WEAN0wjWeFOhzd13ujW4",
          "https://fastly.picsum.photos/id/1/5000/3333.jpg?hmac=Asv2DU3rA_5D1xSe22xZK47WEAN0wjWeFOhzd13ujW4",
        ];
        return <FeedbackDetail {...item} key={item.id} />;
      })}
    </Stack>
  );
};

export default ExpertFeedbackSection;
