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
io.on("connection", (socket) => {
    console.log("a user connected",socket.id);
    socket.on("disconnect", () => {
      console.log("a user disconnected",socket.id);
    });
  });

export {io,server,app};