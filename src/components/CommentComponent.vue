<template>
  <div class="comment-container">
    <div class="edit-delete-functions" v-if="user_owned">
      <button class="icon-button" @click="edit_form_is_open = !edit_form_is_open">
        <EditIcon />
      </button>
      <button class="icon-button" @click="deleteComment">
        <DeleteIcon />
      </button>
    </div>
    <div>
      <h5>{{ comment.username }}</h5>
      <p v-if="!edit_form_is_open">{{ comment.body }}</p>
      <div class="review-form-container" v-if="edit_form_is_open">
        <form @submit.prevent="editComment">
          <label for="body-input">Text:</label>
          <input type="text" id="body-input" v-model="comment.body"/>
          <button type="submit">Accept edits</button>
        </form>
        <div v-if="errors.length" class="errors">
          <ul>
            <li v-for="error in errors">{{ error }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import API from '@/services/api.js';
import process_errors from '@/services/error_processing.js';
import DeleteIcon from "@/components/icons/IconDelete.vue";
import EditIcon from "@/components/icons/IconEdit.vue";
import { ref } from 'vue';
import { useAuthStore } from "@/stores/auth_store.js";
import { storeToRefs } from 'pinia';

export default {
  name: "MovieComponent",
  components: {
    DeleteIcon,
    EditIcon
  },
  props: ["comment"],
  setup(props){
    const edit_form_is_open = ref(false);
    const authStore = useAuthStore();
    const {loggedIn, userId} = storeToRefs(authStore);
    const user_owned = ref(loggedIn.value && userId.value === props.comment.user);
    const comment = ref(props.comment)

    const errors = ref([])

    async function editComment() {
      while (errors.value.length) { errors.value.pop(); }
      try {
        await API(true).patch(`comment/${comment.value.id}/`, {body:comment.value.body})
        edit_form_is_open.value = false
      }
      catch (err) {
        errors.value = process_errors(err)
      }
    }
    async function deleteComment() {
      await API(true).delete(`comment/${comment.value.id}/`)
      window.location.reload();
    }
    return {edit_form_is_open, user_owned, editComment, deleteComment, comment, errors}
  }
};
</script>

<style scoped>
.comment-container {
  text-align: left;
  margin-top: 2em;
  width: 80%;
  padding: 0.5em;
  background-color: var(--clr-main-dark);
}

form {
  margin-top: 1em;
  padding: 0.5em;
}
</style>
