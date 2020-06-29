<template>
  <div class="toasts" v-if="toasts.length">
    <div v-for="toast in toasts" :class="['toast', toast.className]">
      <app-icon :icon="toast.icon" />
      <span>{{toast.message}}</span>
    </div>
  </div>
</template>

<script>
import AppIcon from './AppIcon';

const DELAY = 5000;

const toastTypes = {
  success: 'success',
  error: 'error',
};

const toastTypeToAttributes = {
  success: {
    className: 'toast_success',
    icon: 'check-circle',
  },
  error: {
    className: 'toast_error',
    icon: 'alert-circle',
  },
}

export default {
  name: 'AppToast',

  components: { AppIcon },

  created() {
    this.timers = [];
  },

  destroyed() {
    if (this.timers.length) {
      this.timers.forEach(t => clearTimeout(t));
    }
  },

  data() {
    return {
      toasts: [],
    };
  },

  methods: {
    error(message) {
      this.addToast(message, toastTypes.error);
    },

    success(message) {
      this.addToast(message, toastTypes.success);
    },

    addToast(message, toastType) {
      const { className, icon } = toastTypeToAttributes[toastType];

      this.toasts.push({className, icon, message});

      this.timers.push(setTimeout(() => {
        this.toasts.splice(0, 1);

        clearTimeout(this.timers[0]);
        this.timers.splice(0, 1);
      }, DELAY));
    },
  },
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

.toast + .toast {
  margin-top: 20px;
}

.toast > .icon {
  margin-right: 12px;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}
</style>
