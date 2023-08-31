import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Box,
  Paper,
  Grid,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Popover,
  CardMedia,
  Backdrop,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import CloseIcon from "@mui/icons-material/Close";
import MessageIcon from "@mui/icons-material/Message";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import liveimg from "./images/live.png";
import liveno from "./images/livno.png";
import moment from "moment";
import CancelIcon from "@mui/icons-material/Cancel";
import { decode as atob, encode as btoa } from "base-64";
import Loginnav from "./Navbar/Loginnav";
import "./calender.css";
import axios from "axios";
import Footer from "./Navbar/Footer";
import ClientConfig from "./client";
import CircularProgress from '@mui/material/CircularProgress';
import Swal from 'sweetalert2';
const Calendar = () => {
  const [user, setUser] = useState("");
  const [enrol_id, setEnrol_id] = useState("");
  const [category, setCategory] = useState("");
  const [newevent, setEvents] = useState("");
  const [open, setOpen] = useState(false);
  const [loopen, setLoOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState();
  const [description, setDescription] = useState();
  const [startdate, setDtartdate] = useState();
  const [starttime, setTime] = useState();
  const [endtime, setTimeend] = useState();
  const [status, setStatus] = useState();
  const [urls, setUrls] = useState();
  const [today, setToday] = useState();
  const [mylink, setMylink] = useState();
  const [curtimeseconds, setCs] = useState();
  const [eventdate, setEd] = useState();
  const [starttimeseconds, setSts] = useState();
  const [endtimeseconds, setEts] = useState();
  const [event_id, setid] = useState();
  let navigate = useNavigate();
  const siteUrl = ClientConfig.siteUrl;
  const options = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  };
  const sendData = {
    enrol_id: localStorage.getItem("enrol_id"),
  };
  useEffect(() => {
    // console.log(auth)
    var user_id = localStorage.getItem("user_id");
    var enrol_id = localStorage.getItem("enrol_id");
    var category = localStorage.getItem("category");
    setUser(user_id);
    setEnrol_id(enrol_id);
    setCategory(category);
    LoaderOpen();
    axios
      .post(`${siteUrl}/calendar/fetchevents`,
        JSON.stringify(sendData),
        options
      )
      .then((result) => {
        if(result.data.status == 400){
          Swal.fire({
            title: "warning",
            text: "Events are not available",
            icon: "warning",
            confirmButtonText: "OK",
          });
          LoaderClose();
        }else{
          setEvents(result.data);
          LoaderClose();
        }
    
      });
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = (arg) => {
    arg.jsEvent.preventDefault();
    setOpen(true);
    setModalTitle(arg.event.title);
    setDescription(arg.event.extendedProps.description);
    setDtartdate(moment(arg.event.start).format("Do MMM, YYYY"));
    setTime(moment(arg.event.start).format("hh:mm a"));
    setTimeend(moment(arg.event.end).format("hh:mm a"));
    setStatus(arg.event.extendedProps.status);
    setUrls(arg.event.url);
    setid(arg.event.id)
   
    // var newlink = btoa("id=" + arg.event.id + "&user_id=" + user);
    // setMylink("https://www.Accredian.com/sessionlink.php?token=" + newlink);
    setToday(moment().format("DD-MM-Y"));
    var curtime = moment().utcOffset("+05:30").format("HH:mm:ss");
    var a = curtime.split(":");
    setCs(+a[0] * 60 * 60 + +a[1] * 60 + +a[2]);
    setEd(moment(arg.event.start).format("DD-MM-Y"));
    var start_time = moment(arg.event.start).format("HH:mm:ss");
    var b = start_time.split(":");
    setSts(+b[0] * 60 * 60 + +b[1] * 60 + +b[2]);
    var end_time = moment(arg.event.end).format("HH:mm:ss");
    var c = end_time.split(":");
    setEts(+c[0] * 60 * 60 + +c[1] * 60 + +c[2]);
  };
  console.log(curtimeseconds);
  console.log(starttimeseconds);
  console.log(endtimeseconds);
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (arg) => {
    setAnchorEl(arg.event.title);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const opens = Boolean(anchorEl);
  const tooletext = (arg) => {
    arg.jsEvent.preventDefault();
    setToday(moment().format("DD-MM-Y"));
    var curtime = moment().utcOffset("+05:30").format("HH:mm:ss");
    var a = curtime.split(":");
    setCs(+a[0] * 60 * 60 + +a[1] * 60 + +a[2]);
    setEd(moment(arg.event.start).format("DD-MM-Y"));
    var start_time = moment(arg.event.start).format("HH:mm:ss");
    var b = start_time.split(":");
    setSts(+b[0] * 120 * 60 + +b[1] * 120 + +b[2]);
    var end_time = moment(arg.event.end).format("HH:mm:ss");
    var c = end_time.split(":");
    setEts(+c[0] * 120 * 60 + +c[1] * 120 + +c[2]);
    setModalTitle(arg.event.title);
    setAnchorEl(arg.event.currentTarget);
  };
  const LoaderClose = () => {
    setLoOpen(false);
  };
  const LoaderOpen = () => {
    setLoOpen(true);
  };

  const handleSubmit=()=>{
    LoaderOpen()
    handleClose()
    const sendData2 = {
      user_id: user,
      event_id:event_id
    };
    axios
      .post(
        `${siteUrl}/calendar/capture_attendance`,
        JSON.stringify(sendData2),
        options
      )
      .then((result) => {
        LoaderClose()
        // console.log(result,"kk")
        window.open(result.data, '_blank');
        setMylink(result.data)

      });
  }
  return (
    <>
      <Box sx={{ backgroundColor: "#f3f6f9", pb: 3 }}>
        <Box sx={{ pt: 10 }}>
          <Loginnav />
          <Grid container>
            <Grid item lg={12}>
              <Box>
                <Paper
                  sx={{
                    p: 2,

                    boxShadow: "0 0 20px 0 rgb(76 87 125 / 2%)",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      fontSize: "1rem",
                      marginBottom: "1.2rem!important",
                    }}
                  >
                    Event Calendar
                  </Typography>

                  <FullCalendar
                    plugins={[
                      dayGridPlugin,
                      timeGridPlugin,
                      listPlugin,
                      interactionPlugin,
                    ]}
                    initialView="dayGridMonth"
                    disableDragging={false}
                    editable={false}
                    dayMaxEventRows={true}
                    timezone={false}
                    navLinks={true}
                    selectable={true}
                    selectMirror={true}
                    displayEventTime={false}
                    nowIndicator={true}
                    eventStartEditable={false}
                    headerToolbar={{
                      left: "prev,next today",
                      center: "title",
                      right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
                    }}
                    views={{
                      timeGrid: {
                        dayMaxEventRows: 2,
                      },
                      dayGridMonth: {
                        editable: false,
                        dayMaxEventRows: 2,
                      },
                    }}
                    events={newevent}
                    eventClick={handleClickOpen}
                  />
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-describedby="alert-dialog-description"
        sx={{
          "& .MuiDialog-paper": {
            maxWidth: "733px",
            width: "634px",
          },
        }}
      >
        <DialogTitle>
          <CloseIcon onClick={handleClose} sx={{ float: "right" }} />
        </DialogTitle>
        <DialogContent sx={{ px: 5 }}>
          <DialogContentText id="alert-dialog-description">
            <Typography
              sx={{ fontWeight: 600, fontSize: "0.85rem", color: "#111" }}
            >
              {modalTitle}
            </Typography>
            <Box sx={{ display: "flex!important", my: 2 }}>
              <MessageIcon
                sx={{ fontSize: "1.4rem", color: "#a1a5b7", mr: 3 }}
              />
              <Typography
                sx={{ fontWeight: 600, fontSize: "0.85rem", color: "#181c32" }}
              >
                {description}
              </Typography>
            </Box>
            <Box sx={{ display: "flex!important", my: 2 }}>
              <CalendarMonthIcon
                sx={{ fontSize: "1.4rem", color: "#a1a5b7", mr: 3 }}
              />{" "}
              <Typography
                sx={{ fontWeight: 600, fontSize: "0.85rem", color: "#181c32" }}
              >
                Start Date: {startdate}
              </Typography>
            </Box>
            <Box sx={{ display: "flex!important", my: 2 }}>
              <FiberManualRecordIcon
                sx={{ fontSize: "1.4rem", color: "#50cd89", mr: 3 }}
              />{" "}
              <Typography
                sx={{ fontWeight: 600, fontSize: "0.85rem", color: "#111" }}
              >
                Starts Time: {starttime}
              </Typography>
            </Box>
            <Box sx={{ display: "flex!important", my: 2 }}>
              <FiberManualRecordIcon
                sx={{ fontSize: "1.4rem", color: "#f1416c", mr: 3 }}
              />
              <Typography
                sx={{ fontWeight: 600, fontSize: "0.85rem", color: "#111" }}
              >
                Ends Time : {endtime}
              </Typography>
            </Box>

            <Box sx={{ display: "flex!important", my: 2 }}>
              {(() => {
                if (status == 2) {
                  return (
                    <>
                      <CancelIcon
                        sx={{ fontSize: "1.4rem", color: "#a1a5b7", mr: 3 }}
                      />{" "}
                      <Typography
                        sx={{
                          fontSize: "0.95rem",
                          color: "red",
                          fontWeight: 600,
                        }}
                      >
                        {" "}
                        event canceled
                      </Typography>
                    </>
                  );
                } else {
                  return (
                    <>
                      {(() => {
                        if (
                          today == eventdate &&
                          curtimeseconds > starttimeseconds - 60 * 30 &&
                          curtimeseconds < endtimeseconds + 60 * 30
                        ) {
                          return (
                            <>
                              <CardMedia
                                component="img"
                                image={liveimg}
                                alt="green iguana"
                                sx={{
                                  width: 48,

                                  objectFit: "unset",
                                }}
                                className="blink-image"
                              />
                              <Typography
                                sx={{
                                  fontSize: "0.85rem",
                                  color: "#111",
                                  ml: 2,
                                }}
                              >
                                {" "}
                                <Link
                                  href={mylink}
                                  target="_blank"
                                  underline="none"
                                  
                                >
                                  {" "}

                                 <Typography onClick={handleSubmit} sx={{ color: "#00802b",cursor:"pointer" }}>Click Here to Join</Typography> 
                                </Link>
                              </Typography>
                            </>
                          );
                        } else {
                          return (
                            <>
                              <CardMedia
                                component="img"
                                image={liveno}
                                alt="green iguana"
                                sx={{
                                  width: 48,

                                  objectFit: "unset",
                                }}
                              />

                              <Typography
                                sx={{
                                  fontSize: "0.85rem",
                                  color: "#111",
                                  ml: 2,
                                }}
                              >
                                {" "}
                                Click Here to Join
                              </Typography>
                            </>
                          );
                        }
                      })()}
                    </>
                  );
                }
              })()}
            </Box>
          </DialogContentText>
        </DialogContent>
      </Dialog>

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
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loopen}
      
      >
        <CircularProgress color="inherit"  sx={{mr:2}} /> Wait your event is loading
      </Backdrop>
    </>
  );
};
export default Calendar;
