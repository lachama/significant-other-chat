var express = require('express');
var app = express();
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var favicon = require('serve-favicon');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
	console.log('a user connected');
	socket.on('chat message', function(msg) {
		io.emit('chat message', msg);
	});
	socket.on('disconnect', function() {
		console.log('user disconnected');
	});
});

http.listen(process.env.PORT || 3000, function() {
	console.log('listening on *:3000');
});