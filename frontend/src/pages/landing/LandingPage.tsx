import React from "react";
import { Box, Grid } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import { motion } from "framer-motion";
import { MdOutlineAttachEmail } from "react-icons/md";
import "./LandingPage.css";
import CardFlip from "./CardFlip";
import CardOverlap from "./CardOverlap";
import NavbarPage from "./NavbarPage";
import ServicePage from "./ServicePage";
import ProcessPage from "./ProcessPage";
import Typography from "@mui/material/Typography";

const LandingPage = () => {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
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

          alignItems: "center",
          flexDirection: "column",
          position: "sticky",
          backgroundImage: `linear-gradient(to left, rgba(2, 24, 77, 0.984), rgba(3, 47, 129, 0.859)),url(${process.env.PUBLIC_URL}/assets/bgimage.svg)`,
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

                <h2 className="main-text1">Your Dark Pattern Detector</h2>
                <span data-text="GotYa!" className="main-text2">
                  GotYa!
                </span>
                <Grid container spacing={4}>
                  <Grid item md={8}>
                    <form
                      className="footer-form"
                      style={{
                        paddingTop: "2rem",
                        display: "flex",
                        padding: "1rem",
                      }}
                    >
                      <input type="email" placeholder="Enter Your URL" />
                    </form>
                  </Grid>
                  <Grid item md={4}>
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
                        Visit Your Website for verification
                      </Button>
                    </Link>
                  </Grid>
                </Grid>
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
            fontSize: { xs: "1.5rem", md: "3rem" },
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
                src="/assets/logo.png"
                alt="..."
                style={{
                  width: "6%",
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
                src="/assets/logo.png"
                alt="..."
                style={{
                  width: "6%",
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
                src="/assets/logo.png"
                alt="..."
                style={{
                  width: "6%",
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
                src="/assets/logo.png"
                alt="..."
                style={{
                  width: "6%",
                  height: "",
                  margin: "20px",
                  backgroundColor: "",
                }}
              />
            </Box>
          </Box>
        </Box>
        <Box>
          <ProcessPage />
        </Box>
        {/* <Box
          sx={{
            height: "auto",
            width: "90%",
            // display: { xs: "none", md: "block-in" },
            // flexDirection: "column",
            //backgroundImage: `linear-gradient(to right,rgba(0,15,45,.7) 40%,rgba(0, 5, 14,.7))`,
          }}
        >
          <Box
            sx={{
              height: "10dvh",
              width: "90%",
              display: { xs: "none", md: "flex" },
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
        </Box> */}
        <Box></Box>
        <Box
          sx={{
            height: "auto",
            width: "90%",
            display: "flex",
            flexDirection: "column",
            // marginTop: "1vw",
            // backgroundImage: `linear-gradient(to right,rgba(0,15,45,.7) 40%,rgba(0, 5, 14,.7))`,
          }}
        >
          <ServicePage />
        </Box>
        {/*<Box
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
        >*/}
        {/* <Box
          sx={{
            height: "30rem",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            //backgroundColor: "rgb(0, 153, 255)",
            // backgroundImage: `linear-gradient(to bottom,rgb(0,15,45) 40%,rgb(0, 5, 14))`,
            margin: "7rem",
            background: "rgba(255,255,255,.1)",
            // boxShadow: "0px 15px 35px #9c27b0",
            // borderRadius: "50px",
            // border: "2px solid rgba (156,39,176,1)",
            // borderLeft: "5px solid rgba (156,39,176,1)",
            // borderBottom: "5px solid rgba (156,39,176,1)",
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
                <Tooltip
                  open={open}
                  onClose={handleClose}
                  onOpen={handleOpen}
                  title={
                    <Box>
                      <Typography
                        variant="body1"
                        sx={{ fontSize: "1rem", padding: 0 }}
                      >
                        This Website is Dark Pattern Free
                      </Typography>
                      <Typography variant="body2" sx={{ fontSize: "0.9rem" }}>
                        Certificate ID: GVBX23GER019
                      </Typography>
                    </Box>
                  }
                  placement="left"
                >
                  <Box
                    sx={{
                      width: "180px",
                      height: "180px",
                      borderRadius: "50%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      border: "2px solid transparent",
                      backgroundImage: `url(${process.env.PUBLIC_URL}/assets/logo.png)`,
                      backgroundSize: "100px 100px",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      backdropFilter: "blur(10px)",
                      backgroundColor: "rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: ".95rem",
                        fontWeight: "900",
                        color: "white",
                        lineHeight: "1.5rem",
                      }}
                    >
                      Certified by
                      <a
                        href="https://v-tenet.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          textDecoration: "underline",
                          color: "inherit",
                        }}
                      >
                        V-TENET
                      </a>
                    </Typography>
                  </Box>
                </Tooltip>
              </Box>
              {/* <Box
                sx={{
                  fontSize: "1.2rem",
                  backgroundColor: "transparent",
                  marginLeft: "2rem",
                }}
              >
                 <form className="footer-form"
                    style={{
                      paddingTop: "2rem",
                      display: "flex",
                      padding: ".5rem",
                    }}
                  >
                    <input type="email" placeholder="Enter your mail" />
                  </form> 
              </Box> */}
        {/* <Link href="/signup">
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
                </Link> */}
        {/*
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
              marginTop: "2rem",
              borderBottom: ".1rem solid #2B1B42",
              fontFamily: "var(--secular-font)",
              fontSize: "1.2rem",
            }}
          >
            © V-Tenet 2024.
          </Box>
        </Box> */}

        <Box
          sx={{
            height: { xs: "53rem", md: "25rem" },
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            background: "rgba(255,255,255,.1)",
            backdropFilter: "blur(10px)",
            marginTop: { xs: "3rem", md: "5rem" },
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  height: { xs: "auto", md: "auto" },
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  color: "white",
                  fontSize: "2rem", // Adjust font size for smaller screens
                  fontWeight: "bold",
                  textAlign: "center", // Center text for smaller screens
                }}
              >
                <Tooltip
                  open={open}
                  onClose={handleClose}
                  onOpen={handleOpen}
                  title={
                    <Box>
                      <Typography
                        variant="body1"
                        sx={{ fontSize: "1rem", padding: 0 }}
                      >
                        This Website is Dark Pattern Free
                      </Typography>
                      <Typography variant="body2" sx={{ fontSize: "0.9rem" }}>
                        Certificate ID: GVBX23GER019
                      </Typography>
                    </Box>
                  }
                  placement="left"
                >
                  <Box
                    sx={{
                      width: "180px",
                      height: "180px",
                      borderRadius: "50%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      border: "2px solid transparent",
                      backgroundImage: `url(${process.env.PUBLIC_URL}/assets/logo.png)`,
                      backgroundSize: "100px 100px",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      backdropFilter: "blur(10px)",
                      backgroundColor: "rgba(0, 0, 0, 0.1)",
                      marginTop: { xs: "3rem", md: "1rem" },
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: ".95rem",
                        fontWeight: "900",
                        color: "white",
                        lineHeight: "1.5rem",
                      }}
                    >
                      Certified by
                      <a
                        href="https://v-tenet.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          textDecoration: "underline",
                          color: "inherit",
                        }}
                      >
                        V-TENET
                      </a>
                    </Typography>
                  </Box>
                </Tooltip>
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
                  color: "white",
                  marginTop: { xs: "3rem", md: "1rem" },
                  fontSize: "1.5rem",
                  textAlign: "center",
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
                    color: "#cccc",
                    fontSize: "1rem", // Adjust font size for smaller screens
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
                  color: "white",
                  fontSize: "1.5rem",
                  textAlign: "center",
                  marginTop: { xs: "3rem", md: "1rem" },
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
                    color: "#cccc",
                    fontSize: "1rem", // Adjust font size for smaller screens
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
              marginTop: "1rem", // Adjust margin for smaller screens
              borderBottom: ".1rem solid #2B1B42",
              fontFamily: "var(--secular-font)",
              fontSize: "1rem", // Adjust font size for smaller screens
              textAlign: "center", // Center text for smaller screens
            }}
          >
            © V-Tenet 2024.
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default LandingPage;
