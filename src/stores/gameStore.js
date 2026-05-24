import { defineStore } from 'pinia';
import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';
import { io } from 'socket.io-client';

export const useGameStore = defineStore('game', {
  state: () => ({
    userId: Cookies.get('ego_uid') || uuidv4(),
    nickname: Cookies.get('ego_name') || '',
    roomId: null,
    phase: 'lobby',
    socket: null,
    players: []
  }),
  actions: {
    setNickname(name) {
      this.nickname = name;
      Cookies.set('ego_uid', this.userId, { expires: 7 });
      Cookies.set('ego_name', name, { expires: 7 });
      console.log('Nickname set:', name);
    },
    joinRoom(id) {
      this.roomId = id;
      this.socket = io('http://' + window.location.hostname + ':3000');
      this.socket.on('connect', () => console.log('Connected to server:', this.socket.id));
      this.socket.emit('join', { roomId: id, nickname: this.nickname });
      this.socket.on('update', (players) => { 
          this.players = players; 
          console.log('Players updated:', players);
      });
      this.socket.on('start', (data) => { 
          this.phase = data.phase; 
          console.log('Game phase start:', data.phase);
      });
    },
    setReady(status) {
      console.log('Sending ready state:', status);
      this.socket.emit('ready', { roomId: this.roomId, ready: status });
    }
  }
});
