import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store'; // Импортируем хранилище Vuex из файла store.js

createApp(App)
    .use(store) // Используем хранилище Vuex
    .use(router)
    .mount('#app');
