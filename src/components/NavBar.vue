<template>
  <nav class="navbar">
    <div class="navbar-logo">
      <img src="../assets/CarLogo.png" alt="Логотип автосервиса">
    </div>
    <div class="navbar-links">
      <router-link to="/about" class="nav-link">О нас</router-link>
      <router-link to="/services" class="nav-link">Услуги</router-link>
      <router-link to="/appointment" class="nav-link">Запись</router-link>
      <router-link v-if="!isLoggedIn" to="/login" class="nav-link">Вход/Регистрация</router-link>
      <button v-else @click="logout" class="nav-link">Выход</button>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
  props: {
    isLoggedIn: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    logout() {
      // Ваша логика выхода
    }
  }
}
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  color: white;
  padding: 15px 20px; /* Увеличиваем отступы */
  margin-top: 0; /* Убираем верхний отступ */
  height: 70px; /* Увеличиваем высоту навигационной панели */
}

.navbar-logo img {
  max-height: 100px; /* Увеличиваем высоту логотипа */
}

.navbar-links {
  display: flex;
}

.nav-link {
  color: white;
  text-decoration: none;
  margin-left: 30px; /* Увеличиваем отступы между пунктами */
  font-family: 'Arial', sans-serif;
  font-size: 18px; /* Увеличиваем размер шрифта */
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #ffcc00;
  text-decoration: underline;
}
</style>
