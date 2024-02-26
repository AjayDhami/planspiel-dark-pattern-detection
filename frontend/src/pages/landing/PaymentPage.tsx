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
                <h3>BASIC</h3>
                <h4>
                  {/* <span
                    style={{
                      color: "rgba(131,58,180,0.9)",
                      fontWeight: "900",
                      fontSize: "1.5rem",
                    }}
                  >
                    3
                  </span> */}
                  3 Months Support
                </h4>
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <Button
                  sx={{
                    placeContent: "center",
                    display: "flex",
                    margin: "auto auto 10px auto",
                    color: "white",
                    fontWeight: "bold",
                    backgroundColor: "rgba(131,58,180,1) ",
                    padding: "1rem",
                    borderRadius: "5rem",
                    fontSize: "1rem",
                    marginTop: "5.3vw",
                    width: "100%",
                    transition: "background-color 0.3s",
                    "&:hover": {
                      backgroundColor: "rgba(131,58,180,0.9)",
                    },
                  }}
                >
                  REGISTER
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
                <h4>
                  {/* <span
                    style={{
                      color: "rgba(131,58,180,0.9)",
                      fontWeight: "900",
                      fontSize: "1.5rem",
                    }}
                  >
                    3
                  </span> */}
                  6 Months Support
                </h4>
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <Button
                  sx={{
                    placeContent: "center",
                    display: "flex",
                    // margin: "auto auto 10px auto",
                    color: "black",
                    fontWeight: "bold",
                    backgroundColor: "rgba(176, 219, 114, 1) ",
                    padding: "1rem",
                    borderRadius: "5rem",
                    fontSize: "1rem",
                    width: "100%",
                    alignContent: "center",
                    marginTop: "5.6vw",
                    transition: "background-color 0.3s",
                    "&:hover": {
                      backgroundColor: "rgba(176, 219, 114,0.9)",
                    },
                  }}
                >
                  REGISTER
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
                <h3> PREMIUM</h3>
                <h4>
                  {/* <span
                    style={{
                      color: "rgba(131,58,180,0.9)",
                      fontWeight: "900",
                      fontSize: "1.5rem",
                    }}
                  >
                    3
                  </span> */}
                  12 Months Support
                </h4>
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <Button
                  sx={{
                    placeContent: "center",
                    display: "flex",
                    margin: "auto auto 10px auto",
                    color: "white",
                    fontWeight: "bold",
                    backgroundColor: "rgba(228,138,19,1) ",
                    padding: "1rem",
                    borderRadius: "5rem",
                    fontSize: "1rem",
                    marginTop: "5.6vw",
                    width: "100%",
                    transition: "background-color 0.3s",
                    "&:hover": {
                      backgroundColor: "rgba(228,138,19,0.9)",
                    },
                  }}
                >
                  REGISTER
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PaymentPage;
