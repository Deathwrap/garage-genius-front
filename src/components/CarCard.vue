<template>
  <div class="modal">
    <div class="modal-content car-card">
      <div class="car-info">
        <p><strong>Марка:</strong> {{ car.brand }}</p>
        <p><strong>Модель:</strong> {{ car.model }}</p>
        <p><strong>Год:</strong> {{ car.year }}</p>
        <p><strong>Госномер:</strong> {{ car.registrationNumber }}</p>
        <p><strong>VIN-номер:</strong> {{ car.vin }}</p>
      </div>
      <button class="appointment-button" @click="bookAppointment">Запись</button>
      <button class="close-button" @click="closeModal">&times;</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CarCard',
  props: {
    car: {
      type: Object,
      required: true
    }
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    bookAppointment() {
      // Добавьте здесь логику для предварительной записи автомобиля в автосервис
      console.log('Запись на автомобиль', this.car.registrationNumber);
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
  width: 400px;
  position: relative; /* Для позиционирования кнопок */
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: #aaa;
}

.close-button:hover {
  color: #555;
}

.appointment-button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 10px;
}

.appointment-button:hover {
  background-color: #0056b3;
}

.car-info {
  margin-bottom: 20px;
}

.car-info p {
  margin-bottom: 10px;
}
</style>
