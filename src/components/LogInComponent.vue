<template>
  <div class="dropdown-container">
    <button @click="open_dropdown">LOG IN</button>
    <div class="dropdown" :class="{ opened: dropdown_is_open}">
      <div class="login-dropdown" v-if="!register_is_open">
        <form>
          <label>username</label>
          <input type="text">
          <label>password</label>
          <input type="text">
          <button>log in</button>
        </form>
      </div>
      <RegisterComponent v-if="register_is_open"/>
      <button v-if="!register_is_open" @click="register_is_open = true">register</button>
      <button v-if="register_is_open" @click="register_is_open = false">log in</button>
    </div>
  </div>
</template>

<script>
import RegisterComponent from './RegisterComponent.vue';

export default {
  name: "LogInComponent",
  data() {
    return {
      dropdown_is_open: false,
      register_is_open: false,
      username: "",
      password: "",
    };
  },
  components: {
    RegisterComponent
  },
  methods: {
    logIn() {
    },
  }
};
</script>

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
