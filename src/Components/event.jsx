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
export default function Event() {
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
  useEffect(() => {
    LoaderOpen();
    console.log(localStorage.getItem("email"));
    const sendData = {
      email: localStorage.getItem("email"),
    };
    const options = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    };
    axios.post(`${siteUrl}/data/webinar`, sendData, options).then((result) => {
      if (result.data.status == "404") {
        navigate(`/Nonevent`);
        LoaderClose();
      } else {
        console.log(result.data, "erooll");
        setData(result.data);
        LoaderClose();
      }
    });
  }, []);
  const options = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  };
  const handleSubmit = (user_id, event_id) => {
    LoaderOpen();

    const sendData2 = {
      user_id: user_id,
      event_id: event_id,
    };
    axios
      .post(
        `${siteUrl}/calendar/capture_attendance`,
        JSON.stringify(sendData2),
        options
      )
      .then((result) => {
        LoaderClose();
        // console.log(result,"kk")
        window.open(result.data, "_blank");
        setMylink(result.data);
      });
  };
  // const sandlink = () => {
  //   navigate(`/Myaccount`);
  // };

  if (data) {
    return (
      <>
        <Myaccountnav />
        <Box display="flex" sx={{ float: "right", mr: 2 }}>
          <Typography
            sx={{
              mt: 10,
              mr: 1,
              fontWeight: "bold",
              fontSize: "1rem",
              cursor: "pointer",
              "&:hover": {
                color: "#0047b3",
                cursor: "pointer",
              },
              textShadow:
                "0 1px 0 #ccc,0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9,0 5px 0 #aaa,0 6px 1px rgba(0,0,0,.1),0 0 5px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.3),0 3px 5px rgba(0,0,0,.2),0 5px 10px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.2),0 20px 20px rgba(0,0,0,.15);",

              mb: 5,
            }}
            onClick={sandlink}
          >
            {" "}
            Go to Calendar
          </Typography>
          <EastIcon
            sx={{
              fontWeight: "bold",
              mt: 10,
              textShadow:
                "0 1px 0 #ccc,0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9,0 5px 0 #aaa,0 6px 1px rgba(0,0,0,.1),0 0 5px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.3),0 3px 5px rgba(0,0,0,.2),0 5px 10px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.2),0 20px 20px rgba(0,0,0,.15);",
              "&:hover": {
                color: "#0047b3",
                cursor: "pointer",
              },
            }}
          />
        </Box>

        <Box
          sx={{
            display: { lg: "flex", xs: "block" },
            justifyContent: "center",
            alignItems: "center",
            height: { lg: "100vh", xs: "80vh" },
            pt: { xs: 20, lg: 1 },
          }}
        >
          {data &&
            data.map((data) => (
              <Card
                sx={{
                  maxWidth: 345,
                  mx: 2,
                  py: 2,
                  boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                  mb: 5,
                }}
              >
                <center>
                  <CardMedia
                    component="img"
                    image="../live.png"
                    alt="green iguana"
                    sx={{ width: "100px" }}
                  />
                </center>
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography gutterBottom variant="h5" component="div">
                    {data.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {data.description}
                  </Typography>
                </CardContent>

                <center>
                  {" "}
                  <Button
                    size="small"
                    color="success"
                    variant="contained"
                    onClick={() => handleSubmit(data.user_id, data.event_id)}
                  >
                    Go to Class
                  </Button>
                </center>
              </Card>
            ))}
        </Box>
      </>
    );
  } else {
    return (
      <Box sx={{ mt: 10, display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  }
}
