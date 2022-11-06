<template>
  <div class="movies-container">
    <MovieComponent :key="movie.id" v-for="movie in movies" :movie="movie" />
  </div>
</template>

<script>
// @ is an alias to /src
import MovieComponent from "@/components/MovieComponent.vue";
import API from "@/services/api";

export default {
  name: "HomeView",
  components: {
    MovieComponent,
  },
  data() {
    return {
      movies: [],
    };
  },
  methods: {
    async fetchMovies() {
      const res = await API().get('movies/');
      return res.data;
    },
  },
  async created() {
    this.movies = await this.fetchMovies();
  },
  computed: {
    movie_id() {
      return parseInt(this.$route.params.id);
    },
  },
};
</script>

<style>
.movies-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 8rem;
}

a {
  text-decoration: none;
  font-style: normal;
  color: var(--clr-white);
}

a:hover {
  color: var(--clr-purple-dark);
}

/* .movies-container:first-child {
  margin-top: 8rem;
} */
</style>
