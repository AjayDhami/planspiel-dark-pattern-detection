import React from "react";
import { Box, Grid, IconButton, Stack } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
// import Link from "@mui/material/Link";
// import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { motion } from "framer-motion";
import "./LandingPage.css";
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

          <Grid
            container
            spacing={0}
            height={{
              xs: "inherit",
              md: "auto",
            }}
          >
            <Grid
              item
              md={7}
              xs={12}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2 }}
                className="my-4"
              >
                <h2 className="main-text">Let's Get Started</h2>
              </motion.span>

              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                className="input-box"
              >
                <input type="text" placeholder="Enter Your URL Here......" />
                <button className="search-btn">
                  <SendIcon sx={{ color: "#9fa2a5" }} />
                </button>
              </Box>

              {/* <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              > */}

              {/* <h2 className="main-text1">Your Dark Pattern Detector</h2>
                <span data-text="GotYa!" className="main-text2">
                  GotYa!
                </span> */}

              {/* <Grid item md={8}>
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
                  </Grid> */}
              {/* <Grid item md={4}>
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
                  </Grid> */}
              {/* </Box> */}
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
        <Box
          sx={{
            height: "auto",
            width: "90%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <ServicePage />
        </Box>
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
                  fontSize: "2rem",
                  fontWeight: "bold",
                  textAlign: "center",
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
                Adress
                <Box
                  sx={{
                    height: "auto",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    color: "#cccc",
                    fontSize: "1rem",
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
                    fontSize: "1rem",
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
              marginTop: "1rem",
              borderBottom: ".1rem solid #2B1B42",
              fontFamily: "var(--secular-font)",
              fontSize: "1rem",
              textAlign: "center",
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
