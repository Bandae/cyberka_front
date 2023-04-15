import { defineStore } from 'pinia';
import authAPI from '@/services/auth_api.js';

export const useAuthStore = defineStore({
  id: 'authStore',
  state: () => ({
    csrfToken: null,
    loggedIn: false,
    username: ''
  }),
  actions: {
    // async getCSRFToken() {
    //   const res = await fetch('http://127.0.0.1:8000/csrf');
    //   const token = res.headers.get('X-CSRFToken');

    //   this.csrfToken = token;
    //   return token
    // },
    async logIn(username, password) {
      // const token = await this.$cookies.get("csrftoken")
      // this.csrfToken = token;
      try {
        const res = await authAPI().post('login/', {username:username, password:password});
        this.loggedIn = true;
        this.username = username;
        return null
      }
      catch (err) {
        console.log(err.response.data);
        return err.response.data
      }
    },
    async logOut() {
      try {
        const res = await authAPI().post('logout/');
        this.loggedIn = false;
        this.username = '';
      }
      catch (err) {
        console.log(err.response.data);
      }
    }
  },
});
