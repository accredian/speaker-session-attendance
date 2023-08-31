import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Box,
  Paper,
  Container,
  Grid,
  Backdrop,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Withoutlogin from "./Navbar/Withoutlogin";
import Footer from "./Navbar/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from "@mui/material/CircularProgress";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import ClientConfig from "./client";
import { decode as atob, encode as btoa } from "base-64";

export default function NewLogin() {
  const { id } = useParams();
  function clearConsole() {
    if (window.console || window.console.firebug) {
      console.clear();
    }
  }
  var CryptoJS = require("crypto-js");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const LoaderClose = () => {
    setOpen(false);
  };
  const LoaderOpen = () => {
    setOpen(true);
  };
  let navigate = useNavigate();
  const siteUrl = ClientConfig.siteUrl;
  console.log(id);
  // if (id) {
  //   const sendData = {
  //     email: atob(id),
  //   };
  //   const options = {
  //     headers: {
  //       "Access-Control-Allow-Origin": "*",
  //       "Content-Type": "application/json",
  //     },
  //   };
  //   axios
  //     .post(`${siteUrl}/data`, sendData, options)
  //     .then((result) => {
  //       // console.log(res.data, "erooll");

  //       navigate(`/Myaccount`);
  //       if (result.data.count == "2") {
  //         localStorage.setItem("count", result.data.count);
  //         localStorage.setItem("email", atob(id));
  //         navigate(`/Myaccount`);
  //         clearConsole();
  //       } else if (result.data.count == "1") {
  //         localStorage.setItem("enrol_id", result.data.enrol_id);
  //         localStorage.setItem("user_id", result.data.user_id);
  //         localStorage.setItem("program_id", result.data.program_id);
  //         localStorage.setItem("category", result.data.category);
  //         localStorage.setItem("count", result.data.count);

  //         navigate(`/Calendar`);
  //         clearConsole();
  //       }
  //       LoaderClose();
  //     })
  //     .catch((err) => {
  //       toast.error("Email and Password are not matched", {
  //         position: "top-right",
  //         autoClose: 3000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "colored",
  //       });
  //       console.log(err);
  //       LoaderClose();
  //     });
  // }
  const HandleLogin = (e) => {
    LoaderOpen();
    e.preventDefault();

    const options = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    };
    const loginData = {
      username: username,
      password: CryptoJS.AES.encrypt(
        password,
        "INSAID@login$2022@$newweb$@"
      ).toString(),
    };
    axios
      .post(`${siteUrl}/login`, JSON.stringify(loginData), options, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data, "auth");
        window.localStorage.setItem("email", username);
        navigate(`/Event`);
      })

   
  };

  // console.log(sendData);
  if (id) {
    return <CircularProgress />;
  } else {
    return (
      <>
        <Box sx={{ pt: 28 }}>
          <ToastContainer />
          <Container fixed>
            <Box>
              <Withoutlogin />
              <Box sx={{ alignItems: "center" }}>
                <Grid container spacing={4} justifyContent="center">
                  <Backdrop
                    sx={{
                      color: "#fff",
                      zIndex: (theme) => theme.zIndex.drawer + 1,
                    }}
                    open={open}
                  >
                    <CircularProgress color="inherit" />
                  </Backdrop>
                  <Grid item lg={4} sx={{ pb: 4 }}>
                    <Paper elevation={3}>
                      <Box>
                        <Typography sx={{ textAlign: "center", py: 2 }}>
                          Login
                        </Typography>
                      </Box>
                      <Box sx={{ mx: 2, py: 5 }}>
                        <form onSubmit={HandleLogin}>
                          <TextField
                            id="email"
                            label="Email"
                            variant="standard"
                            type="email"
                            name="username"
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                            fullWidth
                            sx={{ mb: 2 }}
                          />
                          {/* <TextField
                          id="password"
                          label="Password"
                          variant="standard"
                          type="password"
                          name="password"
                          onChange={(e) => setPassword(e.target.value)}
                          value={password}
                          fullWidth
                          sx={{ mb: 2 }}
                        /> */}
                          <FormControl
                            sx={{ mb: 2 }}
                            variant="standard"
                            fullWidth
                          >
                            <InputLabel htmlFor="standard-adornment-password">
                              Password
                            </InputLabel>
                            <Input
                              id="standard-adornment-password"
                              type={showPassword ? "text" : "password"}
                              name="password"
                              onChange={(e) => setPassword(e.target.value)}
                              value={password}
                              endAdornment={
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                  >
                                    {showPassword ? (
                                      <VisibilityOff />
                                    ) : (
                                      <Visibility />
                                    )}
                                  </IconButton>
                                </InputAdornment>
                              }
                            />
                          </FormControl>
                          <Button variant="contained" fullWidth type="submit">
                            Login
                          </Button>
                        </form>
                      </Box>
                    </Paper>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </Box>
        <Footer />
      </>
    );
  }
}
