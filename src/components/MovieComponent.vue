<script setup>
import StarIcon from './icons/IconStar.vue'
</script>

<template>
  <div class="movie-container">
    <img src="../assets/logo.svg" alt="" />
    <div>
      <div>
        <router-link :to="`/movie/${movie.id}`">
          <h3>{{ movie.title_pl }}</h3>
        </router-link>
        <div class="main-info">
          <h4>{{ movie.title_eng }}</h4>
          <h4>{{ movie.year }}</h4>
          <h4>{{ movie.runtime }}min</h4>
        </div>
      </div>
      <div class="vote-info">
        <StarIcon />
        <div>
          <h5>{{ movie.avg_rating }}</h5>
          <p>{{ movie.review_amount }} reviews</p>
        </div>
      </div>
      <div class="secondary-info">
        <div class="movie-description">{{ movie.description }}</div>
        <!-- <div class="movie-genres">{{movie.genres}}</div> -->
        <div>Director: {{movie.director}}  Writer: {{movie.writer}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MovieComponent",
  props: {
    movie: Object,
  },
};
</script>

<style scoped>
.movie-container {
  text-align: left;
  margin-top: 5rem;
  display: flex;
  width: 80%;
  background-color: var(--clr-main-dark);
  border-radius: 20px;
}
h3, h4 {
  line-height: 1.2;
  font-size: 2rem;
  padding-bottom: 1em;
}
h4 {
  font-size: 1.5rem;
}
h5 {
  line-height: 1.2;
  font-size: 1.5rem;
}
.movie-container > div {
  padding: 2rem;
}
.movie-container > img {
  padding: 2rem 2rem 2rem 2rem;
  margin-right: 3rem;
}
.main-info {
  display: flex;
  gap: 20px;
}
.vote-info {
  display: flex;
  margin-bottom: 1em;
}
.vote-info > div {
  display: flex;
  flex-direction: column;
  justify-content: end;
  margin-left: 1em;
}

svg {
  color: var(--clr-purple-medium);
}
</style>
