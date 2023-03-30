import { defineStore } from 'pinia';
import logInCall from '@/services/auth_api.js';

export const useAuthStore = defineStore({
  id: 'authStore',
  state: () => ({
    csrfToken: null,
    loggedIn: false,
    username: ''
  }),
  actions: {
    async getCSRFToken() {
      const res = await fetch('http://localhost:8000/csrf');
      const token = res.headers.get('X-CSRFToken');

      this.csrfToken = token;
    },
    async logIn(username, password) {
      try {
        await logInCall(username, password);
        this.loggedIn = true;
        this.username = username;
      }
      catch (err) {
        console.log(err.message);
      }
    }
  },
});
