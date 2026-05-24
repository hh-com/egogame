import { defineStore } from 'pinia';
import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';

export const useGameStore = defineStore('game', {
  state: () => ({
    userId: Cookies.get('ego_uid') || uuidv4(),
    nickname: Cookies.get('ego_name') || '',
    roomId: null,
    phase: 'lobby',
    players: []
  }),
  actions: {
    setNickname(name) {
      this.nickname = name;
      Cookies.set('ego_uid', this.userId, { expires: 7 });
      Cookies.set('ego_name', name, { expires: 7 });
    },
    joinRoom(id) {
      this.roomId = id;
      this.phase = 'wait';
    }
  }
});
