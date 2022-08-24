<template>
    <ConfirmDialog/>
    <DialogBox v-bind:header="dialogTitle" v-model:visible="displayModal" :closable="false" :breakpoints="{'960px': '75vw', '640px': '90vw'}" :style="{width: '25vw'}" :modal="true">
        <p class="m-0">{{ modalMessage }}</p>
        <template #footer>
            <ButtonComponent label="Cerrar" icon="pi pi-check" @click="closeModal" v-bind:class="{ 'p-button-danger': error }" autofocus />
        </template>
    </DialogBox>
    <div class="w-full justify-content-center p-fluid grid">
        <div class="field col-12">
            <span class="p-float-label">
                <InputText id="nombre" type="text" v-model="nombre" v-bind:class="{ 'p-invalid': nombreError }" />
                <label for="nombre">Nombre</label>
            </span>
        </div>
        <div class="field col-12">
            <span class="p-float-label">
                <InputText id="direccion" type="text" v-model="direccion" v-bind:class="{ 'p-invalid': direccionError }" />
                <label for="direccion">Dirección</label>
            </span>
        </div>
        <div class="field col-12 sm:col-3">
            <ButtonComponent @click="modificarUsuarioClicked" class="ferro" label="Modificar" icon="pi pi-check" iconPos="right" />
        </div>
    </div>                    
</template>

<script>
import { ref} from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';
import { useConfirm } from "primevue/useconfirm";

export default {
    setup() {

        const router = useRouter();
        const route = useRoute();

        // si el puerto es 8080, no es con proxy
        const url = new URL(window.location.href);
        const api = (url.port == "8080") ? "http://localhost:3001" : "/api";

        const confirm = useConfirm();
        const displayModal = ref(false);
        const modalMessage = ref("");
        const dialogCallback = ref();
        const dialogTitle = ref("Error");

        const usuario = ref();

        const nombre = ref("");
        const direccion = ref("");

        const nombreError = ref(false);
        const direccionError = ref(false);

        const error = ref(false);

        const getUsuario = () => {
            axios
                .get(api + "/usuario_registrado/" + route.params.id)
                .then((response) => {
                    usuario.value = response.data;
                    nombre.value = response.data.Nombre;
                    direccion.value = response.data.Direccion;
                })
                .catch(err => {
                    if (err.response.status === 404) {
                        router.push("/usuarios");
                    }
                    console.log(err);
                });
        };

        const modificarUsuarioClicked = () => {
            if (validar()) {
                confirm.require({
                    message: 'Modificar Usuario "' + nombre.value + '"?',
                    header: 'Confirmación',
                    icon: 'pi pi-info-circle',
                    acceptClass: 'p-button-warning',
                    accept: () => {
                        modificarUsuario();
                    },
                    reject: () => {
                        console.log("rejected");
                    }
                });
            }
        };

        const validar = () => {
            nombreError.value = false;
            direccionError.value = false;
            error.value = false;
            if (nombre.value.trim() === "") {
                nombreError.value = true;
                error.value = true;
                openModal("Falta nombre del Usuario!");
                return false;
            }
            if (direccion.value.trim() === "") {
                direccionError.value = true;
                error.value = true;
                openModal("Falta dirección del usuario!");
                return false;
            }
            return true;
        };

        const openModal = (message, callback = null) => {
            modalMessage.value = message;
            dialogCallback.value = callback;
            if (callback === null) {
                dialogTitle.value = "Error";
            }
            else {
                dialogTitle.value = "Éxito";
            }
            displayModal.value = true;
        };

        const closeModal = () => {
            displayModal.value = false;
            if (dialogCallback.value !== null && typeof dialogCallback.value === 'function') {
                dialogCallback.value();
            }
        };

        const modificarUsuario = () => {
            axios
                .patch(api + "/usuario/" + route.params.id, {
                    Nombre: nombre.value,
                    Direccion: direccion.value
                })
                .then(function (response) {
                    if (response !== null && response.status == 200) {
                        openModal("Usuario modificado exitosamente!", redirect);
                    }
                    else {
                        console.log(response);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        };

        const redirect = () => {
            router.push({name: "Mostrar Usuario"});
        };

        return {
            nombre,
            nombreError,
            direccion,
            direccionError,
            modificarUsuarioClicked,
            getUsuario,
            modificarUsuario,
            validar,
            displayModal,
            dialogTitle,
            modalMessage,
            openModal,
            closeModal,
            error
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