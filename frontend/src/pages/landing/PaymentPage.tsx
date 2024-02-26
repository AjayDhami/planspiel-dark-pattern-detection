import React from "react";
import { Box } from "@mui/material";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import FindInPageOutlinedIcon from "@mui/icons-material/FindInPageOutlined";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import ImportantDevicesOutlinedIcon from "@mui/icons-material/ImportantDevicesOutlined";
import "./PaymentPage.css";
const PaymentPage = () => {
  return (
    <Box>
      <Box className="payment-section">
        <h1>Choose Your Subscription Plans</h1>

        <Box className="payment-cards">
          <Box className="payment-card">
            <Box className="payment-card1">
              {/* <Box
                sx={{
                  placeContent: "center",
                  display: "inline-block",
                  margin: "auto",
                  color: " rgb(79, 104, 93 )",
                  width: "20%",
                  height: "20%",
                }}
              /> */}
              <Box className="payment-content">
                <h3> BASIC</h3>
                <p></p>
                <Button
                  sx={{
                    placeContent: "center",
                    display: "flex",
                    margin: "auto auto 10px auto",
                    color: "rgb(79, 104, 93)",
                    fontWeight: "bold",
                  }}
                >
                  Get Start
                </Button>
              </Box>
            </Box>
          </Box>
          <Box className="payment-card">
            <Box className="payment-card1">
              {/* <ImportantDevicesOutlinedIcon
              sx={{
                placeContent: "center",
                display: "inline-block",
                margin: "auto",
                color: " rgb(79, 104, 93  )",
                width: "20%",
                height: "20%",
              }}
            /> */}
              <Box className="payment-content">
                <h3>COMFORT</h3>
                <p></p>
                <Button
                  sx={{
                    placeContent: "center",
                    display: "flex",
                    margin: "auto auto 10px auto",
                    color: "rgb(79, 104, 93)",
                    fontWeight: "bold",
                    backgroundColor: "rgb(49, 203, 151)",
                  }}
                >
                  Get Start
                </Button>
              </Box>
            </Box>
          </Box>
          <Box className="payment-card">
            <Box className="payment-card1">
              {/* <WorkspacePremiumOutlinedIcon
              sx={{
                placeContent: "center",
                display: "inline-block",
                margin: "auto",
                color: " rgb(79, 104, 93  )",
                width: "20%",
                height: "20%",
              }}
            /> */}
              <Box className="payment-content">
                <h3>PREMIUM</h3>
                <p></p>
                <Link style={{ textDecoration: "none" }} href="/signup">
                  <Button
                    sx={{
                      placeContent: "center",
                      display: "flex",
                      margin: "auto auto 10px auto",
                      color: "rgb(79, 104, 93)",
                      fontWeight: "bold",
                    }}
                  >
                    Get Start
                  </Button>
                </Link>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PaymentPage;
