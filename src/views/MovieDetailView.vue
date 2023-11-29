<script>
import EditMovieComponent from "@/components/EditMovieComponent.vue";
import ReviewComponent from "@/components/ReviewComponent.vue";
import WriteReviewComponent from "@/components/WriteReviewComponent.vue";
import DeleteIcon from "@/components/icons/IconDelete.vue";
import EditIcon from "@/components/icons/IconEdit.vue";
import StarIcon from '@/components/icons/IconStar.vue'
import API from '@/services/api.js';
import { ref } from 'vue';
import { useRoute } from 'vue-router'
import { useAuthStore } from "@/stores/auth_store.js";
import { storeToRefs } from 'pinia';

export default {
  name: "MovieDetailView",
  components: {
    EditMovieComponent,
    ReviewComponent,
    WriteReviewComponent,
    DeleteIcon,
    EditIcon,
    StarIcon
  },
  async setup() {
    const route = useRoute()
    const id = route.params.id
    const ReviewFormIsOpen = ref(false)
    const authStore = useAuthStore();
    const {loggedIn, is_staff} = storeToRefs(authStore);
    const allow_movie_editing = ref(false)
    const edit_form_is_open = ref(false)
    
    async function fetchMovie() {
      const res = await API(true).get(`movie/${id}`);
      return res.data;
    }

    const movie = ref(await fetchMovie())

    async function deleteMovie() {
      await API(true).delete(`movie/${movie.value.id}/`)
      window.location.reload();
    }
    
    allow_movie_editing.value = loggedIn.value && is_staff.value

    return {movie, ReviewFormIsOpen, id, allow_movie_editing, deleteMovie, edit_form_is_open, loggedIn}
  },
};
</script>

<template>
  <div class="container-all">
    <div class="movie-container">
      <div class="edit-delete-functions" v-if="allow_movie_editing">
        <button class="icon-button" @click="edit_form_is_open = !edit_form_is_open">
          <EditIcon />
        </button>
        <button class="icon-button" @click="deleteMovie">
          <DeleteIcon />
        </button>
      </div>
      <EditMovieComponent class="movie-edit-form-container" v-if="edit_form_is_open" :movie="movie" @close-form="edit_form_is_open = false"/>
      <div class="info-container" v-if="!edit_form_is_open">
        <img src="../assets/logo.svg" alt="" />
        <div>
          <div>
            <div>
              <h3>{{ movie.title_pl }}</h3>
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
              <div>Director: {{movie.director}}  Writer: {{movie.writer}}</div>
            </div>
          </div>
        </div>
      </div>
      <br>
      <div class="write-review-container">
        <div>
          <span class="triangle"></span>
          <h2>User Reviews</h2>
        </div>
        <button @click="ReviewFormIsOpen = !ReviewFormIsOpen" :disabled="!loggedIn">
          Write review
        </button>
      </div>
    </div>
    <WriteReviewComponent v-show="ReviewFormIsOpen" :movie-id="id"/>

    <div class="reviews-container">
      <ReviewComponent
        :key="review.id"
        v-for="review in movie.movie_reviews"
        :review="review"
      />
    </div>
  </div>
</template>

<style scoped>
.container-all {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 8rem;
}

.movie-container {
  text-align: left;
  margin-top: 5rem;
  padding: 2em;
  display: flex;
  flex-direction: column;
  width: 80%;
  background-color: var(--clr-main-dark);
  border-radius: 20px 20px 0 0;
}

.info-container {
  display: flex;
}

h3, h4 {
  font-size: calc(var(--fs-big) * 0.9);
  padding-bottom: 0.2em;
}
h4 {
  font-size: calc(var(--fs-big) * 0.6);
}
h5 {
  font-size: calc(var(--fs-big) * 0.8);
}

img {
  margin-right: 3rem;
}

.main-info {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
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

.write-review-container {
  display: flex;
  padding: 4em;
  justify-content: space-between;
  align-items: center;
}

.write-review-container > div {
  display: grid;
}

.write-review-container > div > h2 {
  grid-row: 2;
  grid-column: 2 / 5;
  z-index: 3;
}

.triangle {
  grid-row: 1 / 4;
  grid-column: 1 / 4;
  width: 0px;
  height: 0px;
  border-style: solid;
  border-width: 60px 60px 0 0;
  border-color: var(--clr-purple-medium) transparent transparent transparent;
  transform: rotate(0deg);
}

.write-review-container > button {
  cursor: pointer;
  border: 0;
  background-color: var(--clr-purple-medium);
  padding: 0.1em 0.6em;
  border-radius: 20px;
  font-size: calc(var(--fs-base) * 1.2);
}

.write-review-container > button:hover {
  transform: translateY(-5px);
}

@media screen and (max-width: 400px) {
  .write-review-container {
    flex-direction: column;
  }

  .write-review-container button {
    margin-top: 1em;
  }

  .info-container {
    flex-direction: column;
  }

  img {
    margin-right: 0;
    justify-self: center;
  }
}

.write-review-container > button:disabled {
  cursor: default;
  color: var(--clr-main-dark);
  background-color: var(--clr-star-disabled);
}

.write-review-container > button:hover:disabled {
  transform: none;
}

.vote-info svg {
  color: var(--clr-purple-medium);
}

.reviews-container {
  width: 80%;
}
</style>
