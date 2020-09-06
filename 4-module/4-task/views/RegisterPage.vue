<template>
  <form class="form" @submit.prevent="handleSubmit">
    <div class="form-group">
      <label class="form-label">Email</label>
      <div class="input-group">
        <input v-model="email" type="email" class="form-control" />
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Имя</label>
      <div class="input-group">
        <input v-model="fullname" type="text" class="form-control" />
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Пароль</label>
      <div class="input-group">
        <input v-model="password" type="password" class="form-control" />
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Повтор пароля</label>
      <div class="input-group">
        <input v-model="passwordRepeat" type="password" class="form-control" />
      </div>
    </div>
    <div class="form-group">
      <label class="checkbox"
      ><input type="checkbox" v-model="agreement" /> Я согласен с условиями
        <span></span
        ></label>
    </div>
    <div class="form__buttons">
      <button type="submit" class="button button_primary">
        Зарегистрироваться
      </button>
    </div>
    <div class="form__append">
      Уже есть аккаунт? <router-link to="login" class="link">Войдите</router-link>
    </div>
  </form>
</template>

<script>
import { register } from '../data';

export default {
  name: 'RegisterPage',

  data() {
    let email = '';
    if (this.$route && this.$route.query) {
      email = this.$route.query.email;
    }

    return {
      email: '',
      fullname: '',
      password: '',
      passwordRepeat: '',
      agreement: false,
    };
  },

  methods: {
    getValidationStatus() {
      let errMessage;

      if (!this.email) {
        errMessage = 'Требуется ввести Email';
      } else if (!this.fullname) {
        errMessage = 'Требуется ввести полное имя';
      } else if (!this.password) {
        errMessage = 'Требуется ввести пароль';
      } else if (!this.passwordRepeat) {
        errMessage = 'Требуется повторить пароль';
      } else if (this.password !== this.passwordRepeat) {
        errMessage = 'Пароли не совпадают';
      } else if (!this.agreement) {
        errMessage = 'Требуется согласиться с условиями';
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
        const {email, fullname, password} = this;
        response = await register(email, fullname, password);
      } catch (error) {
        return alert(error.message);
      }

      const {id, message} = response;

      return alert(id || message);
    },
  },
};
</script>

<style scoped></style>
