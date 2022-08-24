<template>
    <ConfirmDialog/>
    <DataTable :value="usuarios" dataKey="ID" responsiveLayout="scroll" :paginator="true" :rows="10"
            v-model:filters="filters"
            selectionMode="single"
            @rowSelect="rowSelected"
            stripedRows
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            :rowsPerPageOptions="[10,20,50]"
            currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords}"
            filterDisplay="menu"
            :globalFilterFields="['Nombres', 'Apellido Paterno', 'Apellido Materno', 'RUT', 'Telefono', 'Direccion' , 'Fecha Nacimiento', 'E-mail']">
        <template #header>
            <div class="flex justify-content-between">
                <span class="p-input-icon-left">
                    <i class="pi pi-search" />
                    <InputText v-model="filters['global'].value" placeholder="Filtrar" />
                </span>
                <ButtonComponent @click="createUsuario" class="ferro" label="Nuevo" icon="pi pi-plus" iconPos="right" />
            </div>
        </template>
        <DataColumn field="Nombres" header="Nombres" :sortable="true"></DataColumn>
        <DataColumn field="ApellidoPaterno" header="Apellido Paterno" :sortable="true"></DataColumn>
        <DataColumn field="ApellidoMaterno" header="Apellido Materno" :sortable="true"></DataColumn>
        <DataColumn field="RUT" header="RUT" :sortable="true"></DataColumn>
        <DataColumn field="Telefono" header="Telefono" :sortable="true"></DataColumn>
        <DataColumn field="Direccion" header="Dirección" :sortable="true"></DataColumn>
        <DataColumn field="FechaNacimiento" header="Fecha Nacimiento" :sortable="true"></DataColumn>
        <DataColumn field="E-mail" header="E-mail" :sortable="true"></DataColumn>
        <DataColumn style="min-width:8rem">
            <template #body="slotProps">
                <ButtonComponent icon="pi pi-pencil" class="p-button-rounded p-button-warning mr-2" @click="modifyUsuario(slotProps.data)" />
                <ButtonComponent icon="pi pi-trash" class="p-button-rounded p-button-danger" @click="confirmDeleteUsuario(slotProps.data)" />
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
            getUsuarios();
        });

        const router = useRouter();

        const confirm = useConfirm();

        // si el puerto es 8080, no es con proxy
        const url = new URL(window.location.href);
        const api = (url.port == "8080") ? "http://localhost:3001" : "/api";

        const usuarios = ref([]);

        const filters = ref({
            'global': { value: null, matchMode: FilterMatchMode.CONTAINS }
        });

        const rowSelected = (event) => {
            router.push("/usuarios/" + event.data.ID);
        };

        const getUsuarios = () => {
            axios
                .get(api + "/usuarios")
                .then((response) => {
                    response.data.forEach(element => {
                        let usuario = {
                            ID: element.ID,
                            Nombres: element.Nombres,
                            ApellidoPaterno: element.ApellidoPaterno,
                            ApellidoMaterno: element.ApellidoMaterno,
                            RUT:element.RUT,
                            Telefono: element.Telefono,
                            FechaNacimiento: element.FechaNacimiento,
                            Email:element.Email,
                            Direccion: element.Direccion
                        };
                        usuarios.value.push(usuario);
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        };

        const createUsuario = () => {
            router.push({name: "Crear Usuario Registrado"});
            //router.push("/usuarios/crear");
        };

        const modifyUsuario = (usuario) => {
            router.push("/usuarios/modificar/" + usuario.ID);
        };

        const confirmDeleteUsuario = (usuario) => {
            confirm.require({
                message: 'Estás seguro que quiere eliminar el usuario "' + usuario.Nombre + '"?',
                header: 'Confirmación',
                icon: 'pi pi-exclamation-triangle',
                acceptClass: 'p-button-danger',
                accept: () => {
                    deleteUsuario(usuario);
                },
                reject: () => {
                    console.log("rejected");
                }
            });
        };

        const deleteUsuario = (usuario) => {
            axios
                .delete(api + "/usuarios/" + usuario.ID)
                .then((response) => {
                    console.log(response);
                })
                .catch(err => {
                    console.log(err);
                });
            usuarios.value = usuarios.value.filter(data => data.ID != usuario.ID);
        };

        return {
            getUsuarios,
            createUsuario,
            modifyUsuario,
            confirmDeleteUsuario,
            deleteUsuario,
            usuarios,
            filters,
            rowSelected
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
