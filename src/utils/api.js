import axios from "axios";
import router from "../router/index"
import { mapMutations } from 'vuex';
export const mutations = {
    ...mapMutations(['setLogin', 'setLogout']) // Подключение мутаций из Vuex
};
// Создание экземпляра axios
const api = axios.create({
    baseURL: 'http://192.168.1.146:5198/', // Укажите базовый URL вашего API
});

// Запрос на обновление токена
async function refreshToken() {
    try {
        const response = await api.post('api/auth/refresh', {
            accessToken: localStorage.accessToken,
            refreshToken: localStorage.refreshToken,
        });
        localStorage.accessToken = response.data.accessToken;
        localStorage.refreshToken = response.data.refreshToken;
        return response.data.accessToken;
    } catch (error) {
        console.error('Ошибка обновления токена:', error);
        throw error;
    }
}

// Перехватчик запросов
api.interceptors.request.use(config => {
    const accessToken = localStorage.accessToken;
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
}, error => {
    console.error('Ошибка при отправке запроса:', error);
    return Promise.reject(error);
});

// Перехватчик ответов
api.interceptors.response.use(response => {
    return response;
}, async error => {
    // Проверяем, если ошибка - это ошибка 401
    if (error.response.status === 401) {
        try {
            // Пытаемся обновить токен
            const newAccessToken = await refreshToken();
            // Обновляем заголовок авторизации в запросе с новым токеном
            error.config.headers.Authorization = `Bearer ${newAccessToken}`;
            // Повторяем исходный запрос с новым токеном
            return axios.request(error.config);
        } catch (refreshError) {
            // Если обновление токена не удалось, перенаправляем на страницу входа
            console.error('Ошибка обновления токена:', refreshError);
            localStorage.removeItem('userId');
            localStorage.removeItem('userName');
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            //this.setLogout();
            await router.push('/login');
            return Promise.reject(refreshError);
        }
    } else {
        // Если это не ошибка 401, просто возвращаем ошибку
        return Promise.reject(error);
    }
});

export default api;
