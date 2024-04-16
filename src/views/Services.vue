<template>
  <div class="services">
    <h1>Наши услуги</h1>
    <div v-for="category in categories" :key="category.id">
      <h2>{{ category.name }}</h2>
      <table class="service-table">
        <thead>
        <tr>
          <th>Услуга</th>
          <th>Прим. время выполнения</th>
          <th>Цена н/ч</th>
          <th>Прим. цена за услугу</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="service in category.services" :key="service.id">
          <td>{{ service.name }}</td>
          <td>{{ formatExecutionTime(service.executionTime) }}</td>
          <td>{{ service.standardHourPrice }} руб.</td>
          <td>{{ calculateTotalPrice(service) }} руб.</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import api from "@/utils/api";

export default {
  name: 'ServicesView',
  data() {
    return {
      categories: []
    };
  },
  mounted() {
    this.fetchCategories();
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await api.get('api/services/categories');
        this.categories = response.data;
        await this.fetchServicesForCategories();
      } catch (error) {
        console.error('Ошибка при получении категорий:', error);
      }
    },
    async fetchServicesForCategories() {
      for (const category of this.categories) {
        try {
          const response = await api.get(`api/services/by-id?categoryId=${category.id}`);
          category.services = response.data;
        } catch (error) {
          console.error(`Ошибка при получении услуг для категории ${category.name}:`, error);
        }
      }
    },
    formatExecutionTime(executionTime) {
      const hours = Math.floor(executionTime);
      const minutes = Math.round((executionTime - hours) * 60);
      return `${hours} ч ${minutes} мин`;
    },
    calculateTotalPrice(service) {
      return (service.standardHourPrice * service.executionTime).toFixed(2);
    }
  }
};
</script>

<style scoped>
.services {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.service-table {
  width: 100%;
  border-collapse: collapse;
}

.service-table th, .service-table td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}

.service-table th {
  background-color: #f2f2f2;
}
</style>
