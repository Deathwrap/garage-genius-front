<!-- Register.vue -->
<template>
  <div class="register">
    <h2>Регистрация</h2>
    <form v-if="isRegister" @submit.prevent="register">
      <div class="form-group">
        <label for="name">Имя:</label>
        <input type="text" id="name" v-model="name" required>
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required>
      </div>
      <div class="form-group">
        <label for="password">Пароль:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <button type="submit">Зарегистрироваться</button>
    </form>
      <router-link @click="toggleForm" to="/login">Уже есть аккаунт? Войти</router-link>
  </div>
</template>
<script>
export default {
  name: 'RegisterComponent',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      isRegister: true
    };
  },
  methods: {
    register() {
      // Ваша логика регистрации
    },
    toggleForm() {
      this.isRegister = !this.isRegister;
    }
  }
}
</script>

<style scoped>
.register {
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

input[type="text"],
input[type="email"],
input[type="password"],
button {
  width: 100%;
  padding: 10px;
  font-size: 16px;
}

button {
  background-color: #28a745;
  color: #fff;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #218838;
}
</style>