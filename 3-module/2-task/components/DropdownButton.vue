<template>
  <div
    @click="toggleMenu" :class="['dropdown', {show: isMenuOpen}]"
    @mouseleave="closeMenu">
    <button
      type="button"
      :class="['button', 'dropdown__toggle', {'dropdown__toggle_icon': selectedOption && selectedOption.icon}]">
      <app-icon v-if="selectedOption && selectedOption.icon" :icon="selectedOption.icon" />
      <span v-if="selectedOption">{{title}} - {{selectedOption.text}}</span>
      <span v-else>{{title}}</span>
    </button>

    <div ref="menu" :class="['dropdown__menu', 'text-with-wrap', {show: isMenuOpen}]">
      <button
        type="button"
        v-for="option in options"
        :value="option.value"
        @click="selectOption"
        :class="['dropdown__item', {'dropdown__item_icon': option.icon}]">
        <app-icon v-if="option.icon" :icon="option.icon" />
        {{option.text}}
      </button>
    </div>
  </div>
</template>

<script>
import AppIcon from './AppIcon';

export default {
  name: 'DropdownButton',

  components: { AppIcon },

  props: {
    title: {
      type: String,
      required: true,
    },
    value: String,
    options: {
      type: Array,
      required: true,
      validator: prop => prop.every(option => {
        const {value, text, icon} = option;
        const isString = prop => typeof prop === 'string';
        const hasRequiredText = text && isString(text);
        const hasRequiredValue = value && isString(value);
        const hasOptionalIcon = (icon && isString(icon)) || icon === undefined;

        return  hasRequiredText && hasRequiredValue && hasOptionalIcon;
      }),
    }
  },

  model: {
    prop: 'value',
    event: 'change',
  },

  data() {
    return {
      isMenuOpen: false,
    }
  },

  computed: {
    selectedOption() {
      return this.options.find(opt => opt.value === this.value);
    },
  },

  methods: {
    selectOption(event){
      const {value} = event.currentTarget;

      this.$emit('change', value);
    },

    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },

    closeMenu() {
      this.isMenuOpen = false;
    }
  },
};
</script>

<style scoped>
  @import '/assets/styles/_button.css';
  @import '/assets/styles/_dropdown.css';

  .text-with-wrap {
    word-break: break-word;
    white-space: pre-line;
  }
</style>
