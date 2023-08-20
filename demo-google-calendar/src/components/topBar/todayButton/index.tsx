import { Button, Link, Typography, styled, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState, useAppDispach } from "../../../redux/store";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { setFocusedDate } from "../../../redux/calendarSlice/reducer";
import urlConverter from "../../../utils/urlConverter";

const StyledButton = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(4),
  paddingLeft: theme.spacing(1),
  paddingRight: theme.spacing(1),
  border: " 1px solid #dadce0",
  "&:hover": {
    backgroundColor: "#a9aaab36",
  },
}));

const TodayDayButton = () => {
  const theme = useTheme();
  const today = useSelector((state: RootState) => state.calendar.today);
  const dispatch = useAppDispach();
  const navigate = useNavigate();

  const handleClick = () => {
    if (today) {
      dispatch(setFocusedDate(today));
      const url = urlConverter(dayjs(today));
      navigate(url, { replace: true, state: { preventRender: false } });
    }
  };

  return (
    <StyledButton
      disabled={today === undefined}
      style={{ opacity: today === undefined ? 0.3 : 1 }}
      onClick={handleClick}
    >
      <Typography
        fontSize={15}
        style={{ textTransform: "none" }}
        fontWeight={theme.typography.fontWeightMedium}
        color={theme.palette.primary.contrastText}
      >
        Today
      </Typography>
    </StyledButton>
  );
};

export default TodayDayButton;
