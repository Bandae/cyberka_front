<script>
import API from "@/services/api.js";
import { ref } from 'vue';

export default {
  name: "RegisterComponent",
  setup () {
    const registered = ref(false);
    const username = ref("");
    const email = ref("");
    const password = ref("");
    const password2 = ref("");

    let errors = ref([])

    function valid_form() {
      if (password.value !== password2.value){
        errors.value.push('Passwords do not match.');
      }
      else if (password.value.length < 8){
        errors.value.push('Password must be at least 8 characters long.');
      }
      // dodac wiecej
      else return true
    };

    async function handleRegister() {
      while (errors.value.length) { errors.value.pop(); }
      if (!valid_form()){
        return
      }

      try {
        await API().post('users/', {username:username.value, password:password.value, email:email.value});
        registered.value = true
      }
      catch (err) {
        console.log(err.response.data);
        const server_errors = err.response.data

        for (const error in server_errors) {
          console.log(server_errors[error])
          if (server_errors[error].constructor === Array) {
            for (const s_er in server_errors[error]){
              errors.value.push(server_errors[error][s_er]);
            }
          }
          else{
            errors.value.push(server_errors[error]);
          }
        }
      }
      
    };

    return {
      handleRegister, errors, username, email, password, password2, registered
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
    <div v-if="errors.length" class="errors">
      <ul>
        <li v-for="error in errors">{{ error }}</li>
      </ul>
    </div>
  </div>
  <div v-if="registered">
    You have been registered successfully.
  </div>
</template>

<style scoped>
/* form {
  background-color: var(--clr-main-dark);
  border-radius: 20px;
  width: 2rem;
  height: 600px;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
} */

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

input {
  margin-bottom: .5rem;
}
</style>