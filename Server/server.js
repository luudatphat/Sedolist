var express     = require("express");
var path        = require('path');
var app     = express();

//Socket.io
var server = require("http").Server(app);
var io = require("socket.io")(server);

//View
app.set("view engine", "ejs");
app.set("views", "./views"); 

//Js
app.use(express.static(path.join(__dirname, 'public')));

//route
app.get('/', function(req, res){
    res.render('index');
  });

//
io.on("connection", function(socket){
    console.log('co nguoi dang ket noi' + socket.id);
    socket.on("web-send-data", function(data){
        console.log(data);
        io.sockets.emit('data-web',data);
    });

    socket.on("app-send-data", function(data){
        console.log(data);
        io.sockets.emit('data-web',data);
    });
});
  
//
server.listen(3000);
console.log('Get connet 3000');