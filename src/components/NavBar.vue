<template>
  <nav class="navbar">
    <div class="navbar-logo">
      <img src="../assets/CarLogo.png" alt="Логотип автосервиса">
      <span class="service-name">Форсаж</span> <!-- Добавляем название автосервиса -->
    </div>
    <div class="navbar-links">
      <router-link to="/about" class="nav-link">О нас</router-link>
      <router-link to="/services" class="nav-link">Услуги</router-link>
      <router-link to="/appointment" class="nav-link">Запись</router-link>
      <router-link to="/contacts" class="nav-link">Контакты</router-link> <!-- Добавляем пункт "Контакты" -->
      <template v-if="isLoggedIn">
        <router-link to="/profile" class="nav-link">Профиль</router-link>
      </template>
      <template v-else>
        <router-link to="/login" class="nav-link">Вход/Регистрация</router-link>
      </template>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'NavBar',
  computed: {
    ...mapState(['isLoggedIn'])
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

.navbar-logo {
  display: flex;
  align-items: center;
}

.navbar-logo img {
  max-height: 100px; /* Увеличиваем высоту логотипа */
  margin-right: 10px; /* Добавляем отступ между логотипом и названием */
}

.service-name {
  font-size: 24px; /* Увеличиваем размер шрифта названия автосервиса */
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
