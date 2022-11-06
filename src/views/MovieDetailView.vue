<template>
  <main>
    <div class="movie-detail-container">
      <div class="main-info">
        <h5>{{ movie.title }}</h5>
        <h5>{{ movie.eng_title }}</h5>
        <div class="vote-info">
          <!-- <svg></svg> -->
          <!-- gwiazdka -->
          <h5>{{ movie.vote_avg }}</h5>
          <p>{{ movie.votes_amount }} reviews</p>
        </div>
      </div>
      <div class="secondary-info">
        <img src="" alt="" />
        <div class="secondary-info-text">
          <div>
            <h5>{{ movie.year }}</h5>
            <h5>{{ movie.runtime }}</h5>
          </div>
          <div>
            <div class="movie-description">{{ movie.description }}</div>
            <div class="movie-genres">{{ movie.genres }}</div>
            <div class="actors">
              Director: {{ movie.director }} Actors: {{ movie.actors }}
            </div>
          </div>
        </div>
      </div>
      <button @click="ReviewFormIsOpen = !ReviewFormIsOpen">
        Write review
      </button>
      <!-- nie wiem jak, moze dropdown form -->
      <!-- i komentarze tak samo -->
    </div>
    <WriteReviewComponent v-show="ReviewFormIsOpen" />

    <div class="reviews-container">
      <MovieReview
        :key="review.id"
        v-for="review in reviews"
        :review="review"
      />
    </div>
  </main>
</template>

<script>
import MovieReview from "@/components/MovieReview.vue";
import WriteReviewComponent from "@/components/WriteReviewComponent.vue";
import API from "@/services/api";

export default {
  name: "MovieDetailView",
  components: {
    MovieReview,
    WriteReviewComponent,
  },
  data() {
    return {
      movie: Object,
      reviews: [],
      ReviewFormIsOpen: false,
    };
  },
  methods: {
    async fetchMovie() {
      const id = this.movie_id;
      const res = await API().get(`movies/${id}`);
      return res.data;
    },
    async fetchReviews() {
      const id = this.movie_id;
      const res = await API().get(`movies/${id}/reviews`);
      return res.data;
    },
  },
  async created() {
    this.movie = await this.fetchMovie();
    this.reviews = await this.fetchReviews();
  },
  computed: {
    movie_id() {
      return parseInt(this.$route.params.id);
    },
  },
};
</script>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 8rem;
}

.movie-detail-container {
  text-align: left;
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  width: 80%;
  background-color: var(--clr-main-dark);
  border-radius: 20px 20px 0 0;
}

h3,
h5 {
  line-height: 1.2;
  font-size: 2rem;
}
h5 {
  font-size: 1.5rem;
}

img {
  padding: 2rem 2rem 2rem 2rem;
  margin-right: 3rem;
  flex: 1, 0, 50%;
}
.main-info {
  display: flex;
  gap: 20px 20px;
  padding: 2em;
}

.main-info > * {
  margin-bottom: 0;
  flex: 1, 0, 50%;
  gap: 20px 20px;
}

.vote-info {
  display: flex;
}

.secondary-info {
  display: flex;
}

.secondary-info-text {
  display: flex;
  flex-direction: column;
}

.secondary-info-text > div:nth-of-type(1) {
  display: flex;
}
</style>
