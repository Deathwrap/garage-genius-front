<template>
  <div class="services">
    <h1>Наши услуги</h1>
    <div v-for="category in categories" :key="category.id">
      <h2>{{ category.name }}</h2>
      <table class="service-table">
        <thead>
        <tr>
          <th>Услуга</th>
          <th>Примерный срок выполнения</th>
          <th>Цена за час</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="service in category.services" :key="service.id">
          <td>{{ service.name }}</td>
          <td>{{ service.executionTime }}</td>
          <td>{{ service.standardHourPrice }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

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
        const response = await axios.get('http://localhost:5198/api/services/categories'); // Замените 'API_URL' на ваш URL для запроса категорий услуг
        this.categories = response.data;
        await this.fetchServicesForCategories();
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    },
    async fetchServicesForCategories() {
      for (const category of this.categories) {
        try {
          const response = await axios.get(`http://localhost:5198/api/services/by-id?categoryId=${category.id}`); // Замените 'API_URL' на ваш URL для запроса услуг
          category.services = response.data;
        } catch (error) {
          console.error(`Error fetching services for category ${category.name}:`, error);
        }
      }
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
