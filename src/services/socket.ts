import { io } from "socket.io-client";

const socket = io(`${process.env.REACT_APP_API_BASE}`, { path: `${process.env.REACT_APP_SOCKET_PATH}`} );

export default socket;
