<template>
  <div class="login">
    <h2>Вход</h2>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required>
      </div>
      <div class="form-group">
        <label for="password">Пароль:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <button type="submit">Войти</button>
    </form>
      <router-link to="/register">Нет аккаунта? Регистрация</router-link>
  </div>
</template>

<script>
import axios from "axios";
import { mapMutations } from 'vuex';

export default {
  name: 'LoginComponent',
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    ...mapMutations(['setLogin']), // Используем метод login из хранилища Vuex
    async login() {
      try {
        const response = await axios.post('http://localhost:5198/api/auth/sign_in', {
          email: this.email,
          password: this.password
        });
        this.setLogin();
        const {name, accessToken, refreshToken } = response.data; // Предположим, что сервер возвращает токены в таком формате
        // Сохраняем токены в localStorage или Vuex
        localStorage.setItem('userName', name);
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        // Перенаправляем пользователя на другую страницу или выполняем другие действия
        await this.$router.push('/about');
      } catch (error) {
        // Обрабатываем ошибки аутентификации (например, неверный email или пароль)
        console.error('Ошибка при входе:', error);
      }
    }
  }
}
</script>

<style scoped>
.login {
  max-width: 400px;
  margin: 0 auto;
}

h2 {
  text-align: center;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type="email"],
input[type="password"],
button {
  width: 100%;
  padding: 10px;
  font-size: 16px;
}

button {
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>