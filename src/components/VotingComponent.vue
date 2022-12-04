<template>
  <div>
    <button @click="sendVote('up')" :disabled="isButtonDisabled">up</button>
    <div>{{ review.score }}</div>
    <button @click="sendVote('down')" :disabled="isButtonDisabled">down</button>
  </div>
</template>

<script>
export default {
  name: "VotingComponent",
  data() {
    return {
      upvote: false,
      downvote: false,
    };
  },
  props: {
    vote: Object,
  },
  methods: {
    sendVote(vote_type) {
      console.log(vote_type);
      // wyslac, vote_type to up albo down
      // jak jest up i kliknie up to wyslac false false
      // jak jest downe i kliknie downe to wyslac false false
      // jak jest up i kliknie down to wyslac false true
      // jak jest down i kliknie up to wyslac true false
    },
    isButtonDisabled() {
      // disabled if user is not logged, moze jak wlasny ale niew iem
    },
    // moze created albo mounted i wpisac do upvote i downvote
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
