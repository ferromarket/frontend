<template>
    <ConfirmDialog/>
    <DialogBox header="Error" v-model:visible="displayModal" :breakpoints="{'960px': '75vw', '640px': '90vw'}" :style="{width: '25vw'}" :modal="true">
        <p class="m-0">{{modalMessage}}</p>
        <template #footer>
            <ButtonComponent label="Cerrar" icon="pi pi-check" @click="closeModal" class="p-button-danger" autofocus />
        </template>
    </DialogBox>
    <div class="w-full justify-content-center p-fluid grid">
            <div class="field col-12">
                <span class="p-float-label">
                <InputMask mask="99999999-9" v-model="rut" v-bind:class="{ 'p-invalid': rutError }"  />
                <label for="rut">Rut</label>
                </span>
            </div>

        <div class="field col-12">
            <span class="p-float-label">
                <InputText id="email" type="email" v-model="email" v-bind:class="{ 'p-invalid': emailError }" />
                <label for="email">Email</label>
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
                <InputText id="nombres" type="text" v-model="nombres" v-bind:class="{ 'p-invalid': nombresError }" />
                <label for="nombres">Nombres</label>
            </span>
        </div>

        <div class="field col-6">
            <span class="p-float-label">
                <InputText id="apellidoPaterno" type="text" v-model="apellidoPaterno" v-bind:class="{ 'p-invalid': apellidoPaternoError }" />
                <label for="apellidoPaterno">Apellido Paterno</label>
            </span>
        </div>

        <div class="field col-6">
            <span class="p-float-label">
                <InputText id="apellidoMaterno" type="text" v-model="apellidoMaterno" v-bind:class="{ 'p-invalid': apellidoMaternoError }" />
                <label for="apellidoMaterno">Apellido Materno</label>
            </span>
        </div>

        <div class="field col-12">
            <span class="p-float-label">
                <InputText id="direccion" type="text" v-model="direccion" v-bind:class="{ 'p-invalid': direccionError }" />
                <label for="direccion">Dirección</label>
            </span>
        </div>

            <div class="field col-6">
                <span class="p-float-label">
                <InputMask mask="99999999" v-model="telefono" v-bind:class="{ 'p-invalid': fechaNacimientoError }"  />
                <label for="telefono">Telefono</label>
                </span>
            </div>

            <div class="field col-6">
                <span class="p-float-label">
                <InputMask mask="99/99/9999" v-model="fechaNacimiento" slotChar="mm/dd/yyyy" v-bind:class="{ 'p-invalid': fechaNacimientoError }" />
                <label for="fechaLicencia">Fecha de Nacimiento</label>
                </span>
            </div>

        <div class="field col-6">
            <span class="p-float-label">
                <InputText id="tipoLicencia" type="text" v-model="tipoLicencia" v-bind:class="{ 'p-invalid': tipoLicenciaError }" />
                <label for="tipoLicencia">Tipo De Licencia</label>
            </span>
        </div>
      
            <div class="field col-6">
                <span class="p-float-label">
                <InputMask mask="99/99/9999" v-model="fechaLicencia" slotChar="mm/dd/yyyy" v-bind:class="{ 'p-invalid': fechaLicenciaError }" />
                <label for="fechaLicencia">Fecha de Nacimiento</label>
                </span>
            </div>
        
        <div class="field col-12">
            <ButtonComponent @click="crearRepartidorClicked" class="repartidor" label="Crear" icon="pi pi-check" iconPos="right" />
        </div>
        
    </div>                    
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useConfirm } from "primevue/useconfirm";

export default {



    
    setup() {
        
        onMounted(() => {
           
        });
        // si el puerto es 8080, no es con proxy
        const url = new URL(window.location.href);
        const api = (url.port == "8080") ? "http://localhost:3001" : "/api";

        const confirm = useConfirm();
        const displayModal = ref(false);
        const modalMessage = ref("");
        let today;
        const rut = ref("");
        const contrasena = ref("");
        const email = ref("");
        const nombres = ref("");
        const apellidoPaterno = ref("");
        const apellidoMaterno = ref("");
        const telefono = ref(0);
        const direccion = ref("");
        const fechaNacimiento = ref([]);
        const tipoLicencia= ref("");
        const fechaLicencia = ref([]);

        const rutError = ref(false);
        const contrasenaError = ref(false);
        const emailError = ref(false);
        const nombresError = ref(false);
        const apellidoPaternoError = ref(false);
        const apellidoMaternoError = ref(false);
        const telefonoError = ref(false);
        const direccionError = ref(false);
        const fechaNacimientoError = ref(false);
        const tipoLicenciaError = ref(false);
        const fechaLicenciaError = ref(false);


        const crearRepartidorClicked = () => {
            if (validar()) {
                confirm.require({
                    message: 'Usted se registrará como "' + nombres.value + '"?',
                    header: 'Confirmación',
                    icon: 'pi pi-info-circle',
                    acceptClass: 'p-button-warning',
                    accept: () => {
                        crearRepartidor();
                    },
                    reject: () => {
                        console.log("rejected");
                    }
                });
            }
        };




        

        const validar = () => {
            rutError.value = false;
            contrasenaError.value  = false;
            emailError.value = false;
            nombresError.value = false;
            apellidoPaternoError.value = false;
            apellidoMaternoError.value = false;
            telefonoError.value = false;
            direccionError.value = false;
            fechaNacimientoError.value = false;
            tipoLicenciaError.value = false;
            fechaLicenciaError.value = false;
            if (rut.value.trim() === "") {
                nombresError.value = true;
                openModal("Falta el rut del repartidor a registrar!");
                return false;
            }
            if (contrasena.value.trim() === "") {
                nombresError.value = true;
                openModal("Falta la contraseña del repartidor a registrar!");
                return false;
            }
            if (email.value.trim() === "") {
                nombresError.value = true;
                openModal("Falta el Email del repartidor a registrar!");
                return false;
            }
            if (nombres.value.trim() === "") {
                nombresError.value = true;
                openModal("Falta nombre del repartidor a registrar!");
                return false;
            }
            if (apellidoPaterno.value.trim() === "") {
                nombresError.value = true;
                openModal("Falta el apellido Paterno del repartidor a registrar!");
                return false;
            }
            if (apellidoMaterno.value.trim() === "") {
                nombresError.value = true;
                openModal("Falta el apellido Maternonombre del repartidor a registrar!");
                return false;
            }
            if (telefono.value.trim() === "") {
                nombresError.value = true;
                openModal("Falta el Telefono del repartidor a registrar!");
                return false;
            }
            if (direccion.value.trim() === "") {
                direccionError.value = true;
                openModal("Falta la direccion del repartidor a registrar!");
                return false;
            }
            if (fechaNacimiento.value.trim() === null) {
                fechaNacimientoError.value = true;
                openModal("Falta la Fecha Nacimiento del repartidor a registrar!");
                return false;
            }
            if (tipoLicencia.value.trim() != 'b' && tipoLicencia.value.trim() != "B" && tipoLicencia.value.trim() != "c"&& tipoLicencia.value.trim() != "C" && tipoLicencia.value.trim() != "d" && tipoLicencia.value.trim() != "D"&& tipoLicencia.value.trim() != "d" && tipoLicencia.value.trim() != "F" && tipoLicencia.value.trim() != "f" ) {
                tipoLicenciaError.value = true;
                openModal("El tipo de licencia solo puede ser: B,C,D,E,F");
                return false;
            }
            if (tipoLicencia.value.trim() === "") {
                tipoLicenciaError.value = true;
                openModal("Falta el tipo de licencia del repartidor a registrar!");
                return false;
            }
            if (fechaLicencia.value.trim() >= today ) {
                fechaLicenciaError.value = true;
                openModal("La fecha del control de la licencia tiene que estar habilitada del repartidor a registrar!");
                return false;
            }
            return true;
        };

        const openModal = (message) => {
            modalMessage.value = message;
            displayModal.value = true;
        };

        const closeModal = () => {
            displayModal.value = false;
        };

        const crearRepartidor = () => {
            axios
                .post(api + "/repartidor", {
                    Rut: rut.value,
                    Contraseña: contrasena.value,
                    Email: email.value,
                    Nombres: nombres.value,
                    ApellidoPaterno: apellidoPaterno.value,
                    ApellidoMaterno: apellidoMaterno.value,
                    Telefono: telefono.value,
                    Direccion: direccion.value,
                    FechaNacimiento: fechaNacimiento.value,
                    TipoLicencia: tipoLicencia.value,
                    FechaLicencia: fechaLicencia.value,
                           })
                .then(function (response) {
                    if (response !== null && response.status != 204) {
                        console.log(response);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        };


        return { rut,
            rutError,
            contrasena,
            contrasenaError,
            email,
            emailError,
            nombres,
            nombresError,
            apellidoPaterno,
            apellidoPaternoError,
            apellidoMaterno,
            apellidoMaternoError,
            telefono,
            telefonoError,
            direccion,
            direccionError,
            fechaNacimiento,
            fechaNacimientoError,
            tipoLicencia,
            tipoLicenciaError,
            fechaLicencia,
            fechaLicenciaError,
            crearRepartidorClicked,
            crearRepartidor,
            validar,
            displayModal,
            modalMessage,
            openModal,
            closeModal,
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
