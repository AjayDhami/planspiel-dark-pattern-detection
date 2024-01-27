import React from "react";
import "./CardOverlap.css";
import { Grid, Box } from "@mui/material";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import ViewCarouselRoundedIcon from "@mui/icons-material/ViewCarouselRounded";
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
const CardOverlap = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".cards-overlap",
        pin: true,
        pinSpacing: true,
        start: "left-=120px left",
        end: "+=2000",
        scrub: 1,
      },
    });

    timeline.addLabel("card1");
    timeline.to(".card-1", {
      xPercent: 0,
      opacity: 1,
    });

    timeline.from(".card-2", {
      xPercent: 2,
      opacity: 0,
    });

    timeline.addLabel("card2");
    timeline.to(
      ".card-1",
      {
        scale: 0.95,
        xPercent: -0.5,
        opacity: 0.5,
      },
      "-=0.3"
    );

    timeline.to(".card-2", {
      xPercent: 0,
      opacity: 1,
    });

    timeline.from(".card-3", {
      xPercent: 2,
      opacity: 0,
    });

    timeline.addLabel("card3");

    timeline.to(
      ".card-2",
      {
        scale: 0.98,
        xPercent: -0.4,
        opacity: 0.6,
      },
      "-=0.3"
    );

    timeline.to(".card-3", {
      xPercent: 0,
      opacity: 1,
    });

    timeline.from(".card-4", {
      xPercent: 2,
      opacity: 0,
    });

    timeline.addLabel("card4");

    timeline.to(
      ".card-3",
      {
        scale: 0.99,
        xPercent: -0.3,
        opacity: 0.7,
      },
      "-=0.3"
    );

    timeline.to(".card-4", {
      xPercent: 0,
      opacity: 1,
    });
  }, []);

  return (
    <div className="main">
      <div className="cards-overlap">
        <div className="card-overlap card-1">
          <Grid container>
            <Grid
              item
              md={7}
              sx={{
                backgroundColor: "transparent",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                overflow: "hidden",
                color: "white ",
                fontSize: "1.7rem",
              }}
            >
              Write Some Content 1
              <Box
                sx={{
                  backgroundColor: "transparent",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "1rem",
                }}
              >
                You will get everything from the beginning of your <br></br>
                journey until you get an internship or a full-time job.
              </Box>
            </Grid>
            <Grid
              item
              md={5}
              sx={{
                backgroundColor: "white",
                height: "60dvh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderTopRightRadius: "3rem",
                borderBottomRightRadius: "3rem",
              }}
            >
              <ViewCarouselRoundedIcon
                sx={{
                  color: "purple",
                  width: "6rem",
                  height: "6rem",
                }}
              ></ViewCarouselRoundedIcon>
            </Grid>
          </Grid>
        </div>
        <div className="card-overlap card-2">
          <Grid container>
            <Grid
              item
              md={7}
              sx={{
                backgroundColor: "transparent",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                color: "yellow ",
                fontSize: "1.7rem",
              }}
            >
              Write Some Content 2
              <Box
                sx={{
                  backgroundColor: "transparent",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "1rem",
                }}
              >
                You will get everything from the beginning of your <br></br>
                journey until you get an internship or a full-time job.
              </Box>
            </Grid>
            <Grid
              item
              md={5}
              sx={{
                backgroundColor: "white",
                height: "60dvh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderTopRightRadius: "3rem",
                borderBottomRightRadius: "3rem",
              }}
            >
              <ViewCarouselRoundedIcon
                sx={{
                  color: "yellow",
                  width: "6rem",
                  height: "6rem",
                }}
              ></ViewCarouselRoundedIcon>
            </Grid>
          </Grid>
        </div>
        <div className="card-overlap card-3">
          <Grid container>
            <Grid
              item
              md={7}
              sx={{
                backgroundColor: "transparent",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                color: "orange ",
                fontSize: "1.7rem",
              }}
            >
              Write Some Content 3
              <Box
                sx={{
                  backgroundColor: "transparent",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "1rem",
                }}
              >
                You will get everything from the beginning of your <br></br>
                journey until you get an internship or a full-time job.
              </Box>
            </Grid>
            <Grid
              item
              md={5}
              sx={{
                backgroundColor: "white",
                height: "60dvh",
                borderTopRightRadius: "3rem",
                borderBottomRightRadius: "3rem",
              }}
            >
              <Grid
                item
                md={5}
                sx={{
                  backgroundColor: "white",
                  height: "60dvh",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderTopRightRadius: "3rem",
                  borderBottomRightRadius: "3rem",
                }}
              >
                <ViewCarouselRoundedIcon
                  sx={{
                    color: "orange",
                    width: "6rem",
                    height: "6rem",
                  }}
                ></ViewCarouselRoundedIcon>
              </Grid>
            </Grid>
          </Grid>
        </div>
        <div className="card-overlap card-4">
          <Grid container>
            <Grid
              item
              md={7}
              sx={{
                backgroundColor: "transparent",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                color: "green ",
                fontSize: "1.7rem",
              }}
            >
              Write Some Content 4
              <Box
                sx={{
                  backgroundColor: "transparent",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "1rem",
                }}
              >
                You will get everything from the beginning of your <br></br>
                journey until you get an internship or a full-time job.
              </Box>
            </Grid>
            <Grid
              item
              md={5}
              sx={{
                backgroundColor: "white",
                height: "60dvh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderTopRightRadius: "3rem",
                borderBottomRightRadius: "3rem",
              }}
            >
              <ViewCarouselRoundedIcon
                sx={{
                  color: "green",
                  width: "6rem",
                  height: "6rem",
                }}
              ></ViewCarouselRoundedIcon>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default CardOverlap;
