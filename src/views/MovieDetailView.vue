<script>
import ReviewComponent from "@/components/ReviewComponent.vue";
import WriteReviewComponent from "@/components/WriteReviewComponent.vue";
import API from "@/services/api";
import authAPI from '@/services/auth_api.js';
import { ref } from 'vue';
import { useRoute } from 'vue-router'
import { useAuthStore } from "@/stores/auth_store.js";
import { storeToRefs } from 'pinia';

export default {
  name: "MovieDetailView",
  components: {
    ReviewComponent,
    WriteReviewComponent,
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
      const res = await API().get(`movie/${id}`);
      return res.data;
    }

    const movie = ref(await fetchMovie())

    async function editMovie() {
      try {
        await authAPI().patch(`movie/${movie.value.id}/`, {
          title_pl:movie.value.title_pl,
          title_eng:movie.value.title_eng,
          year:movie.value.year,
          runtime:movie.value.runtime,
          director:movie.value.director,
          writer:movie.value.writer
        })
        window.location.reload();
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
    async function deleteMovie() {
      try {
        await authAPI().delete(`movie/${movie.value.id}/`)
        window.location.reload();
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
    
    allow_movie_editing.value = loggedIn.value && is_staff.value

    return {movie, ReviewFormIsOpen, id, allow_movie_editing, editMovie, deleteMovie, edit_form_is_open}
  },
};
</script>

<template>
  <div class="container-all">
    <div class="movie-detail-container">
      <div class="staff-functions" v-if="allow_movie_editing">
        <button @click="edit_form_is_open = !edit_form_is_open">Edit</button>
        <button @click="deleteMovie">Delete</button>
      </div>
      <div class="movie-edit-form-container" v-if="edit_form_is_open">
        <form @submit.prevent="editMovie">
          <input type="text" id="title_pl-input" v-model="movie.title_pl"/>
          <input type="text" id="title_eng-input" v-model="movie.title_eng"/>
          <input type="text" id="year-input" v-model="movie.year"/>
          <input type="text" id="runtime-input" v-model="movie.runtime"/>
          <input type="text" id="director-input" v-model="movie.director"/>
          <input type="text" id="writer-input" v-model="movie.writer"/>
          <button type="submit">Accept edits</button>
        </form>
      </div>
      <div class="info-container" v-if="!edit_form_is_open">
        <div class="main-info">
          <h5>{{ movie.title_pl }}</h5>
          <h5>{{ movie.title_eng }}</h5>
          <div class="vote-info">
            <!-- <svg></svg> -->
            <!-- gwiazdka -->
            <h5>{{ movie.avg_rating }}</h5>
            <!-- <p>{{ movie.votes_amount }} reviews</p> -->
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
              <div>
                Director: {{ movie.director }} Writer: {{ movie.writer }}
              </div>
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
