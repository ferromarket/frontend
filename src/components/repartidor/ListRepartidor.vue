<template>
    <ConfirmDialog/>
    <DataTable :value="repartidores" dataKey="ID" responsiveLayout="scroll" :paginator="true" :rows="10"
            v-model:filters="filters"
            selectionMode="single"
            @rowSelect="rowSelected"
            stripedRows
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            :rowsPerPageOptions="[10,20,50]"
            currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords}"
            filterDisplay="menu"
            :globalFilterFields="['Rut', 'Email', 'Nombres', 'Apellido P.', 'Apellido M.', 'Telefono', 'Direcion', 'Fecha Registro','Tipo Licencia','Fecha de Licencia']">
        <template #header>
            <div class="flex justify-content-between">
                <span class="p-input-icon-left">
                    <i class="pi pi-search" />
                    <InputText v-model="filters['global'].value" placeholder="Filtrar" />
                </span>
                <ButtonComponent @click="createRepartidor" class="repartidor" label="Nuevo" icon="pi pi-plus" iconPos="right" />
            </div>
        </template>
        <DataColumn field="Rut" header="Rut" :sortable="true"></DataColumn>
        <DataColumn field="Email" header="Email" :sortable="true"></DataColumn>
        <DataColumn field="Nombres" header="Nombres" :sortable="true"></DataColumn>
        <DataColumn field="ApellidoPaterno" header="Apellido Paterno" :sortable="true"></DataColumn>
        <DataColumn field="ApellidoMaterno" header="Apellido Materno" :sortable="true"></DataColumn>
        <DataColumn field="Telefono" header="Telefono" :sortable="true"></DataColumn>
        <DataColumn field="Direccion" header="Direccion" :sortable="true"></DataColumn>
        <!--<DataColumn field="CreatedAt" header="Fecha Registro" :sortable="true"></DataColumn>-->
        <DataColumn field="TipoLicencia" header="Tipo De Licencia" :sortable="true"></DataColumn>
        <!--<DataColumn field="FechaLicencia" header="Fecha de Licencia" :sortable="true"></DataColumn>-->
        <DataColumn style="min-width:8rem">
            <template #body="slotProps">
                <ButtonComponent icon="pi pi-pencil" class="p-button-rounded p-button-warning mr-2" @click="editarRepartidor(slotProps.data)" />
                <ButtonComponent icon="pi pi-trash" class="p-button-rounded p-button-danger" @click="confirmDeleteRepartidor(slotProps.data)" />
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
            getRepartidores();
        });

        const router = useRouter();
        const confirm = useConfirm();

        // si el puerto es 8080, no es con proxy
        const url = new URL(window.location.href);
        const api = (url.port == "8080") ? "http://localhost:3001" : "/api";

        const repartidores = ref([]);

        const filters = ref({
            'global': { value: null, matchMode: FilterMatchMode.CONTAINS }
        });

        const rowSelected = (event) => {
            router.push("/repartidor/" + event.data.ID);
        };

        const getRepartidores = () => {
            axios
                .get(api + "/repartidores")
                .then((response) => {
                    response.data.forEach(element => {
                        let repartidor = {
                            CreatedAt: element.CreatedAt ,
                            ID: element.ID,
                            Rut: element.RUT,
                            Email: element.Email,
                            Nombres: element.Nombres,
                            ApellidoPaterno: element.ApellidoPaterno,
                            ApellidoMaterno: element.ApellidoMaterno,
                            Telefono: element.Telefono,
                            Direccion: element.Direccion,
                            FechaRegistro: element.FechaRegistracion,
                            TipoLicencia: element.TipoLicencia,
                            FechaLicencia: element.FechaLicencia,

                        };
                        repartidores.value.push(repartidor);
                    });
                })
               
                .catch(err => {
                    console.log(err);
                });
        };

        const createRepartidor = () => {
            router.push({name: "Registrar Repartidor"});
            //router.push("/repartidor/crear");
        };

        const editarRepartidor = (repartidor) => {
            router.push("/repartidor/Editar/" + repartidor.ID);
        };

        const confirmDeleteRepartidor = (repartidor) => {
            confirm.require({
                message: 'Estás seguro que quieres eliminar al repartidor "' + repartidor.Nombres + '"?',
                header: 'Confirmación',
                icon: 'pi pi-exclamation-triangle',
                acceptClass: 'p-button-danger',
                accept: () => {
                    deleteRepartidor(repartidor);
                },
                reject: () => {
                    console.log("rejected");
                }
            });
        };

        const deleteRepartidor = (repartidor) => {
            axios
                .delete(api + "/repartidor/" + repartidor.ID)
                .then((response) => {
                    console.log(response);
                })
                .catch(err => {
                    console.log(err);
                });
            repartidores.value = repartidores.value.filter(data => data.ID != repartidor.ID);
        };

        return {

            getRepartidores,
            createRepartidor,
            editarRepartidor,
            confirmDeleteRepartidor,
            deleteRepartidor,
            repartidores,
            filters,
            rowSelected
            
        };
    }
};
</script>

<style scoped lang="scss">
::v-deep(.repartidor) {
    background: var(--orange-400) !important;
    color: var(--surface-0) !important;
}
.repartidor:hover {
    background: var(--orange-500) !important;
    color: var(--surface-0) !important;
}
</style>
