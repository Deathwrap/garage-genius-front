<template>
  <div class="appointment-form">
    <h2>Запись автомобиля {{ carBrand }} {{ carModel }}</h2>
    <div v-if="selectedServices.length > 0" class="selected-services">
      <h2>Выбранные услуги:</h2>
      <ul>
        <li v-for="(service, index) in selectedServices" :key="index">
          {{ service.serviceName }} - {{ formatTime(service.startTime) }} - {{ formatTime(service.endTime) }}
        </li>
      </ul>
    </div>
    <button v-if="!showServiceSelect" @click="showServiceSelect = true" class="add-service-button">Добавить услугу</button>
    <select v-if="showServiceSelect" v-model="selectedService" @change="handleServiceChange(selectedService)" class="service-select">
      <option disabled value="">Выберите услугу</option>
      <optgroup v-for="category in categories" :label="category.name" :key="category.id">
        <option v-for="service in category.services" :value="service" :key="service.id">{{ service.name }}</option>
      </optgroup>
    </select>
    <div v-if="selectedService" class="date-time-select">
      <button v-if="!showDateTimeSelect" @click="showDateTimeSelect = true" class="select-time-button">Выбрать время</button>
      <div v-if="showDateTimeSelect" class="date-time-picker">
        <datepicker v-model="selectedDate" cancelText="Отмена" selectText="Выбрать" locale="ru" :allowed-dates="this.availableDays" :enable-time-picker="false"></datepicker>
        <!-- Выбор времени для выбранного дня -->
        <select v-model="selectedTimeSlot" class="time-slot-select">
          <option disabled value="">Выберите время</option>
          <option v-for="slot in filteredTimeSlots" :value="slot" :key="slot.startTime">{{ formatTime(slot.startTime) }} - {{ formatTime(slot.endTime) }}</option>
        </select>
        <button v-if="selectedTimeSlot" @click="handleSaveServiceButton" class="save-button">Сохранить</button>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/utils/api";
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

export default {
  name: 'AppointmentForm',
  components: {
    Datepicker
  },
  props: {
    carBrand: {
      type: String,
      required: true
    },
    carModel: {
      type: String,
      require: true
    }
  },
  data() {
    return {
      selectedService: null,
      categories: [],
      showServiceSelect: false,
      showDateTimeSelect: false,
      availableDays: null,
      selectedDate: null,
      selectedTimeSlot: null,
      timeSlots: [],
      selectedServices: []
    };
  },
  async mounted() {
    await this.fetchCategories();
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
    async handleServiceChange(selectedService) {
      try {
        const response = await api.get(`api/work_orders/free_slots?serviceId=${selectedService.id}`);
        const timeSlots = response.data;

        // Извлекаем доступные дни из временных интервалов
        const availableDays = timeSlots.map(slot => new Date(slot.startTime).setUTCHours(0, 0, 0, 0));

        // Оставляем только уникальные дни
        this.availableDays = Array.from(new Set(availableDays));

        // Сохраняем доступные промежутки времени для выбранного дня
        this.timeSlots = timeSlots;

      } catch (error) {
        console.error('Ошибка при получении доступных дней:', error);
      }
    },
    submitAppointment() {
      if (this.selectedService && this.selectedDate && this.selectedTimeSlot) {
        // Отправить запрос на сервер для записи на выбранную услугу
        // Используйте this.selectedService, this.selectedDate, this.selectedTimeSlot и this.car для передачи данных
      } else {
        alert('Пожалуйста, выберите услугу, день и время');
      }
    },
    formatTime(time) {
      return new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    },
    handleSaveServiceButton() {
      console.log(this.selectedTimeSlot)
      this.selectedServices.push({
        serviceId: this.selectedService.id, // Используем полученный carId
        serviceName: this.selectedService.name,
        startTime: this.selectedTimeSlot.startTime,
        endTime: this.selectedTimeSlot.endTime,
      });

      this.selectedTimeSlot = null
      this.selectedDate = null
      this.selectedService = null
      this.showDateTimeSelect = false
      this.showServiceSelect = false

      console.log(this.selectedServices)
    }
  },
  computed: {
    filteredTimeSlots() {
      if (!this.selectedDate) return [];

      return this.timeSlots.filter(slot => {
        const slotDate = new Date(slot.startTime).setUTCHours(0, 0, 0, 0);
        return slotDate === this.selectedDate.setUTCHours(0, 0, 0, 0);
      });
    }
  }
};
</script>

<style scoped>
.appointment-form {
  font-family: Arial, sans-serif;
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.selected-services {
  margin-bottom: 20px;
}

.selected-services h2 {
  margin-bottom: 10px;
}

.add-service-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
}

.add-service-button:hover {
  background-color: #0056b3;
}

.service-select {
  margin-top: 10px;
  width: 100%;
  padding: 8px;
  border-radius: 5px;
}

.date-time-select {
  margin-top: 20px;
}

.select-time-button {
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
}

.select-time-button:hover {
  background-color: #218838;
}

.date-time-picker {
  margin-top: 10px;
}

.time-slot-select {
  margin-top: 10px;
  width: 100%;
  padding: 8px;
  border-radius: 5px;
}

.save-button {
  margin-top: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
}

.save-button:hover {
  background-color: #0056b3;
}
</style>
