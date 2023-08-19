import { Box, CircularProgress, Typography, styled } from "@mui/material";
import React, { useEffect } from "react";
import urlConverter from "../../utils/urlConverter";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";

const PREFIX = "calendar";

const classes = {
  calendarWrapper: `${PREFIX}-calendarWrapper`,
};
const StyledBox = styled(Box)(({}) => ({
  display: "flex",
  marginTop: "40vh",
  justifyContent: "center",
}));

const WrongDate = () => {
  const today = useSelector((state: RootState) => state.calendar.today);
  const navigate = useNavigate();

  useEffect(() => {
    const redirect = () => {
      const url = urlConverter(dayjs(today));
      navigate(url);
    };
    setTimeout(redirect, 1500);
  }, []);

  return (
    <StyledBox>
      <CircularProgress color="inherit" />
      <Typography fontSize={30}>
        Wrong date ... you will be sent back in time to the present
      </Typography>
    </StyledBox>
  );
};

export default WrongDate;
