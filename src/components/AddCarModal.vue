<template>
  <div class="modal">
    <div class="modal-content">
      <h3>Добавить автомобиль</h3>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="brand">Марка:</label>
          <select v-model="selectedBrand" @change="loadModels">
            <option value="">Выберите марку</option>
            <option v-for="brand in brands" :key="brand.id" :value="brand.id">{{ brand.name }}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="model">Модель:</label>
          <select v-model="selectedModel" :disabled="!selectedBrand" required>
            <option value="">Выберите модель</option>
            <option v-for="model in models" :key="model.id" :value="model.id">{{ model.name }}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="year">Год выпуска:</label>
          <input type="number" id="year" v-model="year" required>
        </div>
        <div class="form-group">
          <label for="registrationNumber">Госномер:</label>
          <input type="text" id="registrationNumber" v-model="registrationNumber" required>
        </div>
        <div class="form-group">
          <label for="vinNumber">Vin-номер:</label>
          <input type="text" id="vinNumber" v-model="vinNumber" required>
        </div>
        <div class="buttons">
          <button type="button" @click="cancel">Отмена</button>
          <button type="submit">Добавить</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AddCarModal',
  data() {
    return {
      selectedBrand: '',
      selectedModel: '',
      brands: [],
      models: [],
      year: null,
      registrationNumber: '',
      vinNumber: ''
    };
  },
  mounted() {
    this.loadBrands();
  },
  methods: {
    async loadBrands() {
      try {
        const response = await axios.get('https://cars-base.ru/api/cars');
        this.brands = response.data;
      } catch (error) {
        console.error('Ошибка загрузки марок автомобилей:', error);
      }
    },
    async loadModels() {
      if (this.selectedBrand) {
        try {
          const response = await axios.get(`https://cars-base.ru/api/cars/${this.selectedBrand}`);
          this.models = response.data;
        } catch (error) {
          console.error('Ошибка загрузки моделей автомобилей:', error);
        }
      } else {
        this.models = [];
      }
    },
    handleSubmit() {
      const newCar = {
        brand: this.selectedBrand,
        model: this.selectedModel,
        year: this.year,
        registrationNumber: this.registrationNumber,
        vinNumber: this.vinNumber
      };
      this.$emit('add', newCar);
      this.resetForm();
    },
    cancel() {
      this.resetForm();
      this.$emit('close');
    },
    resetForm() {
      this.selectedBrand = '';
      this.selectedModel = '';
      this.year = null;
      this.registrationNumber = '';
      this.vinNumber = '';
    }
  }
}
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 400px; /* Ширина модального окна */
}

.form-group {
  margin-bottom: 20px;
}

label {
  font-weight: bold;
}

input[type="text"],
input[type="number"],
select {
  width: calc(100% - 20px);
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

select {
  appearance: none;
}

.buttons {
  display: flex;
  justify-content: space-between;
}

button[type="submit"],
button[type="button"] {
  width: 48%;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button[type="submit"] {
  background-color: #007bff;
  color: #fff;
}

button[type="button"] {
  background-color: #dc3545;
  color: #fff;
}

button[type="submit"]:hover,
button[type="button"]:hover {
  opacity: 0.8;
}
</style>
