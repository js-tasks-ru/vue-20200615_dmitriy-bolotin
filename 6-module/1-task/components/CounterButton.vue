<template>
  <button type="button" @click="handleClick" :value.sync="count_" >{{ count_ }}</button>
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

    data() {
      return {
        count_: this.count,
      };
    },

    model: {
      prop: 'count',
      event: 'increment',
    },

    methods: {
      handleClick() {
        this.count_ += 1;
        this.$emit('increment', this.count_);
      },
    },

    watch: {
      count: function(newValue) {
        this.count_ = newValue;
      },
    }
  };
</script>

<style scoped></style>
