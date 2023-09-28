<script>
import API from "@/services/api";
import { useRoute } from 'vue-router'

export default {
  name: "UserProfileView",
  async setup() {
    const route = useRoute()
    const id = route.params.id
    
    async function fetchUser() {
      const res = await API().get(`user/${id}`);
      return res.data;
    }

    const user = await fetchUser()

    return {user}
  },
};
</script>

<template>
  <div>
    <div class="user-data-container">
      <p>{{ user.username }}</p>
      <p>User reviews:</p>
    </div>
    <div class="reviews-container">
      <ReviewComponent
        :key="review.id"
        v-for="review in user.user_reviews"
        :review="review"
      />
    </div>
  </div>
</template>


<style scoped>
.user-data-container, .reviews-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 8rem;
}
</style>
