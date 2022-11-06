<template>
  <section>
    <img src="../assets/logo.svg" alt="" />
    <div>
      <div>
        <router-link :to="`/movie/${movie.id}`">
          <h3>{{ movie.title }}</h3>
        </router-link>
        <div class="main-info">
          <h5>{{ movie.eng_title }}</h5>
          <h5>{{ movie.year }}</h5>
          <h5>{{ movie.runtime }}min</h5>
        </div>
      </div>
      <div class="vote-info">
        <!-- <svg></svg> -->
        <!-- gwiazdka -->
        <h5>{{ movie.vote_avg }}</h5>
        <p>{{ movie.votes_amount }} reviews</p>
      </div>
      <div class="secondary-info">
        <div class="movie-description">{{ movie.description }}</div>
        <!-- <div class="movie-genres">{{movie.genres}}</div> -->
        <!-- <div class="actors">Director: {{movie.director}}  Actors: {{movie.actors}}</div> -->
        <!-- dodac tu pola moze z iloscia recenzji i link do pisania recenzji -->
      </div>
    </div>
  </section>
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
section {
  text-align: left;
  margin-top: 5rem;
  display: flex;
  width: 80%;
  background-color: var(--clr-main-dark);
  border-radius: 20px;
}
h3,
h5 {
  line-height: 1.2;
  font-size: 2rem;
  padding-bottom: 1em;
}
h5 {
  font-size: 1.5rem;
}

section > div {
  padding: 2rem;
  width: 80%;
  /* flex: 3, 1, 75%; */
}
section > img {
  padding: 2rem 2rem 2rem 2rem;
  margin-right: 3rem;
  flex: 1, 0, 20rem;
}
.main-info {
  display: flex;
  gap: 20px 20px;
}
.vote-info {
  display: flex;
}
</style>
