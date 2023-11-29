<script>
import API from '@/services/api.js';
import process_errors from '@/services/error_processing.js';
import { ref } from 'vue'

export default {
  name: "EditMovieComponent",
  props: ["movie"],
  emits: ['close-form'],
  async setup(props, { emit }) {
    const movie = props.movie
    const errors = ref([])

    async function editMovie() {
      while (errors.value.length) { errors.value.pop(); }
      try {
        await API(true).patch(`movie/${movie.id}/`, {
          title_pl:movie.title_pl,
          title_eng:movie.title_eng,
          year:movie.year,
          runtime:movie.runtime,
          director:movie.director,
          writer:movie.writer
        })
        emit('close-form');
      }
      catch (err) {
        errors.value = process_errors(err)
      }
    }

    return {movie, editMovie, errors}
  },
};
</script>
    
<template>
<div>
  <form @submit.prevent="editMovie">
    <label for="title_pl-input">Title pl</label>
    <input type="text" id="title_pl-input" v-model="movie.title_pl"/>
    <label for="title_eng-input">Title eng</label>
    <input type="text" id="title_eng-input" v-model="movie.title_eng"/>
    <label for="year-input">Year</label>
    <input type="text" id="year-input" v-model="movie.year"/>
    <label for="runtime-input">Runtime</label>
    <input type="text" id="runtime-input" v-model="movie.runtime"/>
    <label for="director-input">Director</label>
    <input type="text" id="director-input" v-model="movie.director"/>
    <label for="writer-input">Writer</label>
    <input type="text" id="writer-input" v-model="movie.writer"/>
    <button type="submit">Accept edits</button>
  </form>
  <div v-if="errors.length" class="errors">
    <ul>
      <li v-for="error in errors">{{ error }}</li>
    </ul>
  </div>
</div>
</template>
