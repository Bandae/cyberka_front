<template>
  <div class="voting-container">
    <button class="icon-button upvoteIcon" @click="sendVote('up')" :disabled="buttonsDisabled" :class="{ greyout: existingVote?.downvote}">
      <UpvoteIcon />
    </button>
    <p>{{ totalVote }}</p>
    <button class="icon-button downvoteIcon" @click="sendVote('down')" :disabled="buttonsDisabled" :class="{ greyout: existingVote?.upvote }">
      <UpvoteIcon />
    </button>
  </div>
</template>

<script>
import API from '@/services/api.js';
import { useAuthStore } from "@/stores/auth_store.js";
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import UpvoteIcon from './icons/UpvoteArrow.vue'

export default {
  name: "VotingComponent",
  props: ["reviewId", "totalVote", "currentUserVote"],
  components: {
    UpvoteIcon
  },
  setup(props){
    const authStore = useAuthStore();
    const {userId, username, loggedIn} = storeToRefs(authStore);
    const errors = ref([])
    const buttonsDisabled = ref(!loggedIn.value)
    const existingVote = ref(props.currentUserVote)
    const total_vote = props.totalVote

    async function sendVote(type) {
      while (errors.value.length) { errors.value.pop(); }
      if (!existingVote.value){
        try {
          const res = await API(true).get(`myvote/review=${props.reviewId}/`)
          existingVote.value = res.data[0]
        }
        catch(err){}
      }
      const upvote = type === 'up' ? true : false
      const downvote = type === 'down' ? true : false

      if(existingVote.value === null || existingVote.value === undefined){
        await API(true).post('votes/', {review:props.reviewId, upvote:upvote, downvote:downvote})
      }
      else{
        const old_upvote = existingVote.value.upvote
        const old_downvote = existingVote.value.downvote

        await API(true).patch(`vote/${existingVote.value.id}/`, {review:props.reviewId, upvote:(upvote && ((!old_downvote && !old_upvote) || old_downvote)), downvote:(downvote && ((!old_downvote && !old_upvote) || old_upvote))})
      }
      window.location.reload();
    }
    return {total_vote, buttonsDisabled, sendVote, existingVote}
  }
};
</script>

<style scoped>
.voting-container{
  display: flex;
  align-items: center;
}

button {
  width: 40px;
}

.upvoteIcon {
  color: var(--clr-upvote);
}

.upvoteIcon:hover {
  transform: translateY(-5px);
}

.downvoteIcon {
  transform: rotate(180deg);
  color: var(--clr-downvote);
}

.downvoteIcon:hover {
  transform: rotate(180deg) translateY(5px);
}

.upvoteIcon:disabled {
  color: var(--clr-star-disabled);
}

.upvoteIcon:hover:disabled {
  transform: none;
  cursor: default;
}

.downvoteIcon:disabled {
  transform: rotate(180deg);
  color: var(--clr-star-disabled);
}

.downvoteIcon:hover:disabled {
  transform: rotate(180deg);
  cursor: default;
}

.greyout {
  color: var(--clr-star-disabled) !important;
}
</style>
