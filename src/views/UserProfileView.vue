<script>
import ReviewComponent from "@/components/ReviewComponent.vue";
import API from '@/services/api.js';
import process_errors from '@/services/error_processing.js';
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
        await API(true).post('movies/', {
          title_pl:title_pl.value,
          title_eng:title_eng.value,
          year:year.value,
          runtime:runtime.value,
          director:director.value,
          writer:writer.value
        })
        window.location.reload();
      }
      catch (err) {
        errors.value = process_errors(err)
      }
    };

    const user = await fetchUser()
    allow_movie_adding.value = loggedIn.value && is_staff.value && userId.value === user.id
  
    return {user, addMovie, add_form_is_open, allow_movie_adding, title_pl, title_eng, year, runtime, director, writer, errors}
  },
};
</script>

<template>
  <div>
    <div>
      <button v-if="allow_movie_adding" @click="add_form_is_open = !add_form_is_open">Add movie to the database</button>
      <div class="review-form-container" v-if="add_form_is_open">
        <form @submit.prevent="addMovie">
          <label for="title_pl-input">Title pl</label>
          <input type="text" id="title_pl-input" v-model="title_pl" required/>
          <label for="title_eng-input">Title eng</label>
          <input type="text" id="title_eng-input" v-model="title_eng" required/>
          <label for="year-input">Year</label>
          <input type="text" id="year-input" v-model="year" required/>
          <label for="runtime-input">Runtime</label>
          <input type="text" id="runtime-input" v-model="runtime" required/>
          <label for="director-input">Director</label>
          <input type="text" id="director-input" v-model="director" required/>
          <label for="writer-input">Writer</label>
          <input type="text" id="writer-input" v-model="writer" required/>

          <button type="submit">Add</button>
        </form>
        <div v-if="errors.length" class="errors">
          <ul>
            <li v-for="error in errors">{{ error }}</li>
          </ul>
        </div>
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

form {
  background-color: var(--clr-main-dark);
}
</style>
