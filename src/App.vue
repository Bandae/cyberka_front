<script setup>
// moze chowac komentarze za guzikiem, po kliknieciu dopiero wziac dokladny serializer recenzji i pokazac a takto tylko ilosc komentarzy. albo 3 pierwsze czy cos takiego.
// zrobic cos z suspense w app.vue
// zniknac write_review guzik jak juz ktos napisal recenzje
// nie pokazywac w recenzji nic poza gwiadkami i nickiem jak nie ma tekstu

import { RouterView } from 'vue-router'
</script>

<template>
  <header>
    <h2>
      <img src="@/assets/CybLogo.png" alt="">
      <router-link :to="`/`" class="page-name">CYBERKA</router-link>
    </h2>
    <LogInComponent class="login-component"/>
  </header>
  <Suspense>
    <RouterView />
  </Suspense>
  <footer>
    <div>
      <p>Cyberka</p>
    </div>
  </footer>
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
    const authStore = useAuthStore();
    try {
      const res = await API(true).get('user-me/');
      authStore.username = res.data.username;
      authStore.loggedIn = true;
      authStore.userId = res.data.id;
      authStore.is_staff = res.data.is_staff;
    }
    catch (err) {
      authStore.loggedIn = false;
    }
  },
};
</script>

<style scoped>
header {
  background-image: linear-gradient(var(--clr-main-dark) 60%, rgba(0, 0, 0, 0));
  position: fixed;
  z-index: 999;
  top: 0;
  height: 7em;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
}

header h2 {
  grid-column: 2;
  display: grid;
}

header img {
  width: 6em;
  grid-row: 1 / 4;
  grid-column: 1 / 4;
}

.page-name {
  font-family: "Righteous", Arial;
  font-size: calc(var(--fs-big) * 1.3);
  letter-spacing: 3px;
  grid-row: 2;
  grid-column: 2 / 5;
}

@media screen and (max-width: 600px) {
  header {
    grid-template-columns: 1fr auto 1fr;
  }

  header h2 {
    margin-left: none;
    grid-column: 2;
  }

  header img {
    width: 4em;
    grid-row: 1 / 4;
    grid-column: 1 / 4;
  }

  .login-component {
    grid-column: 3;
    /* margin-right: auto; */
  }
}
</style>
