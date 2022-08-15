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
                <InputText id="nombre" type="text" v-model="nombre" v-bind:class="{ 'p-invalid': nombreError }" />
                <label for="nombre">Nombre</label>
            </span>
        </div>
        <div class="field col-12">
            <span class="p-float-label">
                <DropDown id="region" @change="regionChanged" v-model="selectedRegion" :options="regiones" optionLabel="Nombre" :filter="true" placeholder="&#8205;" v-bind:class="{ 'p-invalid': selectedRegionError }">
                    <template #value="slotProps">
                        <div v-if="slotProps.value">
                            <div>{{slotProps.value.Nombre}}</div>
                        </div>
                        <span v-else>
                            {{slotProps.placeholder}}
                        </span>
                    </template>
                    <template #option="slotProps">
                        <div>
                            <div>{{slotProps.option.Nombre}}</div>
                        </div>
                    </template>
                </DropDown>
                <label for="region">Región</label>
            </span>
        </div>
        <div class="field col-12">
            <span class="p-float-label">
                <DropDown id="ciudad" @change="ciudadChanged" v-model="selectedCiudad" :options="ciudades" optionLabel="Nombre" :filter="true" placeholder="&#8205;" v-bind:class="{ 'p-invalid': selectedCiudadError }">
                    <template #value="slotProps">
                        <div v-if="slotProps.value">
                            <div>{{slotProps.value.Nombre}}</div>
                        </div>
                        <span v-else>
                            {{slotProps.placeholder}}
                        </span>
                    </template>
                    <template #option="slotProps">
                        <div>
                            <div>{{slotProps.option.Nombre}}</div>
                        </div>
                    </template>
                </DropDown>
                <label for="ciudad">Ciudad</label>
            </span>
        </div>
        <div class="field col-12">
            <span class="p-float-label">
                <DropDown id="comuna" v-model="selectedComuna" :options="comunas" optionLabel="Nombre" :filter="true" placeholder="&#8205;" v-bind:class="{ 'p-invalid': selectedComunaError }">
                    <template #value="slotProps">
                        <div v-if="slotProps.value">
                            <div>{{slotProps.value.Nombre}}</div>
                        </div>
                        <span v-else>
                            {{slotProps.placeholder}}
                        </span>
                    </template>
                    <template #option="slotProps">
                        <div>
                            <div>{{slotProps.option.Nombre}}</div>
                        </div>
                    </template>
                </DropDown>
                <label for="comuna">Comuna</label>
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
                <TextArea class="w-full" v-model="descripcion" :autoResize="true" rows="5" v-bind:class="{ 'p-invalid': descripcionError }" />
                <label for="descripcion">Descripción</label>
            </span>
        </div>
        <!--<div class="col-12">
            <span class="p-float-label">
                <h2>Lunes</h2>
            </span>
        </div>-->
        <div class="field col-6">
            <span class="p-float-label">
                <DropDown id="abrir" v-model="selectedAbrir" :options="horas" optionLabel="Hora" placeholder="&#8205;" v-bind:class="{ 'p-invalid': horasError }">
                    <template #value="slotProps">
                        <div v-if="slotProps.value">
                            <div>{{slotProps.value.Hora}}</div>
                        </div>
                        <span v-else>
                            {{slotProps.placeholder}}
                        </span>
                    </template>
                    <template #option="slotProps">
                        <div>
                            <div>{{slotProps.option.Hora}}</div>
                        </div>
                    </template>
                </DropDown>
                <label for="abrir">Horario de abrir</label>
            </span>
        </div>
        <div class="field col-6">
            <span class="p-float-label">
                <DropDown id="cerrar" v-model="selectedCerrar" :options="horas" optionLabel="Hora" placeholder="&#8205;" v-bind:class="{ 'p-invalid': horasError }">
                    <template #value="slotProps">
                        <div v-if="slotProps.value">
                            <div>{{slotProps.value.Hora}}</div>
                        </div>
                        <span v-else>
                            {{slotProps.placeholder}}
                        </span>
                    </template>
                    <template #option="slotProps">
                        <div>
                            <div>{{slotProps.option.Hora}}</div>
                        </div>
                    </template>
                </DropDown>
                <label for="cerrar">Horario de cerrar</label>
            </span>
        </div>
        <div class="field col-12 sm:col-2">
            <ButtonComponent @click="crearFerreteriaClicked" class="ferro" label="Crear" icon="pi pi-check" iconPos="right" />
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
            getRegiones();
            getHoras();
        })

        // si el puerto es 8080, no es con proxy
        const url = new URL(window.location.href);
        const api = (url.port == "8080") ? "http://localhost:3001" : "/api";

        const confirm = useConfirm();
        const displayModal = ref(false);
        const modalMessage = ref("");

        const nombre = ref("");
        const direccion = ref("");
        const selectedRegion = ref();
        const selectedCiudad = ref();
        const selectedComuna = ref();
        const selectedAbrir = ref();
        const selectedCerrar = ref();
        const descripcion = ref("");
        const regiones = ref([]);
        const ciudades = ref([]);
        const comunas = ref([]);
        const horas = ref([]);

        const nombreError = ref(false);
        const selectedRegionError = ref(false);
        const selectedCiudadError = ref(false);
        const selectedComunaError = ref(false);
        const direccionError = ref(false);
        const descripcionError = ref(false);
        const horasError = ref(false);

        const crearFerreteriaClicked = () => {
            if (validar()) {
                confirm.require({
                    message: 'Crear ferretería "' + nombre.value + '"?',
                    header: 'Confirmación',
                    icon: 'pi pi-info-circle',
                    accept: () => {
                        crearFerreteria();
                    },
                    reject: () => {
                        console.log("rejected");
                    }
                });
            }
        };

        const validar = () => {
            nombreError.value = false;
            selectedRegionError.value = false;
            selectedCiudadError.value = false;
            selectedComunaError.value = false;
            direccionError.value = false;
            descripcionError.value = false;
            horasError.value = false;
            if (nombre.value.trim() === "") {
                nombreError.value = true;
                openModal("Falta nombre de la ferretería!");
                return false;
            }
            if (selectedRegion.value === null) {
                selectedRegionError.value = true;
                openModal("Falta seleccionar una región!");
                return false;
            }
            if (selectedCiudad.value === null) {
                selectedCiudadError.value = true;
                openModal("Falta seleccionar una ciudad!");
                return false;
            }
            if (selectedComuna.value === null) {
                selectedComunaError.value = true;
                openModal("Falta seleccionar una comuna!");
                return false;
            }
            if (direccion.value.trim() === "") {
                direccionError.value = true;
                openModal("Falta dirección de la ferretería!");
                return false;
            }
            if (descripcion.value.trim() === "") {
                descripcionError.value = true;
                openModal("Falta descripción de la ferretería!");
                return false;
            }
            if (selectedAbrir.value.ID >= selectedCerrar.value.ID) {
                horasError.value = true;
                openModal("La hora de abrir tiene que ser antes de cerrar!");
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

        const crearFerreteria = () => {
            axios
                .post(api + "/ferreteria", {
                    Nombre: nombre.value,
                    Descripcion: descripcion.value,
                    Direccion: direccion.value,
                    ComunaID: selectedComuna.value.ID,
                    Horarios: [
                        {
                            DiaId: 1,
                            AbrirID: selectedAbrir.value.ID,
                            CerrarID: selectedCerrar.value.ID
                        },
                        {
                            DiaId: 2,
                            AbrirID: selectedAbrir.value.ID,
                            CerrarID: selectedCerrar.value.ID
                        },
                        {
                            DiaId: 3,
                            AbrirID: selectedAbrir.value.ID,
                            CerrarID: selectedCerrar.value.ID
                        },
                        {
                            DiaId: 4,
                            AbrirID: selectedAbrir.value.ID,
                            CerrarID: selectedCerrar.value.ID
                        },
                        {
                            DiaId: 5,
                            AbrirID: selectedAbrir.value.ID,
                            CerrarID: selectedCerrar.value.ID
                        },
                        {
                            DiaId: 6,
                            AbrirID: selectedAbrir.value.ID,
                            CerrarID: selectedCerrar.value.ID
                        },
                        {
                            DiaId: 7,
                            AbrirID: selectedAbrir.value.ID,
                            CerrarID: selectedCerrar.value.ID
                        },
                    ]
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

        const getHoras = () => {
            axios
                .get(api + "/horas")
                .then((response) => {
                    response.data.forEach(element => {
                        horas.value.push(element);
                    });
                    selectedAbrir.value = response.data[0];
                    selectedCerrar.value = response.data[0];
                })
                .catch(err => {
                    console.log(err);
                });
        };

        const getRegiones = () => {
            axios
                .get(api + "/regiones")
                .then((response) => {
                    response.data.forEach(element => {
                        regiones.value.push(element);
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        };

        const regionChanged = () => {
            getCiudades();
        }

        const getCiudades = () => {
            selectedCiudad.value = null;
            selectedComuna.value = null;
            ciudades.value = [];
            comunas.value = [];
            axios
                .get(api + "/ciudades/" + selectedRegion.value.ID)
                .then((response) => {
                    response.data.forEach(element => {
                        ciudades.value.push(element);
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        };

        const ciudadChanged = () => {
            getComunas();
        }

        const getComunas = () => {
            selectedComuna.value = null;
            comunas.value = [];
            axios
                .get(api + "/comunas/" + selectedCiudad.value.ID)
                .then((response) => {
                    response.data.forEach(element => {
                        comunas.value.push(element);
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        };

        return { nombre,
            nombreError,
            direccion,
            direccionError,
            descripcion,
            descripcionError,
            selectedAbrir,
            selectedCerrar,
            selectedRegion,
            selectedRegionError,
            selectedCiudad,
            selectedCiudadError,
            selectedComuna,
            selectedComunaError,
            regionChanged,
            ciudadChanged,
            crearFerreteriaClicked,
            getRegiones,
            getCiudades,
            getComunas,
            regiones,
            ciudades,
            comunas,
            horas,
            horasError,
            crearFerreteria,
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
::v-deep(.ferro) {
    background: var(--orange-400) !important;
    color: var(--surface-0) !important;
}
.ferro:hover {
    background: var(--orange-500) !important;
    color: var(--surface-0) !important;
}
</style>
