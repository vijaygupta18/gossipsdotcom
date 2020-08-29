//use the function created before this js to get the values
var socket = io();
 var name = getQueryVariable("name") || 'Anonymous';
 var room = getQueryVariable("room") || 'No Room Selected';

 $(".room-title").text(room);
 socket.on("connect", function() {
   console.log("Connected to Socket I/O Server!");
   console.log(name + " wants to join  " + room);
   socket.emit('joinRoom', {
     name: name,
     room: room
   });
 });

 var timeout;

 function timeoutFunction() {
   typing = false;
   socket.emit('typing', {
     text: ""
   });
 }

 $('#messagebox').keyup(function() {
   console.log('happening');
   typing = true;
   $("#icon-type").removeClass();
 
   socket.emit('typing', {
     text: name + " is typing ..."
   });
   clearTimeout(timeout);
   timeout = setTimeout(timeoutFunction, 1000);
 });

 
 var hidden, visibilityChange;
 if (typeof document.hidden !== "undefined") { 
   hidden = "hidden";
   visibilityChange = "visibilitychange";
 } else if (typeof document.mozHidden !== "undefined") {
   hidden = "mozHidden";
   visibilityChange = "mozvisibilitychange";
 } else if (typeof document.msHidden !== "undefined") {
   hidden = "msHidden";
   visibilityChange = "msvisibilitychange";
 } else if (typeof document.webkitHidden !== "undefined") {
   hidden = "webkitHidden";
   visibilityChange = "webkitvisibilitychange";
 }

 socket.on("typing", function(message) { 
   $(".typing").text(message.text);
 });

 socket.on("userSeen", function(msg) {

 
     var icon = $("#icon-type");
     icon.removeClass();
     icon.addClass("fa fa-check-circle");
     if (msg.read) {
      
       icon.addClass("msg-read");
     } else {
  
       icon.addClass("msg-delieverd");
     }
     console.log(msg);
   //}
 });


 socket.on("message", function(message) {
   console.log("New Message !");
   console.log(message.text);
   var $messages = $(".messages");
   var $message = $('<li class = "list-group-item"></li>');

   var momentTimestamp = moment.utc(message.timestamp).local().format("h:mm a");

   $message.append("<strong>" + momentTimestamp + " " + message.name + "</strong>");
   $message.append("<p>" + message.text + "</p>");
   $messages.append($message);
 
   var obj = $("ul.messages.list-group");
   var offset = obj.offset();
   var scrollLength = obj[0].scrollHeight;
  
   $("ul.messages.list-group").animate({
     scrollTop: scrollLength - offset.top
   });
   ///////
   socket.on('music',data=>{
     p = document.getElementById("aud");
     p.pause();
     p.src=data.url;
     p.play();
   });
   socket.on('pause',data=>{
    p = document.getElementById("aud");
    p.pause();
  });
   ///////
   if (document[hidden]) {
     notifyMe(message);
 
     var umsg = {
       text: name + " has not seen message",
       read: false
     };
     socket.emit("userSeen", umsg);
   } else {

     var umsg = {
       text: name + " has seen message",
       read: true,
       user: name
     };
     socket.emit("userSeen", umsg);
   }
 });


 var $form = $("#messageForm");
 var $message1 = $form.find('input[name=message]');
 $form.on("submit", function(event) {
   event.preventDefault();
   var msg = $message1.val();
  
   msg = msg.replace(/</g, "&lt;").replace(/>/g, "&gt;").trim();
   if (msg === "") return -1; 

   socket.emit("message", {
     text: msg,
     name: name
   });
   var $messages = $(".messages");
   var $message = $('<li class = "list-group-item"></li>');

   var momentTimestamp = moment().format("h:mm a");

   $message.append("<strong>" + momentTimestamp + " " + name + "</strong>");

   $message.append($("<p>", {
     class: "mymessages",
     text: $message1.val()
   }));
   $messages.append($message);
   $message1.val('');
 
   var obj = $("ul.messages.list-group");
   var offset = obj.offset();
   var scrollLength = obj[0].scrollHeight;

   $("ul.messages.list-group").animate({
     scrollTop: scrollLength - offset.top
   });

 });

 function notifyMe(msg) {
  
   if (!("Notification" in window)) {
     alert("This browser does not support desktop notification,try Chrome!");
   }
   else if (Notification.permission === "granted") {
 
     var notification = new Notification('GossipDotCom', {
       body: msg.name + ": " + msg.text 
     });
     notification.onclick = function(event) {
       event.preventDefault();
       this.close();
   
       var umsg = {
         text: name + " has seen message",
         read: true,
         user: name
       };
       socket.emit("userSeen", umsg);
   
     };
   }

   else if (Notification.permission !== 'denied') {
     Notification.requestPermission(function(permission) {
  
       if (permission === "granted") {
         var notification = new Notification('GossipDotCom', {
           body: msg.name + ": " + msg.text 
         });
         notification.onclick = function(event) {
           event.preventDefault();
           this.close();
           var umsg = {
             text: name + " has seen message",
             read: true,
             user: name
           };
           socket.emit("userSeen", umsg);
          
         };
       }
     });
   }

 }
