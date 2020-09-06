<template>
  <form class="form" @submit.prevent="handleSubmit">
    <div class="form-group">
      <label class="form-label">Email</label>
      <div class="input-group">
        <input
          v-model="email"
          type="email"
          placeholder="demo@email"
          class="form-control"
        />
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Пароль</label>
      <div class="input-group">
        <input
          v-model="password"
          type="password"
          placeholder="password"
          class="form-control"
        />
      </div>
    </div>
    <div class="form__buttons">
      <button type="submit" class="button button_primary button_block">Войти</button>
    </div>
    <div class="form__append">Нет аккаунта? <router-link :to="{ path:'register' ,query:{ email: this.email || undefined } }" >Зарегистрируйтесь</router-link></div>
  </form>
</template>

<script>
import { login } from '../data';

export default {
  name: 'LoginPage',

  data() {
    return {
      email: '',
      password: '',
    };
  },

  methods: {
    getValidationStatus() {
      let errMessage;

      if (!this.email) {
        errMessage = 'Требуется ввести Email';
      } else if (!this.password) {
        errMessage = 'Требуется ввести пароль';
      }

      return {
        errMessage,
        hasError: !!errMessage,
      }
    },

    async handleSubmit() {
      const validationStatus = this.getValidationStatus();

      if (validationStatus.hasError) {
        return alert(validationStatus.errMessage);
      }

      let response;
      try {
        response = await login(this.email, this.password);
      } catch (error) {
        return alert(error.message);
      }

      const {fullname, message} = response;
      alert(fullname || message);
    },
  },
};
</script>

<style scoped></style>
