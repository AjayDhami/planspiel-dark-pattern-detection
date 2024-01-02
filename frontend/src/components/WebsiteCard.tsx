import { Box, Button, Paper, Tooltip, Typography, styled } from "@mui/material";
import {
  Dangerous as DangerousIcon,
  HourglassTop as PendingIcon,
  Verified as VerifiedIcon,
} from "@mui/icons-material";
import { WebsiteCardProps } from "../types";

const CustomPaper = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
  background: theme.palette.background.paper,
  borderRadius: 16,
  minHeight: 150,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-evenly",
  alignItems: "center",
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
            <Tooltip title="Certification Successful" arrow>
              <VerifiedIcon
                style={{ width: "50px", height: "50px" }}
                color="success"
              />
            </Tooltip>
            <Button size="small" variant="contained" color="success" fullWidth>
              Download Certificate
            </Button>
          </>
        ) : (
          <>
            <Tooltip title="Certification Failed" arrow>
              <DangerousIcon
                style={{ width: "50px", height: "50px" }}
                color="error"
              />
            </Tooltip>
            <Button size="small" variant="contained" color="error" fullWidth>
              View Feedback
            </Button>
          </>
        )
      ) : (
        <Box>
          <Tooltip title="Website Certification in Progress" arrow>
            <PendingIcon
              style={{ width: "50px", height: "50px" }}
              color="secondary"
            />
          </Tooltip>
        </Box>
      )}
    </CustomPaper>
  );
};

export default WebsiteCard;
