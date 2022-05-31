<template>
    <MenuBar :model="items" class="navbar">
        <template #start>
            <img alt="logo" src="../assets/FerroMarket.png" height="80" class="mr-2">
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
                label:'File',
                icon:'pi pi-fw pi-file',
                items:[
                    {
                        label:'New',
                        icon:'pi pi-fw pi-plus',
                        items:[
                            {
                                label:'Bookmark',
                                icon:'pi pi-fw pi-bookmark'
                            },
                            {
                                label:'Video',
                                icon:'pi pi-fw pi-video'
                            },
                        ]
                    },
                    {
                        label:'Delete',
                        icon:'pi pi-fw pi-trash'
                    },
                    {
                        separator:true
                    },
                    {
                        label:'Export',
                        icon:'pi pi-fw pi-external-link'
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
