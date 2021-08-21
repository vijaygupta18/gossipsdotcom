var PORT = process.env.PORT || 3000; 
var express = require("express");
var app = express(); 
var http = require("http").Server(app);


var moment = require("moment");
var music = {
             'flute' : 'sound/flute_classic.mp3',
             'piano' : 'sound/piano.mp3',          
             'guitar' : 'sound/guitar.mp3',
             'edm' : 'sound/edm.mp3',
             'chill' : 'sound/chill.mp3',
             'demons' : 'sound/demons.mp3',
              'sitar' : 'sound/sitar.mp3',
              'yaari' : 'https://snoidcdnems05.cdnsrv.jio.com/aac.saavncdn.com/228/2ef01f23f22efa0862f80c783783a699_320.mp4'
  
            };



var clientInfo = {};

var io = require("socket.io")(http);


app.use(express.static(__dirname + '/public'));


function sendCurrentUsers(socket) { 
  var info = clientInfo[socket.id];
  var users = [];
  if (typeof info === 'undefined') {
    return;
  }
 
  Object.keys(clientInfo).forEach(function(socketId) {
    var userinfo = clientInfo[socketId];
   
    if (info.room == userinfo.room) {
      users.push(userinfo.name);
    }

  });
 

  socket.emit("message", {
    name: "Natasha",
    text: "Current Users : " + users.join(', '),
    timestamp: moment().valueOf()
  });

}


io.on("connection", function(socket) {
  console.log("User is connected");

  socket.on("disconnect", function() {
    var userdata = clientInfo[socket.id];
    if (typeof(userdata !== undefined)) {
      socket.leave(userdata.room); 
      socket.broadcast.to(userdata.room).emit("message", {
        text: userdata.name + " has left the Chat",
        name: "Natasha",
        timestamp: moment().valueOf()
      });

      delete clientInfo[socket.id];

    }
  });

  socket.on('joinRoom', function(req) {
    clientInfo[socket.id] = req;
    socket.join(req.room);
 
    socket.broadcast.to(req.room).emit("message", {
      name: "Natasha",
      text: req.name + ' has joined',
      timestamp: moment().valueOf()
    });

  });


  socket.on('typing', function(message) { 
    socket.broadcast.to(clientInfo[socket.id].room).emit("typing", message);
  });

  socket.on("userSeen", function(msg) {
    socket.broadcast.to(clientInfo[socket.id].room).emit("userSeen", msg);
  
  });

  socket.emit("message", {
    text: "Welcome to Gossips-Dot-Com !",
    timestamp: moment().valueOf(),
    name: "Natasha"
  });

  
  socket.on("message", function(message) {
    console.log("Message Received : " + message.text);
    
    var str = message.text;
    str = str.toLowerCase();
    var args = str.split(" ");
    if(args[0]=="play") 
    { p = music[args[1]];
      if(p) 
      { console.log(p); 
        var data = {url:p};
      
        io.in(clientInfo[socket.id].room).emit("music",data);
      }
    } console.log("args",args);
    if(args[0]=="pause")
    {
      io.in(clientInfo[socket.id].room).emit("pause",{});
      
    }
    if (message.text === "@currentUsers") {
      sendCurrentUsers(socket);
    } else {
 
      message.timestamp = moment().valueOf();

      socket.broadcast.to(clientInfo[socket.id].room).emit("message", message);
      
    }

  });
});
http.listen(PORT, function() {
  console.log("server started");
});
