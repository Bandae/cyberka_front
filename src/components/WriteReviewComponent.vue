<script>
import authAPI from '@/services/auth_api.js';
import StarIcon from './icons/IconStar.vue'
import { useAuthStore } from "@/stores/auth_store.js";
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

export default {
  name: "WriteReviewComponent",
  components: {
    StarIcon
  },
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
        <div class="edit-stars">
          <template :key="index" v-for="index in 10">
            <input type="radio" name="newstar" :value="index" :id="`newstar${index}`" v-model="rating_value"/>
            <label :for="`newstar${index}`">
              <StarIcon />
            </label>
          </template>
        </div>
        <!-- <input type="text" id="title-input" v-model="title"/> -->
        <label for="body-input">Text</label>
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
}
</style>
