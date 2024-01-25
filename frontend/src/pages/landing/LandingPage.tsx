import React from "react";
import { Box, Grid } from "@mui/material";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import { motion } from "framer-motion";
import { MdOutlineAttachEmail } from "react-icons/md";
import "./LandingPage.css";
import CardFlip from "./CardFlip";
import CardOverlap from "./CardOverlap";
import NavbarPage from "./NavbarPage";
const LandingPage = () => {
  return (
    <>
      <Box
        sx={{
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          height: { xs: "auto", md: "auto", lg: "auto" },
          width: { xs: "100%", md: "100%", lg: "100%" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          position: "sticky",
          backgroundImage: `linear-gradient(to left, rgba(2, 24, 77, 0.984), rgba(3, 47, 129, 0.859)),url(${process.env.PUBLIC_URL}/assets/bgimage.svg)`,

          // //   m: 0,
          //backgroundImage: ``,
        }}
      >
        <Box
          sx={{
            height: { xs: "100dvh", lg: "100dvh" },
            width: { xs: "100%", lg: "100%" },
          }}
        >
          <NavbarPage />

          <Grid container spacing={0}>
            <Grid item md={7} xs={12}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  height: "60dvh",
                  //backgroundColor: "white",
                }}
              >
                <motion.span
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.2 }}
                >
                  <h2 className="main-text">Let's Start With </h2>
                </motion.span>
                <h2 className="main-text1">Your Dark Parterre Detector</h2>
                <span data-text="GotYa!" className="main-text2">
                  GotYa!
                </span>
              </Box>
            </Grid>
            <Grid item md={4}>
              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  backgroundColor: "",
                }}
              >
                <img
                  src="/assets/2.png"
                  alt="..."
                  style={{
                    width: "100%",
                    height: "100%",
                    marginLeft: "5rem",
                    backgroundColor: "transparent",
                  }}
                />
                <Box
                  sx={{
                    fontSize: "1.5rem",
                    fontFamily: "monospace",
                    fontStyle: "revert-layer",
                    fontWeight: "900",
                    color: "white",
                  }}
                >
                  Dark Patterns Detected By GotYa
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
        {/* -------------------------------------------Section2------------------------------------------------- */}
        <Box
          sx={{
            marginTop: "2vw",
            height: { md: "40dvh" },
            width: { md: "100%" },
            // backgroundColor: "rgba(110, 118, 129,.1)",
            display: "grid",
            placeItems: "center",
            fontSize: { xs: "1.2rem", md: "3rem" },
          }}
        >
          <h1
            style={{
              padding: "5px",
              margin: "5px 0px",
              color: "rgb(110, 118, 129)",
              fontWeight: "600",
            }}
          >
            Our Valuable Customer
          </h1>
          <Box className="_partner_">
            <Box className="_partner-items_">
              <img
                src="/assets/binarybrenz_logo.png"
                alt="..."
                style={{
                  width: "12%",
                  height: "",
                  margin: "20px",
                }}
              />
              <img
                src="/assets/vps_logo.png"
                alt="..."
                style={{
                  width: "12%",
                  height: "",
                  margin: "20px",
                  backgroundColor: "",
                }}
              />
              <img
                src="/assets/webwizards_logo.png"
                alt="..."
                style={{
                  width: "12%",
                  height: "",
                  margin: "20px",
                  backgroundColor: "",
                }}
              />

              <img
                src="/assets/binarybrenz_logo.png"
                alt="..."
                style={{
                  width: "12%",
                  height: "",
                  margin: "20px",
                }}
              />
              <img
                src="/assets/vps_logo.png"
                alt="..."
                style={{
                  width: "12%",
                  height: "",
                  margin: "20px",
                  backgroundColor: "",
                }}
              />
              <img
                src="/assets/webwizards_logo.png"
                alt="..."
                style={{
                  width: "12%",
                  height: "",
                  margin: "20px",
                  backgroundColor: "",
                }}
              />
              <img
                src="/assets/vps_logo.png"
                alt="..."
                style={{
                  width: "12%",
                  height: "",
                  margin: "20px",
                  backgroundColor: "",
                }}
              />
              <img
                src="/assets/binarybrenz_logo.png"
                alt="..."
                style={{
                  width: "12%",
                  height: "",
                  margin: "20px",
                }}
              />
              <img
                src="/assets/vps_logo.png"
                alt="..."
                style={{
                  width: "12%",
                  height: "",
                  margin: "20px",
                  backgroundColor: "",
                }}
              />
              <img
                src="/assets/webwizards_logo.png"
                alt="..."
                style={{
                  width: "12%",
                  height: "",
                  margin: "20px",
                  backgroundColor: "",
                }}
              />

              <img
                src="/assets/binarybrenz_logo.png"
                alt="..."
                style={{
                  width: "12%",
                  height: "",
                  margin: "20px",
                }}
              />
              <img
                src="/assets/vps_logo.png"
                alt="..."
                style={{
                  width: "12%",
                  height: "",
                  margin: "20px",
                  backgroundColor: "",
                }}
              />
              <img
                src="/assets/vps_logo.png"
                alt="..."
                style={{
                  width: "12%",
                  height: "",
                  margin: "20px",
                  backgroundColor: "",
                }}
              />
            </Box>
          </Box>
        </Box>

        {/* <Box
          sx={{
            height: "auto",
            width: "90%",
            // display: "flex",
            // flexDirection: "column",
            //backgroundImage: `linear-gradient(to right,rgba(0,15,45,.7) 40%,rgba(0, 5, 14,.7))`,
          }}
        >
          <Box
            sx={{
              height: "10dvh",
              width: "90%",
              display: "flex",
              flexDirection: "column",
              fontSize: "3rem",
              fontFamily: "var(--secular-font)",
              fontWeight: "900",
              justifyContent: "center",
              alignItems: "start",
              marginLeft: "6rem",
              marginBottom: "6rem",
              //backgroundImage: `linear-gradient(to right,rgb(0,15,45) 40%,rgb(1, 1, 1 ))`,
              //color: "#00f860",
              //color: "rgb(0,15,45)",
              color: "#eaf4fc",
            }}
          >
            CardOverlap
          </Box>
          <CardOverlap />
        </Box>
        <Box
          sx={{
            height: { xs: "auto", md: "100dvh" },
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "45dvh",
            // backgroundImage: `linear-gradient(to right,rgba(0,15,45,.7) 40%,rgba(0, 5, 14,.7))`,
          }}
        >
          <Box
            sx={{
              height: "10dvh",
              width: "90%",
              display: "flex",
              flexDirection: "column",
              fontSize: "3rem",
              fontFamily: "var(--secular-font)",
              fontWeight: "900",
              justifyContent: "center",
              alignItems: "end",
              marginRight: "6rem",
              //backgroundImage: `linear-gradient(to right,rgb(0,15,45) 40%,rgb(1, 1, 1 ))`,
              //color: "#00f860",
              //color: "rgb(0,15,45)",
              color: "#eaf4fc",
            }}
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2 }}
            >
              What IS Dark Pattren?
            </motion.span>
          </Box>
          <Grid container>
            <Grid container>
              <Grid item md={4}>
                <CardFlip message={"Dark Pattren 1"} />
              </Grid>
              <Grid item md={4}>
                <CardFlip message={"Dark Pattren 2"} />
              </Grid>
              <Grid item md={4}>
                <CardFlip message={"Dark Pattren 3"} />
              </Grid>
            </Grid>
            <Grid container spacing={4}>
              <Grid item md={4}>
                <CardFlip message={"Dark Pattren 4"} />
              </Grid>
              <Grid item md={4}>
                <CardFlip message={"Dark Pattren 5"} />
              </Grid>
              <Grid item md={4}>
                <CardFlip message={"Dark Pattren 6"} />
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Box
          sx={{
            marginTop: "20dvh",
            height: "auto",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            //backgroundImage: `linear-gradient(to top,rgb(0,15,45) 40%,rgb(0, 5, 14))`,
            //backgroundColor: "rgba(0,0,0,.5)",
          }}
        >
          <Box
            sx={{
              height: "60dvh",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              //backgroundColor: "rgb(0, 153, 255)",
              // backgroundImage: `linear-gradient(to bottom,rgb(0,15,45) 40%,rgb(0, 5, 14))`,
              margin: "7rem",
              background: "rgba(255,255,255,.1)",
              boxShadow: "0px 15px 35px #9c27b0",
              borderRadius: "50px",
              border: "2px solid rgba (156,39,176,1)",
              borderLeft: "5px solid rgba (156,39,176,1)",
              borderBottom: "5px solid rgba (156,39,176,1)",
              backdropFilter: "blur(10px)",
              marginBottom: 0,
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
                    color: "white",
                    fontStyle: "revert-layer",
                    fontSize: "2.5rem",
                    fontWeight: "bold",
                  }}
                >
                  V-TENET
                  <Box
                    sx={{
                      fontSize: "1.2rem",
                      backgroundColor: "transparent",
                      marginLeft: "2rem",
                    }}
                  >
                    <form
                      style={{
                        paddingTop: "2rem",
                        display: "flex",
                        padding: ".5rem",
                      }}
                    >
                      <input type="email" placeholder="Enter your mail" />
                    </form>
                  </Box>
                  <Link href="/signup">
                    <Button
                      sx={{
                        color: "white",
                        fontSize: "1rem",
                        fontWeight: "bold",
                        borderRadius: "1rem",
                        border: ".1rem solid cyan ",
                        padding: ".5rem",
                        mt: 2,
                      }}
                    >
                      <MdOutlineAttachEmail color="#6d147d" fill="white" />
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
                    alignItems: "center",
                    flexDirection: "column",
                    backgroundColor: "",
                    color: "white",
                    fontStyle: "revert-layer",
                    fontSize: "1.7rem",
                  }}
                >
                  Support
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
                    Help<br></br>Social Media <br></br> Contact
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <Box
              sx={{
                color: "white",
                marginTop: "10rem",
                borderBottom: ".1rem solid #2B1B42",
                fontFamily: "var(--secular-font)",
                fontSize: "1.2rem",
              }}
            >
              © V-Tenet 2024.
            </Box>
          </Box> 
        </Box>*/}
      </Box>
    </>
  );
};

export default LandingPage;
