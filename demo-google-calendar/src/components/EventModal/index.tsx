import { Box, IconButton, Modal, Typography, styled } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import TableRowsIcon from "@mui/icons-material/TableRows";
import DateRangeIcon from "@mui/icons-material/DateRange";

interface eventModalProps {
  open: boolean;
  onClose: any;
  event?: any;
  date?: string;
}

const EventModal = ({ open, onClose, event, date }: eventModalProps) => {
  const PREFIX = "event-modal";

  const classes = {
    cross: `${PREFIX}-cross`,
    pointer: `${PREFIX}-pointer`,
    rowWrapper: `${PREFIX}-rowWrapper`,
  };
  const StyledModal = styled(Modal)(({ theme }) => ({
    [`& .${classes.cross}`]: {
      marginLeft: "89%",
    },
    [`& .${classes.pointer}`]: {
      backgroundColor: event.typeEvent === "event" ? "#177545" : "#007bd3ba",
      width: "15px",
      height: "15px",
      borderRadius: "4px",
      marginRight: "17px",
    },
    [`& .${classes.rowWrapper}`]: {
      marginBottom: "10px",
      display: "flex",
      alignItems: "center",
      flexWrap: "nowrap",
    },
    [`& .MuiBackdrop-root`]: {
      backgroundColor: "rgba(0, 0, 0, 0)",
    },
  }));

  if (!event) {
    return null;
  }
  return (
    <StyledModal open={open} onClose={onClose}>
      <Box
        style={{
          margin: "auto",
          width: "400px",
          padding: "20px",
          background: "#fff",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          position: "absolute",
          borderRadius: "8px",
          boxShadow: "8px 14px 20px #0000006b",
        }}
      >
        <IconButton className={classes.cross} onClick={onClose}>
          <CloseIcon />
        </IconButton>
        <Box className={classes.rowWrapper}>
          <Box className={classes.pointer}></Box>
          <Typography variant="h6">
            {event.title}
            <Typography fontSize={16}>Date: {date}</Typography>
          </Typography>
        </Box>
        <Box className={classes.rowWrapper}>
          <TableRowsIcon
            fontSize="small"
            style={{ marginRight: "5px", marginLeft: "-3px" }}
          />
          <Typography fontSize={18}>{event.description}</Typography>
        </Box>
        <Box className={classes.rowWrapper}>
          <DateRangeIcon
            fontSize="small"
            style={{ marginRight: "5px", marginLeft: "-3px" }}
          />
          <Typography variant="body1">{event.typeEvent}</Typography>
        </Box>
      </Box>
    </StyledModal>
  );
};

export default EventModal;
