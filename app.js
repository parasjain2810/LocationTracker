const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path=require('path')
require('dotenv').config();

app.use(express.json())
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,"public")))
app.get('/',(req,res)=>{
    res.render("index")
})



io.on('connection', (socket) => {
    socket.on('send-location',(data)=>{
       io.emit('recieve-location',{id:socket.id,...data})
    })
  console.log('a user connected',socket.id);
  
  socket.on("disconnect",()=>{
    io.emit("user-disconnect",socket.id)
    console.log('user diconnected',socket.io);
  })
});

server.listen(process.env.PORT, () => {
  console.log('backend connected successfully');
});

