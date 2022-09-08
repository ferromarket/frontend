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
                <InputText id="marca" type="text" v-model="marca" v-bind:class="{ 'p-invalid': marcaError }" />
                <label for="marca">Marca</label>
            </span>
        </div>

        <div class="field col-12">
            <span class="p-float-label">
                <InputText id="modelo" type="text" v-model="modelo" v-bind:class="{ 'p-invalid': modeloError }" />
                <label for="modelo">Modelo</label>
            </span>
        </div>

        <div class="field col-12">
                <span class="p-float-label">
                <InputMask mask="9999" v-model="ano" v-bind:class="{ 'p-invalid': anoError }"  />
                <label for="ano">Año</label>
                </span>
            </div>

            <div class="field col-6">
                <span class="p-float-label">
                <InputMask mask="9999-99-99" v-model="permisoCirculacion" slotChar="yyyy-mm-dd" v-bind:class="{ 'p-invalid': permisoCirculacionError }" />
                <label for="permisoCirculacion">Permiso de circulacion</label>
                </span>
            </div>

      
            <div class="field col-6">
                <span class="p-float-label">
                <InputMask mask="9999-99-99" v-model="seguro" slotChar="yyyy-mm-dd" v-bind:class="{ 'p-invalid': seguroError }" />
                <label for="seguro">Seguro</label>
                </span>
            </div>

            <div class="field col-6">
                <span class="p-float-label">
                <InputMask mask="**-**-**" v-model="patente" v-bind:class="{ 'p-invalid': patenteError }" />
                <label for="patente">Patente</label>
                </span>
            </div>
        
        <div class="field col-12 sm:col-3">
            <ButtonComponent @click="crearVehiculoClicked" class="vehiculo" label="Crear" icon="pi pi-check" iconPos="right" />
        </div>
        <div class="field col-12 sm:col-3">
            <ButtonComponent icon="pi pi-replay" label="Volver" class="color justify-content-center" style="margin-left: .5em" @click="Volver()" />
        </div>
        
    </div>                    
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import { useConfirm } from "primevue/useconfirm";
import { useRouter, useRoute } from 'vue-router';



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
        const repartidorId = ref("")
        const marca = ref("");
        const modelo = ref("");
        const ano = ref(Number(0));
        const selectedRepartidor = ref();
        const repartidor = ref([]);
        const permisoCirculacion = ref([]);
        const seguro = ref([]);
        const patente = ref("");
        const tipoError = ref(false);
        const marcaError = ref(false);
        const modeloError = ref(false);
        const anoError = ref(false);
        const permisoCirculacionError = ref(false);
        const seguroError = ref(false);
        const patenteError = ref(false);




        const crearVehiculoClicked = () => {
            if (validar()) {
                confirm.require({
                    message: 'Usted registrara el vehiculo de patente:  "' + patente.value + '"?',
                    header: 'Confirmación',
                    icon: 'pi pi-info-circle',
                    acceptClass: 'p-button-warning',
                    accept: () => {
                        crearVehiculo();
                    },
                    reject: () => {
                        console.log("rejected");
                    }
                });
            }
            else {
                console.log("No valido");
            }
        };


        const validar = () => {
            repartidorId.value = false;
            tipoError.value = false;
            marcaError.value  = false;
            modeloError.value = false;
            anoError.value = false;
            permisoCirculacionError.value = false;
            seguroError.value = false;
            patenteError.value = false;

            if (marca.value.trim() === "") {
                marcaError.value = true;
                openModal("Falta la marca del repartidor a registrar!");
                return false;
            }
            if (modelo.value.trim() === "") {
                modeloError.value = true;
                openModal("Falta el Modelo del vehiculo a registrar!");
                return false;
            }

            if (ano.value === 0) {
                anoError.value = true;
                openModal("Falta el año del vehiculo a registrar!");
                return false;
            }
            if (permisoCirculacion.value === [] ) {
                permisoCirculacionError.value = true;
                openModal("Falta la fecha del Permiso de Circulacion del Vehiculo a registrar!");
                return false;
            }

            if (seguro.value === [] ) {
                seguroError.value = true;
                openModal("Falta la fecha del seguro del vehiculo a registrar!");
                return false;
            }

            if (patente.value.trim() === "") {
                patenteError.value = true;
                openModal("Falta la patente del vehiculo a registrar!");
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



        const crearVehiculo = () => {
            axios
                .post(api + "/vehiculo", {
                    RepartidorID: Number(route.params.id),
                    Marca: marca.value,
                    Modelo: modelo.value,
                    Ano: Number(ano.value),
                    PermisoCirculacion: permisoCirculacion.value,
                    Seguro: seguro.value,
                    Patente: patente.value,
            
                           })
                .then(function (response) {
                    if (response !== null && response.status === 200) {
                        openModal("Vehiculo registrado exitosamente!", redirect);
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
            router.push({name: "Vehiculo"});
        };
        const Volver = () => {
            router.push({name: "Listado de Repartidores"});
        }

        


        return { 
            Volver,
            marca,
            marcaError,
            modelo,
            modeloError,
            ano,
            anoError,
            permisoCirculacion,
            permisoCirculacionError,
            seguro,
            seguroError,
            patente,
            patenteError,
            selectedRepartidor,
            repartidor,
            crearVehiculoClicked,
            crearVehiculo,
            validar,
            displayModal,
            modalMessage,
            openModal,
            closeModal
         
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

::v-deep(.color) {
    background: var(--orange-400) !important;
    color: var(--surface-0) !important;
}
.color:hover {
    background: var(--orange-500) !important;
    color: var(--surface-0) !important;
}
</style>
