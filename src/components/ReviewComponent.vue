<template>
  <div class="review-container">
    <div class="edit-delete-functions" v-if="user_owned">
      <button class="icon-button" @click="edit_form_is_open = !edit_form_is_open">
        <EditIcon />
      </button>
      <button class="icon-button" @click="deleteReview">
        <DeleteIcon />
      </button>
    </div>
    <div class="review-form-container" v-if="edit_form_is_open">
      <form @submit.prevent="editReview">
        <div class="edit-stars">
          <template :key="index" v-for="index in 10">
            <input type="radio" name="editstar" :value="index" :id="`editstar${index}`" v-model="new_rating_value"/>
            <label :for="`editstar${index}`">
              <StarIcon />
            </label>
          </template>
        </div>
        <!-- <input type="text" id="title-input" v-model="title"/> -->
        <label for="body-input">Text</label>
        <input type="text" id="body-input" v-model="new_body"/>
        <button type="submit">Accept edits</button>
      </form>
    </div>
    <div v-if="!edit_form_is_open">
      <div class="review-header">
        <h5>{{ review.username }}</h5>
        <div class="stars">
          <StarIcon
            :key="index"
            v-for="index in 10"
            :class="{ isRating: review.rating_value === index }"
          />
        </div>
      </div>
      <!-- <h3>{{ review.title }}</h3> -->
      <p>{{ review.body }}</p>
    </div>

    <div class="response-container">
      <VotingComponent :review-id="review.id" :total-vote="review.total_vote"/>
      <div class="response-comment-container">
        <p>{{ comment_amount }} comments</p>
        <button @click="comment_form_is_open = !comment_form_is_open">write comment...</button>
      </div>
    </div>
  </div>
  <div class="write-comment" v-show="comment_form_is_open">
    <form @submit.prevent="addComment">
      <input type="text" id="body-input" v-model="comment_body" />
      <button type="submit">Add comment</button>
    </form>
  </div>
  <div class="comments-container">
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
import StarIcon from './icons/IconStar.vue'
import DeleteIcon from "@/components/icons/IconDelete.vue";
import EditIcon from "@/components/icons/IconEdit.vue";
import authAPI from '@/services/auth_api.js';
import { ref } from 'vue';
import { useAuthStore } from "@/stores/auth_store.js";
import { storeToRefs } from 'pinia';

export default {
  name: "ReviewComponent",
  components: {
    VotingComponent,
    CommentComponent,
    StarIcon,
    DeleteIcon,
    EditIcon
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
    const comment_amount = props.review.comments.length

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
    return {comment_body, comment_form_is_open, edit_form_is_open, addComment, user_owned, editReview, deleteReview, new_rating_value, new_body, comment_amount}
  }
};
</script>

<style scoped>
.review-container {
  text-align: left;
  padding: 1em;
  margin-top: 3em;
  background-color: var(--clr-main-dark);
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stars svg {
  width: 30px;
  color: var(--clr-star-disabled);
}

.isRating,
.stars svg:not(.isRating ~ svg) {
  color: var(--clr-purple-medium);
}

.response-container {
  display: flex;
  margin-top: 2em;
}

.response-comment-container {
  display: flex;
  align-items: center;
  margin-left: 4em;
}

.response-comment-container > button {
  cursor: pointer;
  border: 0;
  background-color: var(--clr-purple-medium);
  padding: 0.1em 0.6em;
  border-radius: 20px;
  margin-left: 1em;
}

.response-comment-container > button:hover {
  transform: translateY(-5px);
}

.comments-container {
  display: flex;
  flex-direction: column;
  align-items: end;
}

.write-comment form {
  margin-top: 1em;
  padding: 1em;
  background-color: var(--clr-main-dark);
}
</style>
