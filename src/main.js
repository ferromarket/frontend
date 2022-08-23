import { createApp } from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
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
import ConfirmDialog from 'primevue/confirmdialog';
import Dialog from 'primevue/dialog';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Password from 'primevue/password';

import { createRouter, createWebHistory } from 'vue-router';

// route level code-splitting
// this generates a separate chunk (about.[hash].js) for this route
// which is lazy-loaded when the route is visited.
const MainNavbar = () => import(/* webpackChunkName: "ferromarket" */ './layouts/MainNavbar.vue');
const MainFooter = () => import(/* webpackChunkName: "ferromarket" */ './layouts/MainFooter.vue');

const LoginAuth = () => import(/* webpackChunkName: "login" */ './views/LoginAuth.vue');

const IndexView = () => import(/* webpackChunkName: "index_view" */ './views/IndexView.vue');

const CreateFerreteria = () => import(/* webpackChunkName: "ferreteria" */ './views/ferreteria/CreateFerreteria.vue');
const ModifyFerreteria = () => import(/* webpackChunkName: "ferreteria" */ './views/ferreteria/ModifyFerreteria.vue');
const ListFerreteria = () => import(/* webpackChunkName: "ferreteria" */ './views/ferreteria/ListFerreteria.vue');
const ShowFerreteria = () => import(/* webpackChunkName: "ferreteria" */ './views/ferreteria/ShowFerreteria.vue');

const routes = [
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        components: {
            default: IndexView,
            header: MainNavbar,
            footer: MainFooter
        }
    },
    {
        path: '/',
        name: 'Inicio',
        components: {
            default: IndexView,
            header: MainNavbar,
            footer: MainFooter
        }
    },
    {
        path: '/ingresar',
        name: 'Ingresar',
        components: {
            default: LoginAuth,
            header: MainNavbar,
            footer: MainFooter
        }
    },
    {
        path: '/ferreterias',
        name: 'Ferreterías',
        components: {
            default: ListFerreteria,
            header: MainNavbar,
            footer: MainFooter
        }
    },
    {
        path: '/ferreteria/:id',
        name: 'Mostrar ferretería',
        components: {
            default: ShowFerreteria,
            header: MainNavbar,
            footer: MainFooter
        }
    },
    {
        path: '/ferreteria/crear',
        name: 'Crear ferretería',
        components: {
            default: CreateFerreteria,
            header: MainNavbar,
            footer: MainFooter
        }
    },
    {
        path: '/ferreteria/modificar/:id',
        name: 'Modificar ferretería',
        components: {
            default: ModifyFerreteria,
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

app.use(PrimeVue, {
    locale: {
        startsWith: 'Empieza con',
        contains: 'Contiene',
        notContains: 'No contiene',
        endsWith: 'Termina con',
        equals: 'Igual a',
        notEquals: 'No igual a',
        noFilter: 'No Filtro',
        lt: 'Menor a',
        lte: 'Menor o igual a',
        gt: 'Mayor a',
        gte: 'Mayor o igual a',
        dateIs: 'Fecha es',
        dateIsNot: 'Fecha no es',
        dateBefore: 'Fecha es antes',
        dateAfter: 'Fecha es después',
        clear: 'Vaciar',
        apply: 'Aplicar',
        matchAll: 'Coincidir con Todos',
        matchAny: 'Coincidir con Cualquiera',
        addRule: 'Agregar Regla',
        removeRule: 'Quitar Regla',
        accept: 'Aceptar',
        reject: 'Rechazar',
        choose: 'Elegir',
        upload: 'Subir',
        cancel: 'Cancelar',
        dayNames: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
        dayNamesShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
        dayNamesMin: ["Do","Lu","Ma","Mi","Ju","Vi","Sá"],
        monthNames: ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],
        monthNamesShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun","Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
        today: 'Hoy',
        weekHeader: 'Sm',
        firstDayOfWeek: 1,
        dateFormat: 'dd/mm/yy',
        weak: 'Débil',
        medium: 'Mediano',
        strong: 'Fuerte',
        passwordPrompt: 'Ingresar una contraseña',
        emptyFilterMessage: 'No resultados encontrados',
        emptyMessage: 'No opciones disponibles'
    }
});
app.use(ConfirmationService);
app.component('MenuBar', Menubar);
app.component('CardPanel', Card);
app.component('InputText', InputText);
app.component('TextArea', Textarea);
app.component('DropDown', Dropdown);
app.component('ButtonComponent', Button);
app.component('CheckBox', Checkbox);
app.component('ConfirmDialog', ConfirmDialog);
app.component('DialogBox', Dialog);
app.component('DataTable', DataTable);
app.component('DataColumn', Column);
app.component('PasswordInput', Password);

app.use(router);

app.config.globalProperties.axios = axios;

app.mount('#app');

export default router;
