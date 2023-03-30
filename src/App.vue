<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <header>
    <h2>CYBERKA</h2>
    <!-- jesli uzytkownik zalogowany to wyswietlic jego imie z linkiem do profilu
          jesli nie to log in i w srodku register -->
    <LogInComponent />
  </header>
  <RouterView />
</template>

<script>
import LogInComponent from "@/components/LogInComponent.vue";
import API from "./services/api.js";
import { useAuthStore } from "@/stores/auth_store.js";

export default {
  components: {
    LogInComponent,
  },
  async created() {
    try {
      const res = await API('http://localhost:8000/',true).get('user-me/');
      const authStore = useAuthStore();
      authStore.username = res.data.username;
      authStore.loggedIn = true;
    }
    catch (err) {
      console.log(err.message);
    }
  },
};
</script>
