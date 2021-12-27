import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Player } from "../../features/game/game.slice";
import { updatePlayer } from "../../features/player/player.slice";
import socket from "../../services/socket";

const MainMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [values, setValues] = useState<Partial<Player>>({
    name: "",
    room: "",
    team: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleCreateRoom = () => {
    console.log(values);
    dispatch(updatePlayer(values));
    socket.emit("create", values.room);
  };

  const handleJoinRoom = () => {
    dispatch(updatePlayer(values));
    navigate(`/${values.room}`);
  };

  useEffect(() => {
    const onGameCreated = (name: string) => navigate(`/${name}`);

    socket.on("gameCreated", onGameCreated);

    return () => void socket.off("gameCreated");
  }, []);

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
