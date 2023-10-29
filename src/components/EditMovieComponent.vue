<script>
import authAPI from '@/services/auth_api.js';

export default {
  name: "EditMovieComponent",
  props: ["movie"],
  async setup(props) {
    const movie = props.movie

    async function editMovie() {
      try {
        await authAPI().patch(`movie/${movie.id}/`, {
          title_pl:movie.title_pl,
          title_eng:movie.title_eng,
          year:movie.year,
          runtime:movie.runtime,
          director:movie.director,
          writer:movie.writer
        })
        
      }
      catch (err) {
        console.log(err)
        // const server_errors = err.response.data

        // for (const error in server_errors) {
        //   if (server_errors[error].constructor === Array) {
        //     errors.value.push(error);
        //     for (const s_er in server_errors[error]){
        //       errors.value.push(server_errors[error][s_er]);
        //     }
        //   }
        //   else{
        //     errors.value.push(server_errors[error]);
        //   }
      }
    }

    return {movie, editMovie}
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
</div>
</template>
