<script setup>
// TODO: jak jest to podswietlic przycisk od danego vote ktore jest true
// moze chowac komentarze za guzikiem, po kliknieciu dopiero wziac dokladny serializer recenzji i pokazac a takto tylko ilosc komentarzy. albo 3 pierwsze czy cos takiego.
// zrobic cos z suspense w app.vue
// ogarnac wyswietlanie bledow normalnie, wyrzucic caly kod z try catch .post na wsztko (review, vote, comment) do jakiegos service np.
// dodac bledy w logowaniu wyswietlanie
import { RouterView } from 'vue-router'
</script>

<template>
  <header>
    <h2>
      <img src="@/assets/CybLogo.png" alt="">
      <router-link :to="`/`" class="page-name">CYBERKA</router-link>
    </h2>
    <LogInComponent />
  </header>
  <Suspense>
    <RouterView />
  </Suspense>
</template>

<script>
import LogInComponent from "@/components/LogInComponent.vue";
import API from "./services/api.js";
import { useAuthStore } from "@/stores/auth_store.js";

export default {
  components: {
    LogInComponent,
  },
  methods: {
    getCSRFcookie() {
      return this.$cookies.get("csrftoken")
    }
  },
  async created() {
    try {
      const token = await this.getCSRFcookie();
      const res = await API(true).get('user-me/');
      const authStore = useAuthStore();
      authStore.username = res.data.username;
      authStore.loggedIn = true;
      authStore.userId = res.data.id;
      authStore.is_staff = res.data.is_staff;
      authStore.csrfToken = token;
    }
    catch (err) {
      console.log(err.message);
    }
  },
};
</script>

<style scoped>
header {
  background-image: linear-gradient(var(--clr-main-dark) 60%, rgba(0, 0, 0, 0));
  position: fixed;
  top: 0;
  height: 7rem;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
}

header h2 {
  margin-left: auto;
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
  font-size: 3rem;
  letter-spacing: 3px;

  grid-row: 2;
  grid-column: 2 / 5;
}
</style>
