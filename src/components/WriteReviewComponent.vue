<template>
  <div class="review-form-container">
    <form @submit.prevent="handleSubmit">
      <div class="stars">
        <input type="radio" name="star" value="1" id="star1" v-model="rating_value"/>
        <label for="star1"></label>

        <input type="radio" name="star" value="2" id="star2" v-model="rating_value"/>
        <label for="star2"></label>

        <input type="radio" name="star" value="3" id="star3" v-model="rating_value"/>
        <label for="star3"></label>

        <input type="radio" name="star" value="4" id="star4" v-model="rating_value"/>
        <label for="star4"></label>

        <input type="radio" name="star" value="5" id="star5" v-model="rating_value"/>
        <label for="star5"></label>

        <input type="radio" name="star" value="6" id="star6" v-model="rating_value"/>
        <label for="star6"></label>

        <input type="radio" name="star" value="7" id="star7" v-model="rating_value"/>
        <label for="star7"></label>

        <input type="radio" name="star" value="8" id="star8" v-model="rating_value"/>
        <label for="star8"></label>

        <input type="radio" name="star" value="9" id="star9" v-model="rating_value"/>
        <label for="star9"></label>

        <input type="radio" name="star" value="10" id="star10" v-model="rating_value" />
        <label for="star10"></label>
      </div>

      <input type="text" id="title-input" v-model="title"/>
      <input type="text" id="body-input" v-model="body"/>

      <button type="submit">Add review</button>
    </form>
    <p> {{ rating_value }}</p>
  </div>
</template>

<script>
export default {
  name: "WriteReviewComponent",
  data() {
    return {
      rating_value: "",
      title: "",
      body: "",
    };
  },
  methods: {
    handleSubmit() {
      // sprawdzic ze musi byc gwiazdki zaznaczone
      // sprawdzic zeby bylo body jesli jest title
      // post zrobic
    },
  }
};
</script>

<style scoped>
.review-form-container {
  background-color: var(--clr-main-dark);
  margin-top: 2rem;
  border-radius: 0, 0, 20rem, 20rem;
}

input[type="radio"] {
  opacity: 0;
  width: 0;
  height: 0;
  border: 0;
}

.stars {
  display: flex;
}

label::before {
  cursor: pointer;
  content: "";
  width: 30px;
  height: 30px;
  display: block;
  background-color: yellowgreen;
}

:not(input[type="radio"]:checked ~ input[type="radio"]) + label::before,
input[type="radio"]:checked + label::before {
  background-color: brown;
}
</style>
