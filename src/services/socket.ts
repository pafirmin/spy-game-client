import { io } from "socket.io-client";

const socket = io("https://obscure-oasis-37328.herokuapp.com/");

export default socket;
