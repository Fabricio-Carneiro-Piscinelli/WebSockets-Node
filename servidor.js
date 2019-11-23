/***
	SERVIDOR NODE.JS
*/

const server = require('http').createServer();
const io = require('socket.io')(server);

io.on('connection', srv => {
	srv.on('ENVIA-MSG', data => {  
		srv.broadcast.emit('RECEBE-MSG', data);
	});
});
server.listen(3000, () => {
	console.log("Servidor online.");
});