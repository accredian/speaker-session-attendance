import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import PersonIcon from '@mui/icons-material/Person';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import PolicyIcon from '@mui/icons-material/Policy';
import SyncLockIcon from '@mui/icons-material/SyncLock';
import Logout from "@mui/icons-material/Logout";
import { Link, useNavigate, } from "react-router-dom";
import axios from "axios";
import logo from '../images/accredain.webp';
import {
  Typography,
  Button,
  Box,
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

export default function Myaccountnav(props) {
const [anchorEl, setAnchorEl] = useState(null)
  const [noanchorEl, setNoanchorEl] = useState(null);
  const [count ,setCount] =useState("");

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
  let navigate = useNavigate();

  const LogOut = () => {
    localStorage.removeItem("email");
    localStorage.clear();
    navigate(`/`);
  };
  useEffect(() => {
    // console.log(auth)
 var count = localStorage.getItem("count");
 setCount(count);

setInterval(() => {
  console.log("hii");
  localStorage.removeItem("email");
  localStorage.clear();
  navigate(`/`);
}, 3600000);
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar sx={{ background: "#000",paddingRight:"0px!important" }}>
          <Toolbar>
            <Grid item lg={12} container>
              <Grid item lg={6}>
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
               <Grid item lg={6} >
               <Box
                            
                              sx={{
                                float:{lg:"right",xs:"left"} ,
                                border: "1px solid #fff",
                                borderRadius: "8px",
                                py: 0.4,
                                px: 1,
                                ml:{lg:3,xs:16},
                                display: { xs: "block", lg: "block" }
                              }}
                            >
               <Typography
                              sx={{
                                fontSize: "1rem",
                                marginBottom: "0.5rem !important",
                                mx: 2,
                                pt: 1,
                                fontWeight: "bold",
                                color: "#fff",
                                float:"right",
                                cursor:"pointer",
                              }}
                              onClick={LogOut}
                            >
                              Logout
                            </Typography>
            
            </Box>
            </Grid>
               </Grid>
               </Toolbar>
               </AppBar>
               </ElevationScroll>
               </React.Fragment>
       
   
  );
}
