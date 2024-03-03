<template>
  <div class="about">
    <h2>О нас</h2>
    <div class="about-content">
      <div class="about-description">
        <p>Автосервис "Форсаж" - это современный сервисный центр, специализирующийся на обслуживании и ремонте автомобилей различных марок.</p>
        <p>Наша команда состоит из опытных специалистов, готовых качественно и в срок выполнить любые работы по техническому обслуживанию и ремонту вашего автомобиля.</p>
        <p>Мы работаем для вашего комфорта и безопасности на дорогах!</p>
      </div>
      <div class="about-gallery">
        <h3>Галерея</h3>
        <carousel :images="galleryImages"></carousel> <!-- Используем компонент Carousel для перелистывания изображений -->
      </div>
    </div>
  </div>
</template>

<script>
import Carousel from '@/components/Carousel.vue'; // Импортируем компонент Carousel

export default {
  name: 'AboutView',
  components: {
    Carousel
  },
  data() {
    return {
      galleryImages: [ // Массив изображений для галереи
        '/images/about/1076026_1000.jpeg',
        '/images/about/original.jpeg',
        '/images/about/XXL.webp'
      ]
    };
  }
}
</script>

<style scoped>
/* Стили для содержимого вкладки "О нас" */
</style>
