const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, { cors: { origin: "*" } });

const rooms = {};

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('join', ({ roomId, nickname }) => {
        console.log(`Join: ${nickname} (${socket.id}) -> ${roomId}`);
        socket.join(roomId);
        if (!rooms[roomId]) rooms[roomId] = [];
        rooms[roomId].push({ id: socket.id, nickname, ready: false });
        io.to(roomId).emit('update', rooms[roomId]);
    });

    socket.on('ready', ({ roomId, ready }) => {
        const room = rooms[roomId];
        if (!room) return;
        const player = room.find(p => p.id === socket.id);
        if (player) {
            player.ready = ready;
            console.log(`Ready: ${player.nickname} set to ${ready}. Room: ${roomId}`);
        }
        
        const readyCount = room.filter(p => p.ready).length;
        console.log(`Room ${roomId} status: ${readyCount}/${room.length} ready`);
        
        io.to(roomId).emit('update', room);
        
        if (readyCount >= (room.length / 2) && room.length >= 2) {
            console.log(`Room ${roomId} starting game!`);
            io.to(roomId).emit('start', { phase: 'question' });
        }
    });
});
http.listen(3000, () => console.log('Backend running on 3000'));
