<template>
  <button type="button" @click="handleClick" :value="count">{{ count }}</button>
</template>

<script>
export default {
  name: 'CounterButton',

  props: {
    count: {
      type: Number,
      default: 0,
    },
  },

  model: {
    prop: 'count',
    event: 'increment',
  },

  methods: {
    handleClick() {
      const value = this.count + 1;
      this.$emit('increment', value);
    },
  },
};
</script>

<style scoped></style>
