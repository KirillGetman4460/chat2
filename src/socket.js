import io from "socket.io-client";

const socket = io('ws://kirill-chat-app.herokuapp.com', { transports : ['websocket'] })

export default socket;