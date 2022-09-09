<template>
    <ConfirmDialog/>
    <DataTable :value="vehiculos" dataKey="ID" responsiveLayout="scroll" :paginator="true" :rows="10"
            v-model:filters="filters"
            selectionMode="single"
            @rowSelect="rowSelected"
            stripedRows
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            :rowsPerPageOptions="[10,20,50]"
            currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords}"
            filterDisplay="menu"
            :globalFilterFields="['Marca', 'Modelo', 'Ano', 'Patente']">
        <template #header>
            <div class="flex justify-content-between">
                <span class="p-input-icon-left">
                    <i class="pi pi-search" />
                    <InputText v-model="filters['global'].value" placeholder="Filtrar" />
                </span>
            </div>
        </template>
        <DataColumn field="Marca" header="Marca" :sortable="true"></DataColumn>
        <DataColumn field="Modelo" header="Modelo" :sortable="true"></DataColumn>
        <DataColumn field="Ano" header="Año" :sortable="true"></DataColumn>
        <DataColumn field="Patente" header="Patente" :sortable="true"></DataColumn>
        <DataColumn style="min-width:8rem">
            <template #body="slotProps">
                <ButtonComponent icon="pi pi-pencil" class="p-button-rounded p-button-warning mr-2" @click="editarVehiculo(slotProps.data)" />
                <ButtonComponent icon="pi pi-trash" class="p-button-rounded p-button-danger" @click="confirmDeleteVehiculo(slotProps.data)" />
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
            getVehiculos();
        });

        const router = useRouter();
        const confirm = useConfirm();

        // si el puerto es 8080, no es con proxy
        const url = new URL(window.location.href);
        const api = (url.port == "8080") ? "http://localhost:3001" : "/api";

        const vehiculos = ref([]);

        const filters = ref({
            'global': { value: null, matchMode: FilterMatchMode.CONTAINS }
        });

        const rowSelected = (event) => {
           router.push("/vehiculo/" + event.data.ID);
        };


        const getVehiculos = () => {
            axios
                .get(api + "/vehiculos")
                .then((response) => {
                    response.data.forEach(element => {
                        let vehiculo = {
                            ID: element.ID,
                            CreatedAt: element.CreatedAt ,
                            Marca: element.Marca,
                            Modelo: element.Modelo,
                            Ano: element.Ano,
                            Patente: element.Patente,


                        };
                        vehiculos.value.push(vehiculo);
                    });
                })
               
                .catch(err => {
                    console.log(err);
                });
        };

        const createVehiculo = () => {
            router.push({name: "Registrar Vehiculo"});
            //router.push("/repartidor/crear");
        };

        const editarVehiculo = (vehiculo) => {
            router.push("/vehiculo/Editar/" + vehiculo.ID);
        };

        const confirmDeleteVehiculo = (vehiculo) => {
            confirm.require({
                message: 'Estás seguro que quieres eliminar al vehiculo "' + vehiculo.Patente + '"?',
                header: 'Confirmación',
                icon: 'pi pi-exclamation-triangle',
                acceptClass: 'p-button-danger',
                accept: () => {
                    deleteVehiculo(vehiculo);
                },
                reject: () => {
                    console.log("rejected");
                }
            });
        };

        const deleteVehiculo = (vehiculo) => {
            axios
                .delete(api + "/vehiculo/" + vehiculo.ID)
                .then((response) => {
                    console.log(response);
                })
                .catch(err => {
                    console.log(err);
                });
                vehiculos.value = vehiculos.value.filter(data => data.ID != vehiculo.ID);
        };

        return {

            getVehiculos,
            createVehiculo,
            editarVehiculo,
            confirmDeleteVehiculo,
            deleteVehiculo,
            vehiculos,
            filters,
            rowSelected
            
        };
    }
};
</script>

<style scoped lang="scss">
::v-deep(.vehiculo) {
    background: var(--orange-400) !important;
    color: var(--surface-0) !important;
}
.vehiculo:hover {
    background: var(--orange-500) !important;
    color: var(--surface-0) !important;
}
</style>
