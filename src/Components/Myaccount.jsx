import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Box,
  Paper,
  Container,
    Backdrop,
  Grid,
  CardMedia,
} from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
// import Loginnav from "./Navbar/Loginnav";
import calendarimg from "./images/schedule.png";
import Footer from "./Navbar/Footer";
// import Withoutlogin from "./Navbar/Withoutlogin";
import Myaccountnav from "./Navbar/myaccountnav";
import axios from "axios";
import ClientConfig from "./client";
import CircularProgress from "@mui/material/CircularProgress";
const Myaccount = () => {
  const { id } = useParams();
  const [user, setUser] = useState("");
  const [enrooll, setEnrooll] = useState("");
  const [open, setOpen] = useState(false);
  const LoaderClose = () => {
    setOpen(false);
  };
  const LoaderOpen = () => {
    setOpen(true);
  };
  let navigate = useNavigate();
  const [program, setData] = useState("");
  const options = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  };

  const sendData = {
    email: localStorage.getItem("email"),
  };
  const siteUrl = ClientConfig.siteUrl;
  useEffect(() => {
    // console.log(auth)
    LoaderOpen();
    var enrooll = localStorage.getItem("count");
    setEnrooll(enrooll);

    axios
      .post(`${siteUrl}/data/fetchinfo `, sendData, options)
      .then((result) => {
        setData(result.data);
        console.log(result.data);
        LoaderClose();
      });
  }, []);
  const handleClickOpen = (enrol_id, category, program_id, user_id) => {
    console.log(enrol_id, category);
    window.localStorage.setItem("enrol_id", enrol_id);
    window.localStorage.setItem("user_id", user_id);
    window.localStorage.setItem("category", category);
    window.localStorage.setItem("program_id", program_id);
    navigate(`/Calendar`);
  };

  return (
    <>
      <Myaccountnav />
      <Backdrop
                    sx={{
                      color: "#fff",
                      zIndex: (theme) => theme.zIndex.drawer + 1,
                    }}
                    open={open}
                  >
                    <CircularProgress color="inherit" />
                  </Backdrop>
      <Box sx={{ backgroundColor: "#f3f6f9", pb: 10.1 }}>
        <Box sx={{ pt: 10, height: 520 }}>
          <Container fixed>
            <Box sx={{ mt: 5 }}>
              <Typography sx={{ textAlign: "center", fontSize: "1.5rem" }}>
                CHOOSE YOUR CALENDAR
              </Typography>
            </Box>
            <Grid container rowSpacing={1} sx={{ justifyContent: "center" }}>
              {program &&
                program.map(({ enrol_id, program_id, category, user_id }) => {
                  if (
                    program_id == "1" ||
                    program_id == "10" ||
                    program_id == "29" ||
                    program_id == "33" ||
                    program_id == "40" ||
                    program_id == "41" ||
                    program_id == "2" ||
                    program_id == "11" ||
                    program_id == "4" ||
                    program_id == "13" ||
                    program_id == "3" ||
                    program_id == "12" ||
                    program_id == "19" ||
                    program_id == "20" ||
                    program_id == "21" ||
                    program_id == "29" ||
                    program_id == "33"
                  ) {
                    return (
                      <Grid item lg={4} md={12} sm={12} sx={{ mx: 2 }}>
                        <center>
                          <Box
                            sx={{
                              boxShadow:
                                "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                              height: "161px",
                              width: "200px",
                              borderRadius: "25px",
                              backgroundColor: "#FBAB7",
                              backgroundImage:
                                "linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%)",
                              mt: 12,
                            }}
                            onClick={() =>
                              handleClickOpen(
                                enrol_id,
                                category,
                                program_id,
                                user_id,
                                user_id
                              )
                            }
                          >
                            <center>
                              {" "}
                              <CardMedia
                                component="img"
                                image={calendarimg}
                                alt="green iguana"
                                sx={{ width: "128px", ml: 0.5 }}
                              />
                            </center>
                            <Typography
                              sx={{
                                textAlign: "center",
                                color: "#fff",
                                fontWeight: "bold",
                              }}
                            >
                              DS Calendar
                            </Typography>
                          </Box>
                        </center>
                      </Grid>
                    );
                  }

                  if (
                    program_id == "14" ||
                    program_id == "16" ||
                    program_id == "15" ||
                    program_id == "17" ||
                    program_id == "18" ||
                    program_id == "26" ||
                    program_id == "22" ||
                    program_id == "34" ||
                    program_id == "35" ||
                    program_id == "36" ||
                    program_id == "37" ||
                    program_id == "42" ||
                    program_id == "43" ||
                    program_id == "44" ||
                    program_id == "47"
                  ) {
                    return (
                      <Grid item lg={4} md={12} sm={12} sx={{ mx: 2 }}>
                        <center>
                          <Box
                            sx={{
                              boxShadow:
                                "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                              height: "161px",
                              width: "200px",
                              borderRadius: "25px",
                              backgroundColor: "#08AEEA",
                              backgroundImage:
                                "linear-gradient(0deg, #08AEEA 0%, #2AF598 100%)",
                              mt: 12,
                            }}
                            onClick={() =>
                              handleClickOpen(
                                enrol_id,
                                category,
                                program_id,
                                user_id
                              )
                            }
                          >
                            <center>
                              {" "}
                              <CardMedia
                                component="img"
                                image={calendarimg}
                                alt="green iguana"
                                sx={{ width: "128px", ml: 0.5 }}
                              />
                            </center>
                            <Typography
                              sx={{
                                textAlign: "center",
                                color: "#fff",
                                fontWeight: "bold",
                              }}
                            >
                              PM Calendar
                            </Typography>
                          </Box>
                        </center>
                      </Grid>
                    );
                  }

                  if (program_id == "38" || program_id == "39") {
                    return (
                      <Grid item lg={4} md={12} sm={12} sx={{ mx: 2 }}>
                        <center>
                          <Box
                            sx={{
                              boxShadow:
                                "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                              height: "161px",
                              width: "200px",
                              borderRadius: "25px",
                              backgroundColor: "#08AEEA",
                              backgroundImage:
                                "linear-gradient(0deg, #08AEEA 0%, #2AF598 100%)",
                              mt: 12,
                            }}
                            onClick={() =>
                              handleClickOpen(
                                enrol_id,
                                category,
                                program_id,
                                user_id
                              )
                            }
                          >
                            <center>
                              {" "}
                              <CardMedia
                                component="img"
                                image={calendarimg}
                                alt="green iguana"
                                sx={{ width: "128px", ml: 0.5 }}
                              />
                            </center>
                            <Typography
                              sx={{
                                textAlign: "center",
                                color: "#fff",
                                fontWeight: "bold",
                              }}
                            >
                              XLRI Calendar
                            </Typography>
                          </Box>
                        </center>
                      </Grid>
                    );
                  }
                })}
            </Grid>
          </Container>
        </Box>
      </Box>
      <Box
        sx={{
          background: "#262626",
          paddingRight: "0px!important",
          py: 2,
          display: { xs: "none", lg: "block" },
        }}
      >
        <Grid item lg={10}>
          <Box sx={{}}>
            <Typography sx={{ textAlign: "center", color: "#fff", mr: 3 }}>
              © 2023 Accredian. All Rights Reserved
            </Typography>
          </Box>
        </Grid>
      </Box>
      <Box
        sx={{
          background: "#262626",
          paddingRight: "0px!important",
          py: 2,
          display: { xs: "block", lg: "none" },
        }}
      >
        <Grid item xs={12}>
          <Box>
            <Typography sx={{ textAlign: "center", color: "#fff", mr: 3 }}>
              © 2023 Accredian. All Rights Reserved
            </Typography>
          </Box>
        </Grid>
      </Box>
    </>
  );
};
export default Myaccount;
