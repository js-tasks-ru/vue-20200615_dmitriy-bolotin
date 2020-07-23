<template>
  <label class="checkbox">
    <input
      type="checkbox"
      :value="value"
      :checked="ownChecked"
      v-bind="attrs"
      v-on="listeners"
      @change="handleChange"
    />
    <slot />
    <span></span>
  </label>
</template>

<script>
export default {
  name: 'AppCheckbox',

  props: {
    value: String,
    checked: [Boolean, String, Array],
  },

  model: {
    prop: 'checked',
    event: 'change'
  },

  computed: {
    attrs() {
      const {value, checked, ...restAttrs} = this.$attrs;

      return {...restAttrs};
    },

    listeners() {
      const {change, ...restListeners} = this.$listeners;

      return {...restListeners};
    },

    ownChecked() {
      if (Array.isArray(this.checked)) {
        return this.checked.includes(this.value);
      }

      return this.checked;
    },
  },

  methods: {
    handleChange($event) {
      const {value, checked} = $event.target;
      let result = checked;

      if (Array.isArray(this.checked)) {
        const checkedClone = [...this.checked];

        if (this.checked.includes(value)) {
          checkedClone.splice(checkedClone.findIndex(val => val === value), 1);
        } else {
          checkedClone.push(value);
        }

        result = checkedClone;
      }


      this.$emit('change', result);
    }
  },
};
</script>

<style scoped>
.checkbox {
  display: inline-block;
  position: relative;
  padding-left: 44px;
  margin-bottom: 10px;
  text-align: left;
  cursor: pointer;
  font-size: 20px;
  line-height: 28px;
  transition: all 0.3s ease;
}

.checkbox > input {
  position: absolute;
  z-index: -1;
  opacity: 0;
  padding: 0;
}

.checkbox > a {
  text-decoration: none;
}

.checkbox > span {
  border: 2px solid var(--blue-light);
}

.checkbox > span {
  border-radius: 8px;
  background: 0 0;
  position: absolute;
  top: 0;
  left: 0;
  height: 28px;
  width: 28px;
}

.checkbox > input:checked ~ span:after {
  display: block;
}

.checkbox > span:after {
  content: '';
  position: absolute;
  display: none;
  top: 50%;
  left: 50%;
  width: 14px;
  height: 13px;
  background-image: url('../assets/icons/icon-check.svg');
  border: none;
  transform: translate(-50%, -50%);
}
</style>
