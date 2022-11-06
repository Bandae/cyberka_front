<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <header>
    <h2>CYBERKA</h2>
    <!-- jesli uzytkownik zalogowany to wyswietlic jego imie z linkiem do profilu
          jesli nie to log in i w srodku register -->
  </header>
  <RouterView />
</template>
