<script>
import API from '@/services/api.js';
import process_errors from '@/services/error_processing.js';
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
    const rating_value = ref("10")
    const body = ref("")

    async function handleSubmit() {
      while (errors.value.length) { errors.value.pop(); }

      if(loggedIn.value !== true) {
        errors.value.push('You need to log in to post reviews.')
        return
      }
      try {
        await API(true).post('reviews/', {movie:props.movieId, rating_value:rating_value.value, body:body.value})
        window.location.reload();
      }
      catch (err) {
        errors.value = process_errors(err)
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
        <textarea id="body-input" v-model="body"></textarea>
        <button type="submit">Add review</button>
      </form>
      <div v-if="errors.length" class="errors">
        <ul>
          <li v-for="error in errors">{{ error }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.review-form-container {
  background-color: var(--clr-main-dark);
  margin-top: 2rem;
}
</style>
