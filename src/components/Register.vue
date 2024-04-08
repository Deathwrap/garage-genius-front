<!-- Register.vue -->
<template>
  <div class="register">
    <h2>Регистрация</h2>
    <form @submit.prevent="register">
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
      <router-link to="/login">Уже есть аккаунт? Войти</router-link>
  </div>
</template>
<script>
export default {
  name: 'RegisterComponent',
  data() {
    return {
      name: '',
      email: '',
      password: ''
    };
  },
  methods: {
    async register() {
      try {
        const response = await fetch('http://192.168.1.146:5198/api/auth/sign_up', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: this.name,
            email: this.email,
            password: this.password
          })
        });
        if (response.ok) {
          // Перенаправляем пользователя на страницу входа
          alert("На вашу почту было отправлено письмо с инструкциями по подтверждению аккаунта.");
          await this.$router.push('/login');
          // Отображаем всплывающее уведомление об успешной регистрации
        } else {
          // Обрабатываем ошибку в случае, если регистрация не удалась
          const data = await response.json();
          this.message = data.message;
        }
      } catch (error) {
        console.error('Ошибка:', error);
      }
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