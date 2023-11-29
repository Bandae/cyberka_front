<template>
  <div class="main-container">
    <div class="no-movies" v-if="movies.length == 0">
      <h2>No movies found</h2>
    </div>
    <div class="movies-container" v-else>
      <MovieComponent :key="movie.id" v-for="movie in movies" :movie="movie" />
    </div>
    <aside>
      <form @submit.prevent="searchMovies">
        <p>Advanced movie search</p>
        <label for="title_pl-input">Title pl</label>
        <input type="text" id="title_pl-input" v-model="title_pl"/>
        <label for="title_eng-input">Title eng</label>
        <input type="text" id="title_eng-input" v-model="title_eng"/>
        <label for="year-input">Year</label>
        <input type="text" id="year-input" v-model="year"/>
        <label for="director-input">Director</label>
        <input type="text" id="director-input" v-model="director"/>

        <button type="submit">Search</button>
      </form>
    </aside>
  </div>
</template>

<script>
// @ is an alias to /src
import MovieComponent from "@/components/MovieComponent.vue";
import API from "@/services/api";
import { ref } from 'vue';

export default {
  name: "HomeView",
  components: {
    MovieComponent,
  },
  async setup() {
    const movies = ref([])
    const title_pl = ref("")
    const title_eng = ref("")
    const year = ref("")
    const director = ref("")

    async function fetchMovies() {
      const res = await API().get('movies/');
      return res.data;
    }
    async function searchMovies() {
      const res = await API().get(`movies/title_pl=${title_pl.value}&title_eng=${title_eng.value}&year=${year.value}&director=${director.value}/`);
      movies.value = res.data;
    }
    
    movies.value = await fetchMovies();

    return {movies, searchMovies, title_pl, title_eng, year, director}
  }
};
</script>

<style scoped>
.main-container {
  display: grid;
  margin-top: 5em;
  margin-bottom: 2em;
  grid-template-columns: 5fr auto 1fr 2em;
  align-items: center;
}

.no-movies {
  width: 80%;
  justify-self: center;
  background-color: var(--clr-main-dark);
  border-radius: 20px;
}

.movies-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

aside {
  background-color: var(--clr-main-dark);
  grid-column: 3;
  border-radius: 20px;
}

p {
  margin-bottom: 1em;
}

@media screen and (max-width: 650px) {
  .main-container {
    display: flex;
    flex-direction: column;
  }

  .movies-container {
    width: 100%;
  }

  aside {
    margin-top: 2em;
  }
}
</style>
