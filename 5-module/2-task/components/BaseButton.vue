<template>
  <component :is="tag" class="button" :class="[{'button_block': block}]" v-bind="$attrs" v-on="$listeners"><slot></slot></component>
</template>

<script>
const BUTTON_TYPES = {
  button: 'button',
  a: 'a',
  routerLink: 'router-link',
};

export default {
  name: 'BaseButton',

  props: {
    block: {
      type: Boolean,
    },
    tag: {
      type: String,
      default: BUTTON_TYPES.button,
      validator: prop => !prop || (typeof prop === 'string' && Object.values(BUTTON_TYPES).includes(prop)),
    },
  },
};
</script>

<style scoped>
.button {
  display: inline-block;
  padding: 10px 24px;
  font-weight: 700;
  font-size: 20px;
  line-height: 28px;
  color: initial;
  text-align: center;
  border: 4px solid transparent;
  transition: 0.2s all;
  outline: none;
  box-shadow: none;
  background-color: transparent;
  cursor: pointer;
  text-decoration: none;
}

.button.button_block {
  display: block;
  width: 100%;
}
</style>
