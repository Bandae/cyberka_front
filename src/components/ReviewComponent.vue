<template>
  <section>
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
      <h3>{{ review.title }}</h3>
      <p>{{ review.body }}</p>
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

export default {
  name: "ReviewComponent",
  data() {
    return {
      comment_body: "",
      comment_form_is_open: false,
    };
  },
  components: {
    VotingComponent,
    CommentComponent,
  },
  props: {
    review: Object,
  },
  methods: {
    async addComment() {
      try {
        await authAPI().post('comments/', {review:this.review.id, body:this.comment_body})
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
    },
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
