<template>
    <MenuBar :model="items" class="navbar">
        <template #start>
            <router-link to="/"><img alt="logo" src="../assets/FerroMarket.png" height="50" class="mr-2"></router-link>
        </template>
    </MenuBar>
</template>

<script>
import { ref } from 'vue';

export default {
    setup() {
        const items = ref([
            {
                label: '',
                icon: 'pi pi-fw pi-bars',
                items: [
                    {
                        label: 'Ferreterías',
                        //icon: 'pi pi-fw pi-plus',
                        to: '/ferreterias',
                        /*items: [
                            {
                                label: 'Crear',
                                //icon:'pi pi-fw pi-plus',
                                to: '/ferreteria/crear'
                            }
                        ]*/
                    },
                    /*{
                        separator: true
                    }*/
                    {
                        label: 'Productos',
                        //icon: 'pi pi-fw pi-plus',
                        to: '/producto',
                        /*items: [
                            {
                                label: 'Crear',
                                //icon:'pi pi-fw pi-plus',
                                to: '/producto/crear'
                            }
                        ]*/
                    },
                    /*{
                        separator: true
                    }*/
                    {
                        label: 'Usuarios Registrados',
                        //icon: 'pi pi-fw pi-plus',
                        to: '/usuario_registrado',
                        /*items: [
                            {
                                label: 'Crear',
                                //icon:'pi pi-fw pi-plus',
                                to: '/usuario_registrado/crear'
                            }
                        ]*/
                    },
                    {
                        label: 'Repartidores',
                        to: '/repartidor/Listado',
                    },
                    {
                        label: 'Carro usuarios',
                        to: '/carro',
                    },
                    {
                        label: 'Vehiculos',
                        to: '/vehiculo/Listado',
                    }
                ]
            }
        ]);

        return { items }
    }
};
</script>

<style scoped lang="scss">
.navbar {
    border: 0;
    border-radius: 0;
    padding: 5px;
    background: var(--orange-400) !important;
    color: var(--surface-0) !important;
    text-align: right;
}
</style>
