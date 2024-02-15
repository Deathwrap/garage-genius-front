import { createRouter, createWebHistory } from 'vue-router';
import AboutView from '../views/About.vue';
import ServicesView from '../views/Services.vue';
//import Appointment from '../views/Appointment.vue';
import Login from '../components/Login.vue'; // Импортируем компонент страницы входа
import Register from '../components/Register.vue'; // Импортируем компонент страницы регистрации


const routes = [
    { path: '/about', component: AboutView },
    { path: '/services', component: ServicesView },
    //{ path: '/appointment', component: Appointment },
    { path: '/login', component: Login }, // Добавляем маршрут для страницы входа
    { path: '/register', component: Register }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
