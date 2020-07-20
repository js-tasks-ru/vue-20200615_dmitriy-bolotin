<template>
  <div
    :class="[
      'input-group',
      'input-group_icon',
      {'input-group_icon-left': !!$scopedSlots['left-icon'],
      'input-group_icon-right': !!$scopedSlots['right-icon']
      }]"
  >
    <slot name="left-icon" />

    <textarea
      v-if="multiline"
      :class="['form-control', {'form-control_rounded': rounded, 'form-control_sm': small}]"
      v-bind="attrs"
      v-on="listeners"
      :value="value"
      @input="handleInput"
    />

    <input
      v-else
      :class="['form-control', {'form-control_rounded': rounded, 'form-control_sm': small}]"
      v-bind="attrs"
      v-on="listeners"
      :value="value"
      @input="handleInput"
    />

    <slot name="right-icon" />
  </div>
</template>

<script>
export default {
  name: 'AppInput',

  inheritAttrs: false,

  props: {
    small: {
      type: Boolean,
      default: false,
    },
    rounded: {
      type: Boolean,
      default: false,
    },
    multiline: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
      default: '',
    },
  },

  model: {
    prop: 'value',
    event: 'input',
  },

  computed: {
    attrs() {
      const {value, ...restAttrs} = this.$attrs;

      return {...restAttrs};
    },

    listeners() {
      const {input, ...restListeners} = this.$listeners;

      return {...restListeners};
    }
  },

  methods: {
    handleInput($event) {
      const {value} = $event.target;

      this.$emit('input', value);
    }
  },
};
</script>

<style scoped>
.form-control {
  padding: 12px 16px;
  height: 52px;
  border-radius: 8px;
  border: 2px solid var(--blue-light);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
  color: var(--body-color);
  transition: 0.2s all;
  background-color: var(--white);
  outline: none;
  box-shadow: none;
}

.form-control::placeholder {
  font-weight: 400;
  color: var(--blue-2);
}

.form-control:focus {
  border-color: var(--blue);
}

textarea.form-control {
  width: 100%;
  min-height: 211px;
}

.form-control.form-control_rounded {
  border-radius: 26px;
}

.form-control.form-control_sm.form-control_rounded {
  border-radius: 22px;
}

.form-control.form-control_sm {
  padding: 8px 16px;
  height: 44px;
  border-radius: 4px;
}

.input-group {
  position: relative;
}

.input-group .form-control {
  width: 100%;
}

.input-group.input-group_icon .form-control {
  padding-left: 50px;
}

.input-group.input-group_icon .icon {
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
}

.input-group.input-group_icon.input-group_icon-left .icon:first-child {
  left: 16px;
}

.input-group.input-group_icon.input-group_icon-right .icon:last-child {
  right: 16px;
}
</style>
