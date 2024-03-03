import { createStore } from 'vuex';

export default createStore({
    state: {
        isLoggedIn: localStorage.getItem('isLoggedIn') === 'true' || false
        // Другие свойства состояния, например, информация о пользователе
    },
    mutations: {
        setLogin(state) {
            state.isLoggedIn = true;
            localStorage.setItem('isLoggedIn', 'true'); // Сохраняем состояние авторизации в localStorage
        },
        setLogout(state) {
            state.isLoggedIn = false;
            localStorage.setItem('isLoggedIn', 'false'); // Сохраняем состояние авторизации в localStorage
        }
    }
    // Другие опции, такие как actions и getters
});
