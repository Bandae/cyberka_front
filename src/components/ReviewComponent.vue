<template>
  <section>
    <div class="owner-functions" v-if="user_owned">
      <button @click="edit_form_is_open = !edit_form_is_open">Edit</button>
      <button @click="deleteReview">Delete</button>
    </div>
    <div class="review-form-container" v-if="edit_form_is_open">
      <form @submit.prevent="editReview">
        <div class="stars">
          <input type="radio" name="star" value="1" id="star1" v-model="new_rating_value"/>
          <label for="star1"></label>
          <input type="radio" name="star" value="2" id="star2" v-model="new_rating_value"/>
          <label for="star2"></label>
          <input type="radio" name="star" value="3" id="star3" v-model="new_rating_value"/>
          <label for="star3"></label>
          <input type="radio" name="star" value="4" id="star4" v-model="new_rating_value"/>
          <label for="star4"></label>
          <input type="radio" name="star" value="5" id="star5" v-model="new_rating_value"/>
          <label for="star5"></label>
          <input type="radio" name="star" value="6" id="star6" v-model="new_rating_value"/>
          <label for="star6"></label>
          <input type="radio" name="star" value="7" id="star7" v-model="new_rating_value"/>
          <label for="star7"></label>
          <input type="radio" name="star" value="8" id="star8" v-model="new_rating_value"/>
          <label for="star8"></label>
          <input type="radio" name="star" value="9" id="star9" v-model="new_rating_value"/>
          <label for="star9"></label>
          <input type="radio" name="star" value="10" id="star10" v-model="new_rating_value" />
          <label for="star10"></label>
        </div>
        <!-- <input type="text" id="title-input" v-model="title"/> -->
        <input type="text" id="body-input" v-model="new_body"/>
        <button type="submit">Accept edits</button>
      </form>
    </div>
    <div v-if="!edit_form_is_open">
      <div class="review-header">
        <h5>{{ review.username }}</h5>
        <div class="stars">
          <!-- gwiazdki -->
          <img src="../assets/logo.png" alt="" />
          <img src="../assets/logo.png" alt="" />
          <img src="../assets/logo.png" alt="" />
          <img src="../assets/logo.png" alt="" />
          <img src="../assets/logo.png" alt="" />
        </div>
        <p>{{ review.rating_value }}</p>
      </div>
      <div>
        <!-- <h3>{{ review.title }}</h3> -->
        <p>{{ review.body }}</p>
      </div>
    </div>

    <div>
      <VotingComponent :review-id="review.id" :total-vote="review.total_vote"/>
      <button @click="comment_form_is_open = !comment_form_is_open">napisz kom</button>
      <!-- <div>ilosc komentarzy</div> -->
    </div>
  </section>
  <div class="write-comment" v-show="comment_form_is_open">
    <form @submit.prevent="addComment">
      <input type="text" id="body-input" v-model="comment_body" />
      <button type="submit">Add comment</button>
    </form>
  </div>
  <div class="comment-container">
    <CommentComponent
      :key="comment.id"
      v-for="comment in review.comments"
      :comment="comment"
    />
  </div>
</template>

<script>
import CommentComponent from "@/components/CommentComponent.vue";
import VotingComponent from "@/components/VotingComponent.vue";
import authAPI from '@/services/auth_api.js';
import { ref } from 'vue';
import { useAuthStore } from "@/stores/auth_store.js";
import { storeToRefs } from 'pinia';

export default {
  name: "ReviewComponent",
  components: {
    VotingComponent,
    CommentComponent,
  },
  props: ["review"],
  setup(props){
    const comment_form_is_open = ref(false);
    const edit_form_is_open = ref(false);
    const comment_body = ref("");
    const authStore = useAuthStore();
    const {loggedIn, userId} = storeToRefs(authStore);
    const user_owned = ref(loggedIn.value && userId.value === props.review.user);
    const new_rating_value = ref("");
    const new_body = ref(props.review.body);

    async function addComment() {
      try {
        await authAPI().post('comments/', {review:props.review.id, body:comment_body.value})
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
    async function editReview() {
      try {
        await authAPI().patch(`review/${props.review.id}/`, {rating_value:new_rating_value.value, body:new_body.value})
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
    async function deleteReview() {
      try {
        await authAPI().delete(`review/${props.review.id}/`)
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
    return {comment_body, comment_form_is_open, edit_form_is_open, addComment, user_owned, editReview, deleteReview, new_rating_value, new_body}
  }
};
</script>

<style scoped>
section {
  text-align: left;
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  background-color: var(--clr-main-dark);
  border-radius: 20px 20px 0 0;
}

.stars {
  display: flex;
}

img {
  width: 30px;
}

section > div:nth-of-type(1) {
  display: flex;
  justify-content: space-between;
  padding: 2rem;
  /* width: 80%; */
  /* flex: 3, 1, 75%; */
}

comment-container {
  width: 300px;
  height: 200px;
}
</style>
