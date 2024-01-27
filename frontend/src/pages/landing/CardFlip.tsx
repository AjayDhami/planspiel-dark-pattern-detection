import React from "react";
import "./CardFlip.css";
import { Grid } from "@mui/material";

const CardFlip = (props: {
  message:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | Iterable<React.ReactNode>
    | React.ReactPortal
    | null
    | undefined;
}) => {
  return (
    <div id="wrapper">
      <div id="card-wrapper">
        <div className="card">
          <div className="card-front">
            <div className="card-title"> {props.message}</div>
            <div className="card-para">Hover me to read more.</div>
          </div>
          <div className="card-back">
            <Grid container>
              <Grid item md={6}>
                <div className="card-title">Sample Content Title</div>
                <div className="card-description">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                  vestibulum, velit ac porttitor cursus, sapien enim ultrices
                  ante, aliquam interdum risus dui vel mauris.
                </div>
              </Grid>
              <Grid item md={6}>
                <div className="card-title">Sample Content Title</div>
                <div className="card-description">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                  vestibulum, velit ac porttitor cursus, sapien enim ultrices
                  ante, aliquam interdum risus dui vel mauris.
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </div>
    // <div classNameName="container">
    //   <div classNameName="card">
    //     <div classNameName="front">front</div>
    //     <div classNameName="back">back</div>
    //   </div>
    // </div>
  );
};

export default CardFlip;
