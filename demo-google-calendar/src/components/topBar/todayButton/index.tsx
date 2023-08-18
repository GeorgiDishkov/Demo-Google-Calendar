import { Button, Link, Typography, styled, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const PREFIX = "today-button";

const classes = {
  todayButtonWrapper: `${PREFIX}-todayButtonWrapper`,
};
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

  return (
    <StyledButton
      disabled={today === undefined}
      style={{ opacity: today === undefined ? 0.3 : 1 }}
    >
      <Link
        textTransform="none"
        underline="none"
        href={`${
          today
            ? `/${today?.date()}` //TODO : make it work ffs
            : `/`
        }`}
      >
        <Typography
          fontSize={15}
          fontWeight={theme.typography.fontWeightMedium}
          color={theme.palette.primary.contrastText}
        >
          днес
        </Typography>
      </Link>
    </StyledButton>
  );
};

export default TodayDayButton;
