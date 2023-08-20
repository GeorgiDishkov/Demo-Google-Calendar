import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import React from "react";
import TodayDayButton from "./todayButton";
import { LeftArrowButton, RightArrowButton } from "./arrowButtons/intex";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import TopBarCalendar from "./calendar";
import dayjs from "dayjs";

const PREFIX = "top-bar";

const classes = {
  dayWrapper: `${PREFIX}-dayWrapper`,
  wrapper: `${PREFIX}-wrapper`,
  componentWrapper: `${PREFIX}-componentWrapper`,
};
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  [`& .${classes.dayWrapper}`]: {
    marginRight: theme.spacing(2),
    paddingLeft: "2px",
    paddingRight: "2px",
    border: " 8px solid",
    borderColor: "#2196F3 #FFC107 green #3F51B5",
  },
  [`& .${classes.wrapper}`]: {
    display: "flex",
    alignItems: "center",
  },
  [`& .${classes.componentWrapper}`]: {
    paddingLeft: theme.spacing(2),
  },
}));

interface topBarProps {
  title?: string;
}

const TopBar = ({ title }: topBarProps) => {
  const theme = useTheme();

  const today = useSelector((state: RootState) => state.calendar.today);
  const date = dayjs(today).date();

  return (
    <StyledAppBar position="static" color="primary">
      <Toolbar>
        <Box className={classes.wrapper}>
          <Box className={classes.dayWrapper}>
            <Typography fontSize={14} color={theme.palette.secondary.light}>
              {date}
            </Typography>
          </Box>
          <Typography
            color={theme.palette.primary.contrastText}
            fontWeight={theme.typography.fontWeightLight}
            variant="h6"
            sx={{ flexGrow: 1 }}
          >
            {title}
          </Typography>
          <TodayDayButton />
          <Box className={classes.componentWrapper}>
            <LeftArrowButton />
            <RightArrowButton />
          </Box>
          <Box className={classes.componentWrapper}>
            <TopBarCalendar />
          </Box>
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
};

export default TopBar;
