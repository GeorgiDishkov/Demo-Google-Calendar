import {
  Button,
  IconButton,
  Link,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

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
  const today = useSelector((state: RootState) => state.calendar.today);

  return (
    <StyledButton
      disabled={!today}
      style={{ opacity: today === undefined ? 0.3 : 1 }}
    >
      <Link
        textTransform="none"
        underline="none"
        href={`${today ? `/${today}` : `/`}`}
        display="flex"
      >
        <ArrowBackIosIcon className={classes.button} />
      </Link>
    </StyledButton>
  );
};

export const RightArrowButton = () => {
  const theme = useTheme();
  const today = useSelector((state: RootState) => state.calendar.today);

  return (
    <StyledButton
      disabled={!today}
      style={{ opacity: today === undefined ? 0.3 : 1 }}
    >
      <Link
        textTransform="none"
        underline="none"
        href={`${today ? `/${today}` : `/`}`} //TODO: make it work right
        display="flex"
      >
        <ArrowForwardIosIcon className={classes.button} />
      </Link>
    </StyledButton>
  );
};
