import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { updatePlayer } from "../../features/player/player.slice";
import socket from "../../services/socket";
import axios from "axios";
import { showError } from "../../features/alerts/alerts.slice";
import { RootState } from "../../app/store";

const MainMenu = () => {
  const [searchParams] = useSearchParams();
  const player = useSelector((state: RootState) => state.player);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    room: searchParams.get("game") || "",
    name: player.name || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleCreateRoom = async () => {
    try {
      dispatch(updatePlayer({ name: values.name }));

      const res = await axios.post(`${process.env.REACT_APP_API_BASE}/games`, {
        name: values.room,
      });

      if (res.status === 201) {
        navigate(`/${values.room}`);
      }
    } catch (err) {
      dispatch(showError(err.response.data.message));
    }
  };

  const handleJoinRoom = async () => {
    try {
      dispatch(updatePlayer({ name: values.name }));

      const res = await axios.get(
        `${process.env.REACT_APP_API_BASE}/games/${values.room}`
      );

      if (res.status === 200) {
        navigate(`/${values.room}`);
      }
    } catch (err) {
      console.log(err);
      dispatch(showError(err.response.data.message));
    }
  };

  useEffect(() => {
    const onSuccess = (name: string) => navigate(`/${name}`);
    socket.on("gameFound", onSuccess);

    return () => void socket.off("gameFound", onSuccess);
  }, [navigate]);

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography component="h1" variant="h5">
        Join game
      </Typography>
      <Box component="form" noValidate sx={{ mt: 1 }}>
        <TextField
          value={values.name}
          onChange={handleChange}
          margin="normal"
          required
          fullWidth
          id="name"
          label="Your name"
          name="name"
          autoComplete="email"
          autoFocus
        />
        <TextField
          value={values.room}
          onChange={handleChange}
          margin="normal"
          required
          fullWidth
          name="room"
          label="Room name"
          id="room"
        />
        <Button
          type="button"
          onClick={handleJoinRoom}
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Join
        </Button>
        <Button
          type="button"
          onClick={handleCreateRoom}
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Create
        </Button>
      </Box>
    </Box>
  );
};

export default MainMenu;
