<script>
import RegisterComponent from './RegisterComponent.vue';
import { useAuthStore } from "@/stores/auth_store.js";
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router'

export default {
  name: "LogInComponent",
  components: {
    RegisterComponent
  },
  setup () {
    let dropdown_is_open = ref(false);
    const register_is_open = ref(false);
    const authStore = useAuthStore();
    const {username, loggedIn} = storeToRefs(authStore);
    const userInput = ref("")
    const passInput = ref("")

    const router = useRouter()

    function logIn() {
      dropdown_is_open = false;
      authStore.getCSRFToken();
      authStore.logIn(userInput.value, passInput.value);
      console.log(dropdown_is_open);
      // router.push('/');
    };

    return {
      dropdown_is_open, register_is_open, username, loggedIn, logIn, userInput, passInput
    };
  },
};
</script>

<template>
  <div class="dropdown-container">
    <button v-if="!loggedIn" @click="dropdown_is_open=!dropdown_is_open">LOG IN</button>
    <div class="dropdown" :class="{ opened: dropdown_is_open}">
      <div class="login-dropdown" v-if="!register_is_open">
        <form>
          <label>username</label>
          <input v-model="userInput" type="text">
          <label>password</label>
          <input v-model="passInput" type="text">
          <button @click.prevent="logIn">log in</button>
        </form>
      </div>
      <RegisterComponent v-if="register_is_open"/>
      <button v-if="!register_is_open" @click="register_is_open = true">register</button>
      <button v-if="register_is_open" @click="register_is_open = false">log in</button>
    </div>

    <button v-if="loggedIn">{{ username }}</button>
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
  padding: 1rem;
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

input {
  margin-bottom: .5rem;
}

label {
  left: 0;
}
</style>
