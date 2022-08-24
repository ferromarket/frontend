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
import Image from 'primevue/image';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import Calendar from 'primevue/calendar';
import InputMask from 'primevue/inputmask';
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

// Repartidor

const PerfilRepartidor = () => import(/* webpackChunkName: "repartidor" */ './views/repartidor/PerfilRepartidor.vue');
const CreateRepartidor = () => import(/* webpackChunkName: "repartidor" */ './views/repartidor/CreateRepartidor.vue');
const ListRepartidor = () => import(/* webpackChunkName: "repartidor" */ './views/repartidor/ListRepartidor.vue');
const EditarRepartidor = () => import(/* webpackChunkName: "repartidor" */ './views/repartidor/EditarRepartidor.vue');

const ListProducto = () => import(/* webpackChunkName: "producto" */ './views/producto/ListProducto.vue');
const CreateProducto = () => import(/* webpackChunkName: "producto" */ './views/producto/CreateProducto.vue');
const ModifyProducto = () => import(/* webpackChunkName: "producto" */ './views/producto/ModifyProducto.vue');
const ShowProducto = () => import(/* webpackChunkName: "producto" */ './views/producto/ShowProducto.vue');

const CreateUsuarioRegistrado = () => import(/* webpackChunkName: "usuario_registrado" */ './views/usuario_registrado/CreateUsuarioRegistrado.vue');
const ModifyUsuarioRegistrado = () => import(/* webpackChunkName: "usuario_registrado" */ './views/usuario_registrado/ModifyUsuarioRegistrado.vue');
const ListUsuarioRegistrado = () => import(/* webpackChunkName: "usuario_registrado" */ './views/usuario_registrado/ListUsuarioRegistrado.vue');
const ShowUsuarioRegistrado = () => import(/* webpackChunkName: "usuario_registrado" */ './views/usuario_registrado/ShowUsuarioRegistrado.vue');

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
    },
    {
        path: '/repartidor/:id',
        name: 'Repartidor',
        components: {
            default: PerfilRepartidor,
            header: MainNavbar,
            footer: MainFooter
        }
    },
    {
        path: '/repartidor/crear',
        name: 'Registrar Repartidor',
        components: {
            default: CreateRepartidor,
            header: MainNavbar,
            footer: MainFooter
        }
    },
    {
        path: '/repartidor/Listado',
        name: 'Listado de Repartidores',
        components: {
            default: ListRepartidor,
            header: MainNavbar,
            footer: MainFooter
        }
    },
    {
        path: '/repartidor/Editar/:id',
        name: 'Editar Repartidor',
        components: {
            default: EditarRepartidor,
            header: MainNavbar,
            footer: MainFooter
        }
    },
    {
        path: '/producto',
        name: 'Productos',
        components: {
            default: ListProducto,
            header: MainNavbar,
            footer: MainFooter
        }
    },
    {
        path: '/producto/:id',
        name: 'Mostrar producto',
        components: {
            default: ShowProducto,
            header: MainNavbar,
            footer: MainFooter
        }
    },
    {
        path: '/producto/crear',
        name: 'Crear Producto',
        components: {
            default: CreateProducto,
            header: MainNavbar,
            footer: MainFooter
        }
    },
    {
        path: '/producto/modificar/:id',
        name: 'Modificar producto',
        components: {
            default: ModifyProducto,
            header: MainNavbar,
            footer: MainFooter
        }
    },
    {
        path: '/usuario_registrado',
        name: 'Listado De Usuarios Registrados',
        components: {
            default: ListUsuarioRegistrado,
            header: MainNavbar,
            footer: MainFooter
        }
    },
    {
        path: '/usuario_registrado/:id',
        name: 'Mostrar Usuario Registrado',
        components: {
            default: ShowUsuarioRegistrado,
            header: MainNavbar,
            footer: MainFooter
        }
    },
    {
        path: '/usuario_registrado/crear',
        name: 'Crear Usuario Registrado',
        components: {
            default: CreateUsuarioRegistrado,
            header: MainNavbar,
            footer: MainFooter
        }
    },
    {
        path: '/usuario_registrado/modificar/:id',
        name: 'Modificar Usuario Registrado',
        components: {
            default: ModifyUsuarioRegistrado,
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
app.component('InputMask', InputMask);
app.component('PasswordInput', Password);
app.component('ImaGen', Image);
app.component('AccorDion', Accordion);
app.component('AccordionTab', AccordionTab);
app.component('CalenDar', Calendar);
app.component('PassWord', Password);

app.use(router);

app.config.globalProperties.axios = axios;

app.mount('#app');

export default router;
