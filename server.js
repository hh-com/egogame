const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, { cors: { origin: "*" } });

const rooms = {};

io.on('connection', (socket) => {
    socket.on('join', ({ roomId, nickname }) => {
        socket.join(roomId);
        if (!rooms[roomId]) rooms[roomId] = [];
        rooms[roomId].push({ id: socket.id, nickname, ready: false });
        io.to(roomId).emit('update', rooms[roomId]);
    });

    socket.on('ready', ({ roomId, ready }) => {
        const room = rooms[roomId];
        if (!room) return;
        const player = room.find(p => p.id === socket.id);
        if (player) player.ready = ready;

        const readyCount = room.filter(p => p.ready).length;
        if (readyCount >= room.length / 2 && room.length >= 2) {
            io.to(roomId).emit('start', { phase: 'question' });
        } else {
            io.to(roomId).emit('update', room);
        }
    });
});
http.listen(3000, () => console.log('Backend running on 3000'));
