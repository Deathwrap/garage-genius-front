<template>
  <div class="landing">
    <h1>Добро пожаловать в наш автосервис</h1>
    <p>Мы гордимся предлагать качественные услуги по обслуживанию вашего автомобиля. Наш автосервис находится в городе Козельск, где мы предоставляем широкий спектр услуг, включая техническое обслуживание, ремонт и диагностику автомобилей. Мы обладаем большим опытом и профессиональными навыками, чтобы решить любые проблемы с вашим автомобилем.</p>
    <div class="photos">
      <div class="photo" v-for="(photo, index) in photos" :key="index" :style="{ backgroundImage: 'url(' + photo + ')' }">
        <div class="overlay"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AboutCom",
  data() {
    return {
      photos: [
        require('../../public/images/about/IMG_20240325_134113.jpg'),
        require('../../public/images/about/IMG_20240325_134137.jpg'),
        require('../../public/images/about/IMG_20240325_134214.jpg'),
        require('../../public/images/about/IMG_20240325_134217.jpg'),
      ],
    };
  },
};
</script>

<style scoped>
.landing {
  text-align: center;
}

h1 {
  font-size: 36px;
  margin-bottom: 20px;
}

p {
  margin-bottom: 20px;
  line-height: 1.6;
}

.photos {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
}

.photo {
  width: 500px;
  height: 333px;
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  background-size: cover;
  background-position: center;
  transition: transform 0.3s ease;
}

.photo:hover {
  transform: scale(1.05);
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.photo:hover .overlay {
  opacity: 1;
}

.overlay:hover {
  cursor: pointer;
}

.appointment-button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.appointment-button:hover {
  background-color: #0056b3;
}
</style>
