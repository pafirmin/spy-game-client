import { Snackbar, Alert as Notification } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import socket from "../../services/socket";
import { Alert, showError, shiftAlert } from "./alerts.slice";

const Alerts = () => {
  const [activeAlert, setActiveAlert] = useState<Alert | undefined>(undefined);
  const [open, setOpen] = useState<boolean>(false);
  const alerts = useSelector((state: RootState) => state.alerts);
  const dispatch = useDispatch();
  const onGameError = (err: string) => dispatch(showError(err));

  useEffect(() => {
    socket.on("gameError", onGameError);

    return () => void socket.off("gameError", onGameError);
  }, []);

  useEffect(() => {
    if (alerts.length && !activeAlert) {
      setActiveAlert(alerts[0]);
      dispatch(shiftAlert());
      setOpen(true);
    } else if (alerts.length && activeAlert && open) {
      setOpen(false);
    }
  }, [alerts, activeAlert, open]);

  const handleClose = () => setOpen(false);

  const handleExited = () => {
    setActiveAlert(undefined);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      TransitionProps={{ onExited: handleExited }}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
    >
      <Notification severity={activeAlert?.type}>
        {activeAlert?.message}
      </Notification>
    </Snackbar>
  );
};

export default Alerts;
