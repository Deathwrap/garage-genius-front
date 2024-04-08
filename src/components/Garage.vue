<template>
  <div class="garage">
    <div v-if="cars.length === 0">В вашем гараже пока нет автомобилей</div>
    <div v-else>
      <div
          v-for="(car, index) in cars"
          :key="index"
          class="car"
          @click="handleCarClick(car)"
      >
        <p><strong>Марка:</strong> {{ car.brand }}</p>
        <p><strong>Модель:</strong> {{ car.model }}</p>
        <p><strong>Год:</strong> {{ car.year }}</p>
        <p><strong>Госномер:</strong> {{ car.registrationNumber }}</p>
      </div>
    </div>
    <button @click="showModal = true" class="add-car-btn">Добавить автомобиль</button>
    <add-car-modal v-if="showModal" @add="handleAddCar" @close="showModal = false"></add-car-modal>
    <car-card v-if="selectedCar" :car="selectedCar" @close="selectedCar = null" />
  </div>
</template>

<script>
import AddCarModal from './AddCarModal.vue'; // Подключаем компонент модального окна
import CarCard from "@/components/CarCard.vue";
import API from './../utils/api'

export default {
  name: 'GarageComponent',
  components: {
    AddCarModal, // Регистрируем компонент модального окна
    CarCard
  },
  data() {
    return {
      cars: [], // Здесь будут храниться автомобили клиента
      showModal: false, // Флаг для отображения/скрытия модального окна
      selectedCar: null // Добавляем свойство для хранения выбранной машины
    };
  },
  mounted() {
    // При монтировании компонента загружаем автомобили клиента
    this.loadCars();
  },
  methods: {
    async loadCars() {
      try {
        // Здесь делаем запрос на бэкенд для загрузки автомобилей клиента
        // Замените этот код на реальный запрос к вашему API
        const response = await API.get('api/cars/get-by-client'); // Пример URL для запроса
        this.cars = response.data;
      } catch (error) {
        console.error('Ошибка загрузки автомобилей:', error);
      }
    },
    handleAddCar(newCar) {
      // Отправляем данные нового автомобиля на сервер
      API.post('api/cars/add', {
        brand: newCar.brand,
        model: newCar.model,
        year: newCar.year,
        registrationNumber: newCar.registrationNumber,
        vin: newCar.vinNumber
      }).then(response => {
        // После успешного добавления автомобиля на сервер получаем carId из ответа
        const carId = response.data.carId;
        // Добавляем новый автомобиль в массив this.cars
        this.cars.push({
          id: carId, // Используем полученный carId
          brand: newCar.brand,
          model: newCar.model,
          year: newCar.year,
          registrationNumber: newCar.registrationNumber
        });
        // Закрываем модальное окно после добавления автомобиля
        this.showModal = false;
      }).catch(error => {
        console.error('Ошибка при добавлении автомобиля:', error);
      });
    },
    handleCarClick(car) {
      this.selectedCar = car;
      // Дополнительные действия при клике на машину, если нужно
    }
  }
}
</script>

<style scoped>
.garage {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.car {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  cursor: pointer;
}

.car:hover {
  background-color: #f0f0f0;
}

.add-car-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  transition: background-color 0.3s;
}

.add-car-btn:hover {
  background-color: #0056b3;
}
</style>
