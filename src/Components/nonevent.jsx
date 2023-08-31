import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions, Grid, Box } from "@mui/material";
import Withoutlogin from "./Navbar/Withoutlogin";
import Footer from "./Navbar/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from "@mui/material/CircularProgress";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import ClientConfig from "./client";
import Myaccountnav from "./Navbar/myaccountnav";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import EastIcon from "@mui/icons-material/East";
export default function Nonevent() {
  let navigate = useNavigate();
  const siteUrl = ClientConfig.siteUrl;
  const [open, setOpen] = useState(false);
  const [data, setData] = useState("");
  const [user, setUser] = useState("");
  const [event_id, setid] = useState("");
  const [mylink, setMylink] = useState();
  const [status, setStatus] = useState();

  const LoaderClose = () => {
    setOpen(false);
  };
  const LoaderOpen = () => {
    setOpen(true);
  };

  const LogOut = () => {
    localStorage.removeItem("email");
    localStorage.clear();
    navigate(`/`);
  };
  return (
    <>
      <Myaccountnav />

      <Box
        sx={{
          display: { lg: "flex", xs: "block" },
          justifyContent: "center",
          alignItems: "center",
          height: { lg: "100vh", xs: "80vh" },
          pt: { xs: 20, lg: 1 },
        }}
      >
        <Card
          sx={{
            maxWidth: 345,
            mx: 2,
            py: 2,
            boxShadow:
              "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
            border: "2px solid #000",
            mb: 5,
            borderRadius: "5px",
          }}
        >
          <center>
            <CardMedia
              component="img"
              image="../warning.png"
              alt="green iguana"
              sx={{ width: "100px" }}
            />
          </center>
          <CardContent sx={{ textAlign: "center" }}>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              fontWeight="bold"
            >
              Event not found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Currently, no events or speaker sessions are found in your course
              for the next 30 minutes
            </Typography>
          </CardContent>

          <center>
            {" "}
            <Button
              size="small"
              color="error"
              variant="contained"
              onClick={LogOut}
            >
              Logout
            </Button>
          </center>
        </Card>
      </Box>
    </>
  );
}
