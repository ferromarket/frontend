<template>
    <MenuBar :model="items" class="navbar">
        <template #start>
            <router-link to="/"><img alt="logo" src="../assets/FerroMarket.png" height="50" class="mr-2"></router-link>
        </template>
        <template #end>
            <InputText placeholder="Search" type="text" />
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
                        to: '/ferreteria',
                        items: [
                            {
                                label: 'Crear',
                                //icon:'pi pi-fw pi-plus',
                                to: '/ferreteria/create'
                            }
                        ]
                    },
                    /*{
                        separator: true
                    }*/
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
