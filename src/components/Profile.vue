<template>
  <div class="profile">
    <div class="profile-header">
      <h2 class="profile-title">{{ userName }}</h2>
      <button @click="logout" class="logout-btn">Выйти</button>
    </div>
    <div class="tabs">
      <button @click="activeTab = 'garage'" :class="{ 'active': activeTab === 'garage' }" class="tab">Гараж</button>
      <button @click="activeTab = 'orders'" :class="{ 'active': activeTab === 'orders' }" class="tab">История заказов</button>
    </div>
    <div v-if="activeTab === 'garage'">
      <garage></garage>
    </div>    <div v-else-if="activeTab === 'orders'" class="tab-content">История заказов</div>
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
      await API.post("http://localhost:5198/api/auth/logout")
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
  margin: 0 auto;
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
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.tab {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #f0f0f0;
  transition: background-color 0.3s;
}

.tab:hover, .active {
  background-color: #e0e0e0;
}

.tab-content {
  margin-top: 20px;
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