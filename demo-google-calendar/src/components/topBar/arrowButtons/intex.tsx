import { IconButton, styled, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState, useAppDispach } from "../../../redux/store";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { setFocusedDate } from "../../../redux/calendarSlice/reducer";
import { useNavigate } from "react-router-dom";
import urlConverter from "../../../utils/urlConverter";
import dayjs from "dayjs";

const PREFIX = "arrow-button";

const classes = {
  button: `${PREFIX}-button`,
};
const StyledButton = styled(IconButton)(({ theme }) => ({
  [`& .${classes.button}`]: {
    color: theme.palette.background.default,
    fontSize: "14px",
  },
}));

export const LeftArrowButton = () => {
  const theme = useTheme();
  const focusedDate = useSelector(
    (state: RootState) => state.calendar.focusedDate
  );
  const dispatch = useAppDispach();
  const navigate = useNavigate();

  const handleClick = () => {
    if (focusedDate) {
      const prevouseMonth = dayjs(focusedDate)?.subtract(1, "months");

      dispatch(setFocusedDate(prevouseMonth.toISOString()));
      const url = urlConverter(prevouseMonth);
      navigate(url, { replace: true, state: { preventRender: false } });
    }
  };

  return (
    <StyledButton onClick={handleClick}>
      <ArrowBackIosIcon className={classes.button} />
    </StyledButton>
  );
};

export const RightArrowButton = () => {
  const theme = useTheme();
  const focusedDate = useSelector(
    (state: RootState) => state.calendar.focusedDate
  );
  const dispatch = useAppDispach();
  const navigate = useNavigate();

  const handleClick = () => {
    if (focusedDate) {
      const prevouseMonth = dayjs(focusedDate)?.add(1, "months");
      dispatch(setFocusedDate(prevouseMonth.toISOString()));
      const url = urlConverter(prevouseMonth);
      navigate(url, { replace: true, state: { preventRender: false } });
    }
  };

  return (
    <StyledButton onClick={handleClick}>
      <ArrowForwardIosIcon className={classes.button} />
    </StyledButton>
  );
};
