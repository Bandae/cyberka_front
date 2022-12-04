<template>
  <div class="register-dropdown">
    <form @submit.prevent="handleRegister">
      <label>username</label>
      <input type="text" v-model="username" required>
      <!-- tutaj jak jest juz tak nazwa uzytkownika to blad -->

      <label>email</label>
      <input type="email" v-model="email" required>
  
      <label>Password</label>
      <input type="password" v-model="password" required>
      <!-- tu moze bledy z haslem np minimum iles znakow czy cos -->
      
      <label>Repeat Password</label>
      <input type="password" v-model="password2" required>
      <div v-if="errors.passwords_no_match">The passwords do not match</div>

      <button type="submit">Register</button>
    </form>
  </div>
  <!-- moze jakis div na blad i div na sukces czy cos -->
</template>

<script>
export default {
  name: "RegisterComponent",
  data() {
    return {
      username: "",
      email: "",
      password: "",
      password2: "",
      errors: {
        passwords_no_match: false,
      }
    };
  },
  methods: {
    handleRegister() {
      this.errors.passwords_no_match = (this.password !== this.password2);
      if (!(this.errors.some())) {
        
        // tutaj post
      }
    },
  },
}
</script>

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

input {
  margin-bottom: .5rem;
}
</style>