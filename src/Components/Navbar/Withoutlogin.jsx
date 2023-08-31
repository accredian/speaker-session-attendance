import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import logo from '../images/accredain.webp';

import {

  Box,
  Button,
  Grid,
  CardMedia,

} from "@mui/material";


function ElevationScroll(props) {
  const { children, window } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,

  window: PropTypes.func,
};

export default function Withoutlogin(props) {
const [anchorEl, setAnchorEl] = useState(null)
  const [noanchorEl, setNoanchorEl] = useState(null);

  const notifictionClick = (event) => {
    setNoanchorEl(noanchorEl ? null : event.currentTarget);
  };

  const opens = Boolean(noanchorEl);
  const id = opens ? "simple-popper" : undefined;

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };



  useEffect(() => {
    // console.log(auth)


  
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar sx={{ background: "#000",paddingRight:"0px!important" }}>
          <Toolbar>
            <Grid item lg={12} container>
              <Grid item lg={2}>
                <Box display="flex">
                  <Box>
                    <CardMedia
                      component="img"
                      image={logo}
                      alt="green iguana"
                      sx={{
                        display: { xs: "block", lg: "block" },
                        width: 120,
                        py: 1,
                        objectFit: "unset",
                      }}
                    />
               </Box>
          
               </Box>
               </Grid>
               </Grid>
               </Toolbar>
               </AppBar>
               </ElevationScroll>
               </React.Fragment>
       
   
  );
}
