import {Server} from "socket.io";
import http from "http";
import experss from "express";


const app = experss();
const server=http.createServer(app);
const io=new Server(server,{
    cors: {
        origin: ["http://localhost:5173"],
        },
});

export function getReceiverSocketId(userId){
  return userSocketMap[userId];
}
//mapping online users
const userSocketMap={};

io.on("connection", (socket) => {
    console.log("a user connected",socket.id);

    const userId= socket.handshake.query.userId
    if(userId)
        userSocketMap[userId]=socket.id;

    io.emit("getOnlineUsers",Object.keys(userSocketMap));
    
    socket.on("disconnect", () => {
      console.log("a user disconnected",socket.id);
      delete userSocketMap[userId];
      io.emit("getOnlineUsers",Object.keys(userSocketMap));
    });
  });

export {io,server,app};