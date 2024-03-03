<template>
  <div class="carousel" ref="carousel">
    <div class="carousel-container" :style="{ transform: `translateX(${-offset}px)` }">
      <div v-for="(image, index) in imagesWithDuplicates" :key="index" class="carousel-item">
        <img :src="image" alt="Slide">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CarouselComponent',
  props: {
    images: Array
  },
  data() {
    return {
      offset: 0,
      slideWidth: 0,
      currentIndex: 0
    };
  },
  computed: {
    imagesWithDuplicates() {
      // Создаем бесконечную ленту изображений
      return [...this.images, ...this.images];
    }
  },
  mounted() {
    // Устанавливаем ширину слайда при монтировании компонента
    this.slideWidth = this.$refs.carousel.offsetWidth / this.images.length;
    // Автоматическая прокрутка слайдера
    setInterval(this.scrollLeft, 3000);
  },
  methods: {
    scrollLeft() {
      // Анимация прокрутки слайдера
      this.offset += this.slideWidth;
      // Если достигнут конец, возвращаемся в начало
      if (this.offset >= this.slideWidth * this.images.length) {
        this.offset = 0;
      }
    }
  }
}
</script>

<style scoped>
.carousel {
  width: 100%;
  overflow: hidden;
}

.carousel-container {
  display: flex;
  transition: transform 0.5s ease; /* Анимация прокрутки */
}

.carousel-item {
  flex: 0 0 auto;
}

.carousel-item img {
  max-width: 100%;
  max-height: 200px; /* Устанавливаем максимальную высоту */
  object-fit: contain; /* Изображение полностью помещается в контейнер без искажения */
}
</style>
