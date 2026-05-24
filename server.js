const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, { cors: { origin: "*" } });

const rooms = {};

io.on('connection', (socket) => {
    socket.on('join', ({ roomId, nickname }) => {
        socket.join(roomId);
        if (!rooms[roomId]) rooms[roomId] = [];
        rooms[roomId].push({ id: socket.id, nickname });
        
        io.to(roomId).emit('update', rooms[roomId]);
        
        if (rooms[roomId].length >= 2) {
            io.to(roomId).emit('start', { phase: 'question' });
        }
    });
});

http.listen(3000, () => console.log('Backend läuft auf Port 3000'));
