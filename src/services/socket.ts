import { io } from "socket.io-client";

const socket = io(`${process.env.REACT_APP_SOCKET_BASE}`, { path: `${process.env.REACT_APP_SOCKET_PATH}`} );

export default socket;
