<template>
    <ConfirmDialog/>
    <DataTable :value="productos" dataKey="ID" responsiveLayout="scroll" :paginator="true" :rows="10"
            v-model:filters="filters"
            selectionMode="single"
            @rowSelect="rowSelected"
            stripedRows
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            :rowsPerPageOptions="[10,20,50]"
            currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords}"
            filterDisplay="menu"
            :globalFilterFields="['Nombre', 'Categoria', 'Marca', 'Detalle']">
        <template #header>
            <div class="flex justify-content-between">
                <span class="p-input-icon-left">
                    <i class="pi pi-search" />
                    <InputText v-model="filters['global'].value" placeholder="Filtrar" />
                </span>
                <ButtonComponent @click="createProducto" class="ferro" label="Nuevo" icon="pi pi-plus" iconPos="right" />
            </div>
        </template>
        <DataColumn field="Nombre" header="Nombre" :sortable="true"></DataColumn>
        <DataColumn field="Categoria" header="Categoria" :sortable="true"></DataColumn>
        <DataColumn field="Marca" header="Marca" :sortable="true"></DataColumn>
        <DataColumn field="Detalle" header="Detalle" :sortable="true"></DataColumn>

        <DataColumn style="min-width:8rem">
            <template #body="slotProps">
                <ButtonComponent icon="pi pi-pencil" class="p-button-rounded p-button-warning mr-2" @click="modifyProducto(slotProps.data)" />
                <ButtonComponent icon="pi pi-trash" class="p-button-rounded p-button-danger mr-2" @click="confirmDeleteProducto(slotProps.data)" />
            </template>
        </DataColumn>
    </DataTable>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { FilterMatchMode } from 'primevue/api';
import { useConfirm } from "primevue/useconfirm";
import axios from 'axios';

export default {
    setup() {
        onMounted(() => {
            getProducto();
        });

        const router = useRouter();
        const confirm = useConfirm();

        // si el puerto es 8080, no es con proxy
        const url = new URL(window.location.href);
        const api = (url.port == "8080") ? "http://localhost:3001" : "/api";

        const productos = ref([]);

        const filters = ref({
            'global': {value: null, matchMode: FilterMatchMode.CONTAINS}
        });

        const rowSelected = (event) => {
            router.push("/producto/" + event.data.ID);
        };

        const getProducto = () => {
            axios
                .get(api + "/productos")
                .then((response) => {
                    response.data.forEach(element => {
                        let producto = {
                            ID: element.ID,
                            Nombre: element.Nombre,
                            Categoria: element.Categoria.Nombre,
                            Marca: element.Valor1,
                            Detalle: element.Valor2,                          
                        };
                        productos.value.push(producto);
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        };
        
        const createProducto = () => {
            router.push({name: "Crear Producto"});
            //router.push("/producto/crear");
        };

        const modifyProducto = (producto) => {
            router.push("/producto/modificar/" + producto.ID);
        }; 

        const confirmDeleteProducto = (producto) => {
            confirm.require({
                message: 'Estás seguro que quieres eliminar "' + producto.Nombre + '" de la lista?',
                header: 'Confirmación',
                icon: 'pi pi-exclamation-triangle',
                acceptClass: 'p-button-danger',
                accept: () => {
                    deleteProducto(producto);
                },
                reject: () => {
                    console.log("rejected");
                }
            });
        };

        const deleteProducto = (producto) => {
            axios
                .delete(api + "/producto/" + producto.ID)
                .then((response) => {
                    console.log(response);
                })
                .catch(err => {
                    console.log(err);
                });
            productos.value = productos.value.filter(data => data.ID != producto.ID);
        };



        return {
            getProducto,
            createProducto,
            modifyProducto,
            confirmDeleteProducto,
            deleteProducto,
            rowSelected,
            productos,
            filters
        };
    }
};
</script>

<style scoped lang="scss">
::v-deep(.ferro) {
    background: var(--orange-400) !important;
    color: var(--surface-0) !important;
}
.ferro:hover {
    background: var(--orange-500) !important;
    color: var(--surface-0) !important;
}
</style>