<script>
import authAPI from '@/services/auth_api.js';
import { useAuthStore } from "@/stores/auth_store.js";
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

export default {
  name: "WriteReviewComponent",
  props: ['movieId'],
  setup(props){
    const authStore = useAuthStore();
    const {username, loggedIn} = storeToRefs(authStore);
    const errors = ref([])
    const rating_value = ref("")
    const body = ref("")

    async function handleSubmit() {
      while (errors.value.length) { errors.value.pop(); }

      if(loggedIn.value !== true) {
        errors.value.push('You need to log in to post reviews.')
        return
      }
      try {
        await authAPI().post('reviews/', {movie:props.movieId, rating_value:rating_value.value, body:body.value})
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

    return {rating_value, body, errors, handleSubmit}
  }
};
</script>

<template>
  <div>
    <div class="review-form-container">
      <form @submit.prevent="handleSubmit">
        <div class="stars">
          <input type="radio" name="star" value="1" id="star1" v-model="rating_value"/>
          <label for="star1"></label>
          <input type="radio" name="star" value="2" id="star2" v-model="rating_value"/>
          <label for="star2"></label>
          <input type="radio" name="star" value="3" id="star3" v-model="rating_value"/>
          <label for="star3"></label>
          <input type="radio" name="star" value="4" id="star4" v-model="rating_value"/>
          <label for="star4"></label>
          <input type="radio" name="star" value="5" id="star5" v-model="rating_value"/>
          <label for="star5"></label>
          <input type="radio" name="star" value="6" id="star6" v-model="rating_value"/>
          <label for="star6"></label>
          <input type="radio" name="star" value="7" id="star7" v-model="rating_value"/>
          <label for="star7"></label>
          <input type="radio" name="star" value="8" id="star8" v-model="rating_value"/>
          <label for="star8"></label>
          <input type="radio" name="star" value="9" id="star9" v-model="rating_value"/>
          <label for="star9"></label>
          <input type="radio" name="star" value="10" id="star10" v-model="rating_value" />
          <label for="star10"></label>
        </div>
        <!-- <input type="text" id="title-input" v-model="title"/> -->
        <input type="text" id="body-input" v-model="body"/>
        <button type="submit">Add review</button>
      </form>
    </div>
    <div v-if="errors.length" class="errors">
      <ul>
        <li v-for="error in errors">{{ error }}</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.review-form-container {
  background-color: var(--clr-main-dark);
  margin-top: 2rem;
  border-radius: 0, 0, 20rem, 20rem;
}

input[type="radio"] {
  opacity: 0;
  width: 0;
  height: 0;
  border: 0;
}

.stars {
  display: flex;
}

label::before {
  cursor: pointer;
  content: "";
  width: 30px;
  height: 30px;
  display: block;
  background-color: yellowgreen;
}

:not(input[type="radio"]:checked ~ input[type="radio"]) + label::before,
input[type="radio"]:checked + label::before {
  background-color: brown;
}
</style>
