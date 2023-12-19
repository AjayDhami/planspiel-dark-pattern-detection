import { Box, Button, Paper, Stack, Typography, styled } from "@mui/material";

type CardProps = {
  id: string;
  title: string;
  isCertified: boolean;
  feedback: Array<any>;
};

const CustomPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
}));

const WebsiteCard = ({ id, title, isCertified, feedback }: CardProps) => {
  return (
    <CustomPaper elevation={3} style={{ minHeight: "8rem" }}>
      <Stack spacing={3}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" component="span">
            {title}
          </Typography>
          {isCertified && (
            <Box>
              <Button size="small" variant="contained" color="success">
                Download Certificate
              </Button>
            </Box>
          )}
          {feedback.length > 0 && (
            <Box>
              <Button size="small" variant="contained" color="error">
                View Feedback
              </Button>
            </Box>
          )}
        </Box>
        <Typography variant="body1">{title}</Typography>
      </Stack>
    </CustomPaper>
  );
};

export default WebsiteCard;
