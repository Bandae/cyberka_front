<script>
import ReviewComponent from "@/components/ReviewComponent.vue";
import API from "@/services/api";
import authAPI from '@/services/auth_api.js';
import { useRoute } from 'vue-router'
import { ref } from 'vue';
import { useAuthStore } from "@/stores/auth_store.js";
import { storeToRefs } from 'pinia';

export default {
  name: "UserProfileView",
  components: {
    ReviewComponent,
  },
  async setup() {
    const add_form_is_open = ref(false)
    const allow_movie_adding = ref(false)
    const authStore = useAuthStore();
    const {loggedIn, userId, is_staff} = storeToRefs(authStore);
    const errors = ref([])
    const title_pl = ref("")
    const title_eng = ref("")
    const year = ref("")
    const runtime = ref("")
    const director = ref("")
    const writer = ref("")

    const route = useRoute()
    const id = route.params.id
    
    async function fetchUser() {
      const res = await API().get(`user/${id}`);
      return res.data;
    }
    async function addMovie() {
      while (errors.value.length) { errors.value.pop(); }
      // dodac sprawdzanie np year i runtime
      try {
        await authAPI().post('movies/', {
          title_pl:props.movieId,
          title_eng:rating_value.value,
          year:year.value,
          runtime:runtime.value,
          director:director.value,
          writer:writer.value
        })
        window.location.reload();
      }
      catch (err) {
        console.log(err)
        const server_errors = err.response.data

        for (const error in server_errors) {
          if (server_errors[error].constructor === Array) {
            errors.value.push(error);
            for (const s_er in server_errors[error]){
              errors.value.push(server_errors[error][s_er]);
            }
          }
          else{
            errors.value.push(server_errors[error]);
          }
        }
      }
    };

    const user = await fetchUser()
    allow_movie_adding.value = loggedIn.value && is_staff.value && userId.value === user.id
  
    return {user, addMovie, add_form_is_open, allow_movie_adding, title_pl, title_eng, year, runtime, director, writer}
  },
};
</script>

<template>
  <div>
    <div>
      <button v-if="allow_movie_adding" @click="add_form_is_open = !add_form_is_open">Add movie to the database</button>
      <div class="review-form-container" v-if="add_form_is_open">
        <form @submit.prevent="addMovie">
          <input type="text" id="title_pl-input" v-model="title_pl"/>
          <input type="text" id="title_eng-input" v-model="title_eng"/>
          <input type="text" id="year-input" v-model="year"/>
          <input type="text" id="runtime-input" v-model="runtime"/>
          <input type="text" id="director-input" v-model="director"/>
          <input type="text" id="writer-input" v-model="writer"/>
          <button type="submit">Add</button>
        </form>
      </div>
    </div>
    <div class="user-data-container">
      <p>{{ user.username }}</p>
      <p>User reviews:</p>
    </div>
    <div class="reviews-container">
      <ReviewComponent
        :key="review.id"
        v-for="review in user.user_reviews"
        :review="review"
      />
    </div>
  </div>
</template>


<style scoped>
div {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 8rem;
}
</style>
