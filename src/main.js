import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store'; // Импортируем хранилище Vuex из файла store.js

createApp(App)
    .use(router)
    .use(store) // Используем хранилище Vuex
    .mount('#app');
