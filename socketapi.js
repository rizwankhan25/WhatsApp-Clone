const { log } = require("debug/src/browser");
const { all } = require("express/lib/application");

const io = require("socket.io")();
const socketapi = {
  io: io,
};

// Add your socket.io logic here!
let allusersnames = [];
let allusersids = [];
io.on("connection", function (socket) {
  console.log("A user connected");
  io.emit("onlineusers", {allusersnames:allusersnames.length})

  socket.on("disconnect", function (socket) {
    console.log("A user disconnected");
    let index = allusersids.indexOf(socket.id)
    allusersids.splice(index,1)
    allusersnames.splice(index,1)
    io.emit("onlineusers", {allusersnames:allusersnames.length})

  });

  socket.on("msg", (data) => {
    io.emit("msg", data);
  });
  
  socket.on("naam", (data) => {
    allusersnames.push(data);
    allusersids.push(socket.id);
    io.emit("onlineusers", {allusersnames:allusersnames.length});
   });

});

// end of socket.io logic




module.exports = socketapi;
