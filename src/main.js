import { createApp } from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/mdc-light-indigo/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

import Menubar from 'primevue/menubar';
import InputText from 'primevue/inputtext';

import { createRouter, createWebHistory } from 'vue-router';

// route level code-splitting
// this generates a separate chunk (about.[hash].js) for this route
// which is lazy-loaded when the route is visited.
const MainNavbar = () => import(/* webpackChunkName: "navbar" */ './layouts/MainNavbar.vue');

const MainFooter = () => import(/* webpackChunkName: "footer" */ './layouts/MainFooter.vue');

const IndexView = () => import(/* webpackChunkName: "index_view" */ './views/IndexView.vue');

const HelloWorld = () => import(/* webpackChunkName: "hello_world" */ './views/HelloWorld.vue');

const routes = [
    {
        path: '/',
        name: 'Home',
        components: {
            default: IndexView,
            header: MainNavbar,
            footer: MainFooter
        }
    },
    {
        path: '/about',
        name: 'About',
        components: {
            default: HelloWorld,
            header: MainNavbar,
            footer: MainFooter
        }
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

const app = createApp(App);

app.use(PrimeVue);
app.component('MenuBar', Menubar);
app.component('InputText', InputText);

app.use(router);

app.mount('#app');

export default router
