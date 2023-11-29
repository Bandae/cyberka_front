<script>
import API from "@/services/api.js";
import process_errors from '@/services/error_processing.js';
import { ref } from 'vue';

export default {
  name: "RegisterComponent",
  emits: ['register-errors'],
  setup (props, { emit }) {
    const registered = ref(false);
    const username = ref("");
    const email = ref("");
    const password = ref("");
    const password2 = ref("");

    function valid_form() {
      if (password.value !== password2.value){
        emit('register-errors', ['Passwords do not match.']);
      }
      else if (password.value.length < 8){
        emit('register-errors', ['Password must be at least 8 characters long.']);
      }
      // dodac wiecej
      else return true
    };

    async function handleRegister() {
      if (!valid_form()){
        return
      }

      try {
        await API().post('users/', {username:username.value, password:password.value, email:email.value});
        registered.value = true
      }
      catch (err) {
        emit('register-errors', process_errors(err));
      }
    };

    return {
      handleRegister, username, email, password, password2, registered
    };
  },
};
</script>

<template>
  <div class="register-dropdown" v-if="!registered">
    <form @submit.prevent="handleRegister">
      <label>username</label>
      <input type="text" v-model="username" required>

      <label>email</label>
      <input type="email" v-model="email" required>
  
      <label>Password</label>
      <input type="password" v-model="password" required>
      
      <label>Repeat Password</label>
      <input type="password" v-model="password2" required>

      <button type="submit">Register</button>
    </form>
  </div>
  <div v-if="registered">
    You have been registered successfully.
  </div>
</template>

<style scoped>
form {
  padding: 0.2em;
}

input {
  margin-bottom: .5rem;
}
</style>