import React from "react";
import { Box, Grid } from "@mui/material";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import { motion } from "framer-motion";
import "./LandingPage.css";
import CardFlip from "./CardFlip";
const LandingPage = () => {
  return (
    <>
      <Box
        sx={{
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "auto",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          position: "",
          backgroundImage: `linear-gradient(
          to left,
          rgba(2, 24, 77, 0.984),
          rgba(3, 47, 129, 0.859)
        ), url(${process.env.PUBLIC_URL}/assets/bgimage.svg)`,
        }}
      >
        <Box
          sx={{
            height: "100dvh",
            width: "90%",
            display: "flex",
            // justifyContent: "center",
            // alignItems: "center",
            flexDirection: "column",
            backgroundColor: "",
          }}
        >
          <Grid md={12}>
            <div className="landingpage-navbar">
              <div className="wrapper">
                <motion.span
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.2 }}
                >
                  <Link href="/" sx={{ m: 1 }}>
                    <img
                      src="/assets/logo.png"
                      alt="..."
                      style={{
                        width: "5rem",
                        height: "5rem",
                      }}
                    />
                  </Link>
                </motion.span>
                <div>
                  <Link href="/signin">
                    <Button className="navbar-btn" variant="outlined">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button className="navbar-btn" variant="outlined">
                      Sign UP
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Grid>
          <Grid container spacing={0}>
            <Grid item md={7}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  backgroundColor: "black",
                }}
              >
                Box1
              </Box>
            </Grid>
            <Grid item md={4}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  backgroundColor: "red",
                }}
              >
                Box2
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box
          sx={{
            height: "100dvh",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            // backgroundImage: `linear-gradient(to right,rgb(0,15,45) 40%,rgb(0, 5, 14))`,
            //backgroundColor: "white",
          }}
        >
          <Box
            sx={{
              height: "10dvh",
              width: "100rem",
              justifyContent: "end",
              alignItems: "end",
              //backgroundColor: "green",
              fontSize: "2rem",
            }}
          >
            Dark Pattrens
          </Box>
          <Grid container rowSpacing={2}>
            <Grid container spacing={4}>
              <Grid item md={4}>
                <CardFlip />
              </Grid>
              <Grid item md={4}>
                <CardFlip />
              </Grid>
              <Grid item md={4}>
                <CardFlip />
              </Grid>
            </Grid>
            <Grid container spacing={4}>
              <Grid item md={4}>
                <CardFlip />
              </Grid>
              <Grid item md={4}>
                <CardFlip />
              </Grid>
              <Grid item md={4}>
                <CardFlip />
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Box
          sx={{
            height: "70dvh",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            //backgroundImage: `linear-gradient(to right,rgb(0,15,45) 40%,rgb(0, 5, 14))`,
          }}
        >
          <Box
            sx={{
              height: "70rem",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              //backgroundColor: "rgb(0, 153, 255)",
              //backgroundImage: `linear-gradient(to right,rgb(0,15,45) 40%,rgb(0, 5, 14))`,
              margin: "10rem",
              //border: ".1rem solid  rgb(0, 153, 255)",
            }}
          >
            <Grid container spacing={6}>
              <Grid item xs={12} md={4}>
                <Box
                  sx={{
                    height: "auto",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    // backgroundColor: "",
                    color: "white",
                    fontStyle: "revert-layer",
                    fontSize: "2.5rem",
                    fontWeight: "bold",
                  }}
                >
                  V-TENET
                  <Link href="/signup">
                    <Button
                      sx={{
                        color: "white",
                        fontSize: "1rem",
                        fontWeight: "bold",
                        borderRadius: "1rem",
                        border: ".1rem solid  rgb(0, 153, 255)",
                        padding: ".5rem",
                        mt: 2,
                      }}
                    >
                      Get Start
                    </Button>
                  </Link>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box
                  sx={{
                    height: "auto",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    backgroundColor: "",
                    color: "white",
                    fontStyle: "revert-layer",
                    fontSize: "1.7rem",
                  }}
                >
                  Features
                  <Box
                    sx={{
                      height: "auto",
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                      //backgroundColor: " red",
                      color: "#cccc",
                      fontStyle: "revert-layer",
                      fontSize: "1.2rem",
                      marginTop: 2,
                    }}
                  >
                    CMS<br></br> Localization<br></br> AI<br></br> Effects Site
                    <br></br> Management<br></br> Enterprise<br></br>
                    Developers
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box
                  sx={{
                    height: "auto",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "start",
                    flexDirection: "column",
                    // backgroundColor: "",
                    color: "white",
                    fontStyle: "revert-layer",
                    fontSize: "1.5rem",
                  }}
                >
                  Support
                  <Box
                    sx={{
                      height: "auto",
                      width: { xs: "80%", md: "80%" },
                      display: "flex",
                      justifyContent: "start",
                      alignItems: { xs: "center", md: "center", lg: "end" },
                      //backgroundColor: " red",
                      color: "#cccc",
                      fontStyle: "revert-layer",
                      fontSize: "1.2rem",
                      margin: 2,
                    }}
                  >
                    Help<br></br>Social Media <br></br> Contact
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default LandingPage;
