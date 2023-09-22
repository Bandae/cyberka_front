<template>
  <div>
    <button @click="sendVote('up')" :disabled="buttonsDisabled">up</button>
    <div>{{ totalVote }}</div>
    <button @click="sendVote('down')" :disabled="buttonsDisabled">down</button>
  </div>
</template>

<script>
import authAPI from '@/services/auth_api.js';
import { useAuthStore } from "@/stores/auth_store.js";
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

export default {
  name: "VotingComponent",
  props: ["reviewId", "totalVote"],
  setup(props){
    const authStore = useAuthStore();
    const {userId, username, loggedIn} = storeToRefs(authStore);
    const errors = ref([])
    const buttonsDisabled = ref(!loggedIn.value)
    const existingVote = ref(null)
    const total_vote = props.totalVote

    async function sendVote(type) {
      while (errors.value.length) { errors.value.pop(); }

      try {
        const res = await authAPI().get(`myvote/review=${props.reviewId}/`)
        existingVote.value = res.data[0]
      }
      catch(err){}

      try {
        const upvote = type === 'up' ? true : false
        const downvote = type === 'down' ? true : false

        if(existingVote.value === null || existingVote.value === undefined){
          await authAPI().post('votes/', {review:props.reviewId, upvote:upvote, downvote:downvote})

        }
        else{
          const old_upvote = existingVote.value.upvote
          const old_downvote = existingVote.value.downvote

          await authAPI().patch(`vote/${existingVote.value.id}/`, {review:props.reviewId, upvote:(upvote && ((!old_downvote && !old_upvote) || old_downvote)), downvote:(downvote && ((!old_downvote && !old_upvote) || old_upvote))})
        }
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
    }
    return {total_vote, buttonsDisabled, sendVote}
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
