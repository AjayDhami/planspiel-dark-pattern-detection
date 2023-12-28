import { Button, Paper, Typography, styled } from "@mui/material";
import {
  Dangerous as DangerousIcon,
  HourglassTop as PendingIcon,
  Verified as VerifiedIcon,
} from "@mui/icons-material";

type WebsiteCardProps = {
  websiteId: string;
  baseUrl: string;
  websiteName: string;
  additionalUrls?: string[];
  description?: string;
  isCompleted: boolean;
  phase: string; // phase states: "Initial" | "Automation" | "Manual" | "Feedback" | "Finished"
};

const CustomPaper = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
  background: theme.palette.background.paper,
  borderRadius: 16,
  textAlign: "center",
  minHeight: 150,
}));

const WebsiteCard = ({
  websiteName,
  baseUrl,
  isCompleted,
  phase,
}: WebsiteCardProps) => {
  return (
    <CustomPaper>
      <Typography variant="h5" component="div">
        {websiteName}
      </Typography>

      {isCompleted ? (
        phase === "Finished" ? (
          <>
            <VerifiedIcon
              style={{ width: "50px", height: "50px" }}
              color="success"
            />
            <Button size="small" variant="contained" color="success" fullWidth>
              Download Certificate
            </Button>
          </>
        ) : (
          <>
            <DangerousIcon
              style={{ width: "50px", height: "50px" }}
              color="error"
            />
            <Button size="small" variant="contained" color="error" fullWidth>
              View Feedback
            </Button>
          </>
        )
      ) : (
        <PendingIcon
          style={{ width: "50px", height: "50px" }}
          color="secondary"
        />
      )}
    </CustomPaper>
  );
};

export default WebsiteCard;
