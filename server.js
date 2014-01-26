var express = require('express');
var path = require('path');
var http = require('http');
var crypto = require('crypto');
var app = express();

var server = http.createServer(app);

var io = require('socket.io').listen(server);

app.use(express.static(__dirname));

app.get('/', function(req, res) {
	res.sendfile(path.join(__dirname, 'index.html'));
});

io.sockets.on('connection', function(socket) {
	socket.on('message', function(data) {
		socket.emit('sha1', { enc: crypto.createHash('sha1').update(data.msg).digest('base64')});
		socket.emit('sha256', { enc: crypto.createHash('sha256').update(data.msg).digest('base64')});
		socket.emit('sha512', { enc: crypto.createHash('sha512').update(data.msg).digest('base64')});
		socket.emit('md5', { enc: crypto.createHash('md5').update(data.msg).digest('base64')});
	});
});

server.listen(8080);