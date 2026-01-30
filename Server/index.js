import express from "express"
import http from "http"
import cors from "cors"
import 'dotenv/config';
import connectDB from './lib/db.js';
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRoute.js";
import { Server } from "socket.io";

//Create Express and Http server
const app = express()
const server = http.createServer(app)
const PORT = process.env.PORT || 3000


//Initialise a socket.io server
export const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});


//variable to store userId and socketId mapping
export const userSocketMap = {};

//This functionality is used to track online users, the users that are connected to the server via websockets (Acts like an attendance system)
io.on('connection', (socket) => {
  const userid = socket.handshake.query.userid;
  console.log('a user connected',userid);

  if(userid){
    userSocketMap[userid] = socket.id;
  }

  //Emit the updated userSocketMap to all connected clients
  io.emit('getOnlineUser', Object.keys(userSocketMap));

  socket.on('disconnect', () => {
    console.log('user disconnected', userid);
    if(userid){
      delete userSocketMap[userid];
    }

    //Emit the updated userSocketMap to all connected clients
    io.emit('getOnlineUser', Object.keys(userSocketMap));
  }); 

});


//Creating middlewares

app.use(express.json({ limit: '5mb' }))
app.use(cors())


//Sample Route
app.use('/api/status', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/auth', userRouter);

app.use('/api/message', messageRouter);


//Now connecting the mongo db
await connectDB();



//Starting the server
server.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})