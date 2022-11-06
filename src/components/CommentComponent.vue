<template>
  <section>
    <h5>{{ comment.username }}</h5>
    <p>{{ comment.body }}</p>
  </section>
</template>

<script>
export default {
  name: "MovieComponent",
  props: {
    comment: Object,
  },
};
</script>
