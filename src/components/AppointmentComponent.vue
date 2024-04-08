<template>
  <div class="service-booking">
    <!-- Надпись с информацией об автомобиле -->
    <h2 class="title">Запись автомобиля: {{ carBrand }} {{ carModel }}</h2>

    <!-- Этап 1: Выбор услуг -->
    <div v-if="step === 1">
      <h3>Выберите услуги</h3>
      <div class="service-selection">
        <ul class="selected-services">
          <li v-for="service in selectedServices" :key="service.id">
            {{ service.name }}
            <button @click="removeSelectedService(service)" class="remove-button">Удалить</button>
          </li>
        </ul>
        <div class="dropdown-container">
          <select v-model="selectedService" @change="addSelectedService" v-if="addingService" class="service-dropdown">
            <option disabled value="">Выберите услугу</option>
            <optgroup v-for="category in categories" :label="category.name" :key="category.id">
              <option v-for="service in category.services" :value="service" :key="service.id">{{ service.name }}</option>
            </optgroup>
          </select>
          <button v-if="!addingService" @click="addingService = true" class="add-button">Добавить услугу</button>
        </div>
      </div>
      <button @click="nextStep" :disabled="selectedServices.length === 0" class="action-button">Далее</button>
    </div>

    <!-- Этап 2: Выбор времени -->
    <div v-else-if="step === 2">
      <h3>Выберите удобное время</h3>
      <!-- Здесь добавьте код для отображения доступных временных слотов -->
      <button @click="prevStep" class="action-button">Назад</button>
      <button @click="nextStep" class="action-button">Далее</button>
    </div>

    <!-- Этап 3: Подтверждение записи -->
    <div v-else-if="step === 3">
      <h3>Подтвердите запись</h3>
      <p>Выбранные услуги:</p>
      <ul>
        <li v-for="service in selectedServices" :key="service.id">
          {{ service.name }}
        </li>
      </ul>
      <button @click="prevStep" class="action-button">Назад</button>
      <button @click="confirmBooking" class="action-button confirm-button">Подтвердить</button>
    </div>
  </div>
</template>

<script>
import api from "@/utils/api";

export default {
  name: 'AppointmentComponent',
  props: {
    carId: {
      type: Number,
      required: true
    },
    carBrand: {
      type: String,
      required: true
    },
    carModel: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      step: 1,
      categories: [],
      selectedService: null,
      selectedServices: [],
      addingService: false // Флаг для отображения/скрытия выпадающего списка
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
        console.error('Error fetching categories:', error);
      }
    },
    async fetchServicesForCategories() {
      for (const category of this.categories) {
        try {
          const response = await api.get(`api/services/by-id?categoryId=${category.id}`);
          category.services = response.data;
        } catch (error) {
          console.error(`Error fetching services for category ${category.name}:`, error);
        }
      }
    },
    addSelectedService() {
      if (this.selectedService) {
        this.selectedServices.push(this.selectedService);
        this.categories.forEach(category => {
          const index = category.services.findIndex(service => service.id === this.selectedService.id);
          if (index !== -1) {
            category.services.splice(index, 1); // Удаляем выбранную услугу из списка доступных
          }
        });
        this.selectedService = null;
        this.addingService = false; // Скрываем выпадающий список после выбора услуги
      }
    },
    removeSelectedService(service) {
      if (service) {
        const category = this.categories.find(cat => cat.id === service.categoryId);
        if (category) {
          category.services.push(service);
        }
      }
      const index = this.selectedServices.indexOf(service);
      if (index !== -1) {
        this.selectedServices.splice(index, 1); // Удаляем выбранную услугу из списка выбранных
      }
    },
    findServiceById(serviceId) {
      for (const category of this.categories) {
        const service = category.services.find(service => service.id === serviceId);
        if (service) {
          return service;
        }
      }
      return null;
    },
    nextStep() {
      if (this.step < 3) this.step++;
    },
    prevStep() {
      if (this.step > 1) this.step--;
    },
    getServiceNameById(serviceId) {
      for (const category of this.categories) {
        const service = category.services.find(service => service.id === serviceId);
        if (service) {
          return service.name;
        }
      }
      return '';
    },
    confirmBooking() {
      // Ваша логика для подтверждения записи
    }
  }
}
</script>

<style scoped>
.service-booking {
  max-width: 600px;
  margin: 20px auto;
  font-family: Arial, sans-serif;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.title {
  margin-top: 0;
}

.service-selection {
  margin-bottom: 20px;
}

.selected-services {
  padding-left: 0;
  list-style: none;
}

.selected-services li {
  margin-bottom: 5px;
}

.selected-services li button {
  padding: 5px 10px;
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.selected-services li button:hover {
  background-color: #c82333;
}

.add-button,
.action-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.add-button:hover,
.action-button:hover {
  background-color: #0056b3;
}

.add-button {
  margin-bottom: 10px;
}

.service-dropdown {
  width: calc(100% - 10px);
  margin-bottom: 10px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.confirm-button {
  background-color: #28a745;
}

.confirm-button:hover {
  background-color: #218838;
}
</style>
