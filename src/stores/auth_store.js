import { defineStore } from 'pinia';
import authAPI from '@/services/auth_api.js';

export const useAuthStore = defineStore({
  id: 'authStore',
  state: () => ({
    csrfToken: null,
    loggedIn: false,
    username: '',
    userId: null
  }),
  actions: {
    async logIn(username, password) {
      try {
        await authAPI().post('login/', {username:username, password:password});
        this.loggedIn = true;
        this.username = username;
        const res = await authAPI().get('user-me/');
        this.userId = res.data.id
        return null
      }
      catch (err) {}
    },
    async logOut() {
      try {
        const res = await authAPI().post('logout/');
        this.loggedIn = false;
        this.username = '';
      }
      catch (err) {}
    }
  },
});
