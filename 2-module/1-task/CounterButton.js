export const CounterButton = {
  template: `<button type="button" @click="handleClick" :value="count">{{count}}</button>`,

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
