import Vue from '/vendor/vue.esm.browser.js';

const app = new Vue({
  el: '#app',

  data: {
    counter: 0,
  },

  methods: {
    increment() {
      return this.counter += 1;
    }
  }
});
