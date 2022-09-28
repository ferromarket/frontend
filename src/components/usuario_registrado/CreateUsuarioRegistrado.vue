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
                <label for="nombre">Nombres</label>
            </span>
        </div>
        <div class="field col-12">
            <span class="p-float-label">
                <InputText id="rut" type="text" v-model="rut" v-bind:class="{ 'p-invalid': rutError }" />
                <label for="rut">Rut sin puntos ni guion</label>
            </span>
        </div>
        <div class="field col-12">
            <span class="p-float-label">
                <PassWord v-model="contrasena" :feedback="false" v-bind:class="{ 'p-invalid': contrasenaError }" />
                <label for="contrasena">Contraseña</label>
            </span>
        </div>
        <div class="field col-12">
            <span class="p-float-label">
                <InputText id="email" type="text" v-model="email" v-bind:class="{ 'p-invalid': emailError }" />
                <label for="email">E-mail</label>
            </span>
        </div>
        <div class="field col-12">
            <span class="p-float-label">
                <InputText id="apellidoP" type="text" v-model="apellidoP" v-bind:class="{ 'p-invalid': apellidoPError }" />
                <label for="apellidoP">Apellido Paterno</label>
            </span>
        </div>
        <div class="field col-12">
            <span class="p-float-label">
                <InputText id="apellidoM" type="text" v-model="apellidoM" v-bind:class="{ 'p-invalid': apellidoMError }" />
                <label for="apellidoM">Apellido Materno</label>
            </span>
        </div>
        <div class="field col-12">
            <span class="p-float-label">
                <InputMask id="telefono" mask="99999999" v-model="telefono"  v-bind:class="{ 'p-invalid': telefonoError }" />
                <label for="telefono">Telefono</label>
            </span>
        </div>
        <div class="field col-12">
            <span class="p-float-label">
                <InputText id="direccion" type="text" v-model="direccion" v-bind:class="{ 'p-invalid': direccionError }" />
                <label for="direccion">Dirección</label>
            </span>
        </div>
        <div class="field col-12">
            <span class="p-float-label">
                <InputMask id="FechaNac" mask="9999-99-99" v-model="FechaNac" slotChar="yyyy-mm-dd" v-bind:class="{ 'p-invalid': FechaNacError }" />
                <label for="FechaNac">Fecha de Nacimiento</label>
            </span>
        </div>
        <div class="field col-12 sm:col-2">
            <ButtonComponent @click="crearUsuarioClicked" class="User" label="Crear" icon="pi pi-check" iconPos="right" />
        </div>
    </div>                    
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useConfirm } from "primevue/useconfirm";
import { Buffer } from 'buffer';

export default {
    setup() {
        const router = useRouter();
        // si el puerto es 8080, no es con proxy
        const url = new URL(window.location.href);
        const api = (url.port == "8080") ? "http://localhost:3001" : "/api";
        const confirm = useConfirm();
        const displayModal = ref(false);
        const modalMessage = ref("");
        const dialogCallback = ref();
        const dialogTitle = ref("Error");
        const nombre = ref("");
        const nombreError = ref(false);
        const rut = ref("");
        const rutError = ref(false);
        const contrasena = ref("");
        const contrasenaError = ref(false);
        const email = ref("");
        const emailError = ref(false);
        const apellidoP = ref("");
        const apellidoPError = ref(false);
        const apellidoM = ref("");
        const apellidoMError = ref(false);
        const telefono = ref(Number(0));
        const telefonoError = ref(false);
        const FechaNac = ref([]);
        const FechaNacError = ref(false);
        const direccion = ref("");
        const direccionError = ref(false);
        const error = ref(false);
        const savedID = ref(0);
        const crearUsuarioClicked = () => {
            if (validar()) {
                confirm.require({
                    message: "Se creará el usuario \"" + nombre.value + "\"",
                    header: "Confirmación",
                    icon: "pi pi-info-circle",
                    acceptClass: "p-button-warning",
                    accept: () => {
                        crearUsuario();
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
                openModal("Falta nombre del usuario!");
                return false;
            }
            if (direccion.value.trim() === "") {
                direccionError.value = true;
                error.value = true;
                openModal("Ingrese una dirección");
                return false;
            }
            return true;
        };
        const openModal = (message, callback = null, id = 0) => {
            modalMessage.value = message;
            dialogCallback.value = callback;
            savedID.value = id;
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
            if (savedID.value > 0 && dialogCallback.value !== null && typeof dialogCallback.value === "function") {
                dialogCallback.value(savedID.value);
            }
        };
        const crearUsuario = () => {
            axios
                .post(api + "/usuario", {
                RUT:rut.value,
                Contrasena:Buffer.from(contrasena.value).toString('base64'),
                Email:email.value,
                Nombres: nombre.value,
                ApellidoPaterno: apellidoP.value,
                ApellidoMaterno: apellidoM.value,
                Telefono: Number(telefono.value),
                Direccion: direccion.value,
                FechaNacimiento: FechaNac.value
            })
                .then(function (response) {
                if (response !== null && response.status === 200) {
                    openModal("Usuario creado exitosamente!", redirect, response.data.ID);
                }
                else {
                    console.log(response);
                }
            })
                .catch(function (error) {
                console.log(error);
            });
        };
        const redirect = (id) => {
            router.push("/usuario/" + id);
        };
        return { nombre, 
            nombreError,
            rut, 
            rutError, 
            contrasena, 
            contrasenaError, 
            email, 
            emailError, 
            apellidoP, 
            apellidoPError, 
            apellidoM, 
            apellidoMError, 
            telefono, 
            telefonoError, 
            FechaNac, 
            FechaNacError, 
            direccion, 
            direccionError, 
            crearUsuarioClicked, 
            crearUsuario, 
            validar, 
            displayModal, 
            dialogTitle, 
            modalMessage, 
            openModal, 
            closeModal, 
            error };
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
