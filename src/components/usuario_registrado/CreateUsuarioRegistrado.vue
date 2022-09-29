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
                <InputMask mask="99.999.999-*" v-model="rut" v-bind:class="{ 'p-invalid': rutError }"  />
                <label for="rut">Rut</label>
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
                <PassWord v-model="contrasena2" :feedback="false" v-bind:class="{ 'p-invalid': contrasena2Error }" />
                <label for="contrasena2">Repita la Contraseña</label>
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
                <InputMask id="FechaNac" mask="9999-99-99" v-model="FechaNac" slotChar="YYYY-MM-DD" v-bind:class="{ 'p-invalid': FechaNacError }" />
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
        const contrasena2 = ref("");
        const contrasena2Error = ref(false);
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
            FechaNacError.value = false;
            contrasena2Error.value = false;
            contrasenaError.value = false;
            apellidoPError.value = false;
            emailError.value = false;
            telefonoError.value = false;
            rutError.value = false;
            error.value = false;

            if (nombre.value.trim() === "") {
                nombreError.value = true;
                error.value = true;
                openModal("Falta nombre del usuario!");
                return false;
            }
            const Udigito = rut.value.slice(-1);
            if (Udigito != "k" && isNaN(Udigito)) {
                rutError.value = true;
                error.value = true;
                openModal("El digitio verificador solo puede ser k o un numero!");
                return false;
            }
            
            if (contrasena.value.trim() === "") {
                contrasenaError.value = true;
                error.value = true;
                openModal("Ingrese una Contraseña");
                return false;
            }
            if (contrasena2.value.trim() === "") {
                contrasena2Error.value = true;
                error.value = true;
                openModal("Reingrese la Contraseña");
                return false;
            }
            if (contrasena2.value.trim() != contrasena.value.trim()) {
                contrasena2Error.value = true;
                error.value = true;
                openModal("Revise que la contraseña sea igual");
                return false;
            }
            if (email.value.trim() === "") {
                emailError.value = true;
                openModal("Falta el Email del usuario a registrar!");
                return false;
            }
            if (apellidoP.value.trim() === "") {
                apellidoPError.value = true;
                error.value = true;
                openModal("Falta el apellido del usuario!");
                return false;
            }
            if (telefono.value.trim() === "") {
                telefonoError.value = true;
                error.value = true;
                openModal("Falta el Telefono del usuario a registrar!");
                return false;
            }
            if (direccion.value.trim() === "") {
                direccionError.value = true;
                error.value = true;
                openModal("Ingrese una dirección");
                return false;
            }
            if (FechaNac.value === "" ) {
                FechaNac.value = true;
                openModal("Falta la Fecha Nacimiento del Usuario");
                return false;
            }
            console.log(rut.value);
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
            contrasena2, 
            contrasena2Error, 
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
