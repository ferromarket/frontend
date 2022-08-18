<template>
    <ConfirmDialog/>
    <DataTable :value="ferreterias" dataKey="ID" responsiveLayout="scroll" :paginator="true" :rows="10"
            v-model:filters="filters"
            stripedRows
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            :rowsPerPageOptions="[10,20,50]"
            currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords}"
            filterDisplay="menu"
            :globalFilterFields="['Nombre', 'Region', 'Ciudad', 'Comuna', 'Direccion', 'Abrir', 'Cerrar']">
        <template #header>
            <div class="flex justify-content-between">
                <span class="p-input-icon-left">
                    <i class="pi pi-search" />
                    <InputText v-model="filters['global'].value" placeholder="Filtrar" />
                </span>
                <ButtonComponent @click="createFerreteria" class="ferro" label="Nuevo" icon="pi pi-plus" iconPos="right" />
            </div>
        </template>
        <DataColumn field="Nombre" header="Nombre" :sortable="true"></DataColumn>
        <DataColumn field="Region" header="Región" :sortable="true"></DataColumn>
        <DataColumn field="Ciudad" header="Ciudad" :sortable="true"></DataColumn>
        <DataColumn field="Comuna" header="Comuna" :sortable="true"></DataColumn>
        <DataColumn field="Direccion" header="Dirección" :sortable="true"></DataColumn>
        <DataColumn field="Abrir" header="Abrir" :sortable="true"></DataColumn>
        <DataColumn field="Cerrar" header="Cerrar" :sortable="true"></DataColumn>
        <DataColumn style="min-width:8rem">
            <template #body="slotProps">
                <ButtonComponent icon="pi pi-pencil" class="p-button-rounded p-button-warning mr-2" @click="modifyFerreteria(slotProps.data)" />
                <ButtonComponent icon="pi pi-trash" class="p-button-rounded p-button-danger" @click="confirmDeleteFerreteria(slotProps.data)" />
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
            getFerreterias();
        });

        const router = useRouter();

        const confirm = useConfirm();

        // si el puerto es 8080, no es con proxy
        const url = new URL(window.location.href);
        const api = (url.port == "8080") ? "http://localhost:3001" : "/api";

        const displayModal = ref(false);
        const modalMessage = ref("");

        const ferreterias = ref([]);

        const filters = ref({
            'global': {value: null, matchMode: FilterMatchMode.CONTAINS}
        });

        const getFerreterias = () => {
            axios
                .get(api + "/ferreterias")
                .then((response) => {
                    response.data.forEach(element => {
                        let ferreteria = {
                            ID: element.ID,
                            Nombre: element.Nombre,
                            Region: element.Comuna.Ciudad.Region.Nombre,
                            Ciudad: element.Comuna.Ciudad.Nombre,
                            Comuna: element.Comuna.Nombre,
                            Direccion: element.Direccion,
                            Abrir: element.Horarios[0].Abrir.Hora,
                            Cerrar: element.Horarios[0].Cerrar.Hora
                        };
                        ferreterias.value.push(ferreteria);
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        };

        const createFerreteria = () => {
            router.push({name: "Crear ferretería"});
            //router.push("/ferreteria/crear");
        };

        const modifyFerreteria = (ferreteria) => {
            router.push("/ferreteria/modificar/" + ferreteria.ID);
        };

        const confirmDeleteFerreteria = (ferreteria) => {
            confirm.require({
                message: 'Estás seguro que quieres eliminar la ferretería "' + ferreteria.Nombre + '"?',
                header: 'Confirmación',
                icon: 'pi pi-exclamation-triangle',
                acceptClass: 'p-button-danger',
                accept: () => {
                    deleteFerreteria(ferreteria);
                },
                reject: () => {
                    console.log("rejected");
                }
            });
        };

        const deleteFerreteria = (ferreteria) => {
            axios
                .delete(api + "/ferreteria/" + ferreteria.ID)
                .then((response) => {
                    console.log(response);
                })
                .catch(err => {
                    console.log(err);
                });
            ferreterias.value = ferreterias.value.filter(data => data.ID != ferreteria.ID);
        };

        return {
            getFerreterias,
            createFerreteria,
            modifyFerreteria,
            confirmDeleteFerreteria,
            deleteFerreteria,
            ferreterias,
            filters,
            displayModal,
            modalMessage
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
