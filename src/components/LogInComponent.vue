<script>
import RegisterComponent from './RegisterComponent.vue';
import AccountIcon from './icons/AccountCircle.vue'
import { useAuthStore } from "@/stores/auth_store.js";
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

export default {
  name: "LogInComponent",
  components: {
    RegisterComponent,
    AccountIcon
  },
  setup () {
    const dropdown_is_open = ref(false);
    const register_is_open = ref(false);
    const authStore = useAuthStore();
    const {loggedIn, username, userId} = storeToRefs(authStore);
    const userInput = ref("")
    const passInput = ref("")

    let errors = ref([])

    async function logIn() {
      while (errors.value.length) { errors.value.pop(); }
      
      const server_errors = await authStore.logIn(userInput.value, passInput.value);
      if (server_errors === null) {
        window.location.reload();
      }
      for (const err in server_errors) {
        errors.value.push(server_errors[err]);
      }
    };

    async function logOut() {
      await authStore.logOut();
      window.location.reload();
    };

    return {
      dropdown_is_open, register_is_open, username, loggedIn, logIn, userInput, passInput, errors, logOut, userId, AccountIcon
    };
  },
};
</script>

<template>
  <div class="dropdown-container">
    <button v-if="!loggedIn" @click="dropdown_is_open=!dropdown_is_open">LOG IN</button>
    <div v-if="!loggedIn" class="dropdown" :class="{ opened: dropdown_is_open }">
      <div class="login-dropdown" v-if="!register_is_open">
        <form @submit.prevent="logIn">
          <label>username</label>
          <input v-model="userInput" type="text" required>
          <label>password</label>
          <input v-model="passInput" type="password" required>
          <button type="submit">log in</button>
        </form>
      </div>
      <RegisterComponent v-if="register_is_open"/>
      <div v-if="errors.length" class="errors">
        <ul>
          <li v-for="error in errors">{{ error }}</li>
        </ul>
      </div>
      <!-- <button v-if="!register_is_open" @click="register_is_open = true" class="button-text-only">register</button>
      <button v-if="register_is_open" @click="register_is_open = false" class="button-text-only">log in</button> -->
      <a v-if="!register_is_open" @click="register_is_open = true">register</a>
      <a v-if="register_is_open" @click="register_is_open = false">log in</a>
    </div>

    <button class="icon-button" v-if="loggedIn" @click="dropdown_is_open=!dropdown_is_open">
      <AccountIcon />
    </button>
    <div v-if="loggedIn" class="dropdown menu-dropdown" :class="{ opened: dropdown_is_open }">
      <router-link :to="`/user/${userId}`">
        <button class="icon-button">{{ username }}</button>
      </router-link>
      <button class="icon-button" @click="logOut">log out</button>
    </div>
  </div>
</template>


<style scoped>
.dropdown-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  justify-content: center;
  position: relative;
  margin-left: auto;
  margin-right: 5rem;
}

.dropdown {
  position: absolute;
  top: calc(100% + .25rem);
  background-color: var(--clr-main-dark);
  padding: 0.5em;
  border-radius: .25rem;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .1);
  opacity: 0;
  pointer-events: none;
  transform: translateY(-10px);
  transition: opacity 150ms ease-in-out, transform 150ms ease-in-out;
}

.dropdown.opened {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

.errors {
  background-color: red;
  padding: 1rem;
  font-size: small;
  border-radius: 5%;
  text-align: left;
}

.errors ul {
  list-style: none;
}

.icon-button > svg {
  width: 40px;
  height: 40px;
  color: var(--clr-white);
}

form {
  padding: 0.2em;
}

</style>
