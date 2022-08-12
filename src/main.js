import { createApp } from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/mdc-light-indigo/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import axios from 'axios';

import Menubar from 'primevue/menubar';
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import Textarea from 'primevue/textarea';
import Button from 'primevue/button';
import Checkbox from 'primevue/checkbox';

import { createRouter, createWebHistory } from 'vue-router';

// route level code-splitting
// this generates a separate chunk (about.[hash].js) for this route
// which is lazy-loaded when the route is visited.
const MainNavbar = () => import(/* webpackChunkName: "navbar" */ './layouts/MainNavbar.vue');

const MainFooter = () => import(/* webpackChunkName: "footer" */ './layouts/MainFooter.vue');

const IndexView = () => import(/* webpackChunkName: "index_view" */ './views/IndexView.vue');

const HelloWorld = () => import(/* webpackChunkName: "hello_world" */ './views/HelloWorld.vue');

const CreateFerreteria = () => import(/* webpackChunkName: "ferreteria" */ './views/ferreteria/CreateFerreteria.vue');

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
    },
    {
        path: '/ferreteria/create',
        name: 'Crear ferreteria',
        components: {
            default: CreateFerreteria,
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
app.component('CardPanel', Card);
app.component('InputText', InputText);
app.component('TextArea', Textarea);
app.component('DropDown', Dropdown);
app.component('ButtonComponent', Button);
app.component('CheckBox', Checkbox);

app.use(router);

app.config.globalProperties.axios=axios

app.mount('#app');

export default router
