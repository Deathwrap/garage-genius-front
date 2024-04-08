<template>
  <div class="profile">
    <div class="profile-header">
      <h2 class="profile-title">{{ userName }}</h2>
      <button @click="logout" class="logout-btn">Выйти</button>
    </div>
    <div class="tabs">
      <button @click="activeTab = 'garage'" :class="{ 'active-tab': activeTab === 'garage' }">Гараж</button>
      <button @click="activeTab = 'orders'" :class="{ 'active-tab': activeTab === 'orders' }">История заказов</button>
    </div>
    <div v-if="activeTab === 'garage'">
      <garage></garage>
    </div>
  </div>
</template>

<script>
import {mapMutations} from "vuex";
import Garage from './Garage.vue'; // Подключаем компонент гаража
import API from './../utils/api'


export default {
  name: 'ProfileComponent',
  components: {
    Garage // Регистрируем компонент гаража для использования в этом компоненте
  },
  data() {
    return {
      userName: localStorage.getItem('userName'),
      activeTab: 'garage' // Начально активная вкладка
    };
  },
  methods: {
    ...mapMutations(['setLogout']), // Используем метод login из хранилища Vuex
    async logout() {
      await API.post("api/auth/logout")
      localStorage.removeItem('userId');
      localStorage.removeItem('userName');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      this.setLogout();
      this.$router.push('/login');
      // Добавьте здесь логику для выхода пользователя
    }
  }
}
</script>

<style scoped>
.profile {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.profile-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.profile-title {
  margin: 0;
  color: #333;
}

.tabs {
  margin-bottom: 20px;
}

.tabs button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: transparent;
  transition: background-color 0.3s, color 0.3s; /* Добавлен переход для изменения цвета текста */
  position: relative;
  margin-right: 10px; /* Расстояние между вкладками */
  font-size: 18px; /* Размер текста */
  font-weight: bold; /* Жирный стиль */
}

.tabs button::after { /* Добавляем псевдоэлемент для подчеркивания */
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px; /* Высота подчеркивания */
  background-color: #ccc; /* Цвет подчеркивания неактивной вкладки */
  transition: background-color 0.3s; /* Переход для изменения цвета подчеркивания */
}

.tabs button:hover::after {
  background-color: #007bff; /* Цвет подчеркивания при наведении */
}

.tabs button.active-tab::after {
  background-color: #007bff; /* Цвет подчеркивания активной вкладки */
}

.logout-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #f44336;
  color: white;
  transition: background-color 0.3s;
}

.logout-btn:hover {
  background-color: #d32f2f;
}
</style>