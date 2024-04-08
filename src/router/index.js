import { createRouter, createWebHistory } from 'vue-router';
import AboutView from '../views/About.vue';
import ServicesView from '../views/Services.vue';
import AppointmentComponent from "@/components/AppointmentComponent.vue";
import Login from '../components/Login.vue'; // Импортируем компонент страницы входа
import Register from '../components/Register.vue'; // Импортируем компонент страницы регистрации
import Profile from '../components/Profile.vue';
import Contacts from '../views/ContactsView.vue'


const routes = [
    { path: '/about', name: 'About', component: AboutView },
    { path: '/services', name: 'Services', component: ServicesView },
    { path: '/appointment', name: 'Appointment', component: AppointmentComponent, props: true },
    { path: '/login', name: 'Login', component: Login },
    { path: '/register', name: 'Register', component: Register },
    { path: '/profile', name: 'Profile', component: Profile },
    { path: '/contacts', name: 'Contacts', component: Contacts }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
