import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Это импорт из index.js в папке router

createApp(App).use(router).mount('#app');
