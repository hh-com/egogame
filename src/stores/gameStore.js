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
    socket: null
  }),
  actions: {
    setNickname(name) {
      this.nickname = name;
      Cookies.set('ego_uid', this.userId, { expires: 7 });
      Cookies.set('ego_name', name, { expires: 7 });
    },
    joinRoom(id) {
      this.roomId = id;
      this.socket = io('http://' + window.location.hostname + ':3000');
      this.socket.emit('join', { roomId: id, nickname: this.nickname });
      this.socket.on('start', (data) => { this.phase = data.phase; });
    }
  }
});
