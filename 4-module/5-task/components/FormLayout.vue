<template>
  <div class="page_meetup-forms">
    <div class="container">
      <h2 class="page__title">{{ title }}</h2>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormLayout',

  props: {
    title: String,
  },
};
</script>

<style scoped>
  .page_meetup-forms {
    padding: 70px 0;
  }
</style>
