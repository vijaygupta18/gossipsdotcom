var PORT = process.env.PORT || 3000; 
const fetch = require("node-fetch");
var express = require("express");
var app = express(); 
var http = require("http").Server(app);
var moment = require("moment");
var clientInfo = {};
var io = require("socket.io")(http);
app.use(express.static(__dirname + '/public'));



//--------------music section-------------------------//



async function songgrabber(songname) {
try{
let url = "https://www.jiosaavn.com/api.php?__call=autocomplete.get&_format=json&_marker=0&cc=in&includeMetaTags=1&query=" + songname;
var response = await fetch(url) //RUN RUN RUN
var resdata = await response.json();
var songdata = resdata['songs']['data']
const id = songdata[0]['id'];


// console.log(songids)
    let songurl= await singleidurl(id)
    if(song==undefined)
    songurl="";
return songurl;
}catch (error) {}
}


async function singleidurl(id){
try{
let url = "https://www.jiosaavn.com/api.php?__call=song.getDetails&cc=in&_marker=0%3F_marker%3D0&_format=json&pids=" + id
let response = await fetch(url)
let resdata = await response.json()
return helper(resdata[id])
}catch (error) {}
}



function helper(data){
try{
    if('media_preview_url' in data){
       var url = data['media_preview_url'];
       url = url.replace('preview', 'aac');
    }

    if(data['320kbps'] == 'true'){
        url = url.replace("_96_p.mp4", "_320.mp4")
    }
    else{
        url = url.replace("_96_p.mp4", "_160.mp4")
    }
    var dict = { 'song': data['song'], 'singers': data['singers'],'thumbnail':data['image'] ,'url': url}
    return dict
  }catch (error) {}
}


//----------------------- music section over ^^^^^^^^^^^^^^^^----------------//




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
    if(args[0]==".play") 
    { song=str.substr(str.indexOf(" ") + 1);
      if(song) 
      {  
        grab(song);
        async function grab(name){
          var s=name;
         s=s.charAt(0).toUpperCase()+s.slice(1);;
          
          
          var songs=  await songgrabber(name)
          var data = {url:songs.url};
          socket.emit("message", {
            text: "Playing : "+songs.song+" || "+" By : "+songs.singers,
            timestamp: moment().valueOf(),
            name: "Natasha"
          });
          socket.broadcast.to(clientInfo[socket.id].room).emit("message", {
            text: "Playing : "+songs.song+" || "+" By : "+songs.singers,
            name: "Natasha",
            timestamp: moment().valueOf()
          });
            io.in(clientInfo[socket.id].room).emit("music",data);
        
        }
      }
    } 
    // console.log("args",args);
    if(args[0]==".pause" || args[0]==".p" )
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
  console.log("server started at http://localhost:3000");
});
