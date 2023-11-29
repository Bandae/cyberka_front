import { defineStore } from 'pinia';
import API from '@/services/api.js';

export const useAuthStore = defineStore({
  id: 'authStore',
  state: () => ({
    loggedIn: false,
    username: '',
    userId: null,
    is_staff: false
  }),
  actions: {
    async logIn(username, password) {
      try {
        await API(true).post('login/', {username:username, password:password});
        this.loggedIn = true;
        this.username = username;
        const res = await API(true).get('user-me/');
        this.userId = res.data.id
        this.is_staff = res.data.is_staff;
        return null
      }
      catch (err) {
        return [err.response.data.detail]
      }
    },
    async logOut() {
      await API(true).post('logout/');
      this.loggedIn = false;
      this.username = '';
    }
  },
});
