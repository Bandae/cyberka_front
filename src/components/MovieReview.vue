<template>
  <section>
    <div>
      <h5>{{ review.username }}</h5>
      <div class="stars">
        <!-- gwiazdki -->
        <img src="../assets/logo.png" alt="" />
        <img src="../assets/logo.png" alt="" />
        <img src="../assets/logo.png" alt="" />
        <img src="../assets/logo.png" alt="" />
        <img src="../assets/logo.png" alt="" />
      </div>
    </div>

    <div>
      <h3>{{ review.title }}</h3>
      <p>{{ review.body }}</p>
    </div>

    <div>
      <div>
        <button @click="sendVote('up')">up</button>
        <div>{{ review.score }}</div>
        <button @click="sendVote('down')">down</button>
      </div>
      <button @click="CommentFormIsOpen = !CommentFormIsOpen">napisz kom</button>
      <!-- <div>ilosc komentarzy</div> -->
    </div>
  </section>
  <div class="write-comment" v-show="CommentFormIsOpen">
    <form @submit.prevent="addComment">
      <input type="text" id="body-input" v-model="comment_body"/>
      <button type="submit">Add comment</button>
    </form>
  </div>
  <div class="comment-container">
    <CommentComponent
      :key="comment.id"
      v-for="comment in comments"
      :comment="comment"
    />
  </div>
</template>

<script>
import CommentComponent from "@/components/CommentComponent.vue";

export default {
  name: "MovieComponent",
  data() {
    return {
      comment_body: "",
      CommentFormIsOpen: false,
    };
  },
  components: {
    CommentComponent,
  },
  props: {
    review: Object,
  },
  methods: {
    addComment() {

    },
    sendVote(vote_type) {
      console.log(vote_type);
      // wyslac, vote_type to up albo down
    },
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
</style>
