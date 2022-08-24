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
                <DropDown id="categoria" v-model="selectedCategoria" :options="categorias" optionLabel="Nombre" :filter="true" placeholder="&#8205;" v-bind:class="{ 'p-invalid': selectedCategoriaError }">
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
                <label for="categoria">Categoría</label>
            </span>
        </div>   
        <!-- Ingreso de data -->
        <div class="field col-6">
            <span class="p-float-label">
                <InputText id="data" type="text" v-model="data" v-bind:class="{ 'p-invalid': dataError }" />
                <label for="data">Nombre espeficación</label>
            </span>
        </div>   
        <div class="field col-6">
            <span class="p-float-label">
                <InputText id="valor2" type="text" v-model="valor2" v-bind:class="{ 'p-invalid': valor2Error }" />
                <label for="valor2">Data</label>
            </span>
        </div>    
        <div class="field col-12 sm:col-2">
            <ButtonComponent @click="crearProductoClicked" class="ferro" label="Crear" icon="pi pi-check" iconPos="right" />
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
            getCategorias();

        });

        // si el puerto es 8080, no es con proxy
        const url = new URL(window.location.href);
        const api = (url.port == "8080") ? "http://localhost:3001" : "/api";

        const confirm = useConfirm();
        const displayModal = ref(false);
        const modalMessage = ref("");

        const nombre = ref("");
        const selectedCategoria = ref();
        const categorias = ref([]);

        const nombreError = ref(false);
        const selectedCategoriaError = ref(false);

        const crearProductoClicked = () => {
            if (validar()) {
                confirm.require({
                    message: 'Crear producto "' + nombre.value + '"?',
                    header: 'Confirmación',
                    icon: 'pi pi-info-circle',
                    acceptClass: 'p-button-warning',
                    accept: () => {
                        crearProducto();
                    },
                    reject: () => {
                        console.log("rejected");
                    }
                });
            }
        };

        const validar = () => {
            nombreError.value = false;
            selectedCategoriaError.value = false;
            if (nombre.value.trim() === "") {
                nombreError.value = true;
                openModal("Falta nombre de producto!");
                return false;
            }
            if (selectedCategoria.value === null) {
                selectedCategoriaError.value = true;
                openModal("Falta seleccionar una categoria!");
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

        const crearProducto = () => {
            axios
                .post(api + "/producto", {
                    Nombre: nombre.value,
                    CategoriaID: selectedCategoria.value.ID
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

        const getCategorias = () => {
            axios
                .get(api + "/categorias")
                .then((response) => {
                    response.data.forEach(element => {
                        categorias.value.push(element);
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        };

        return { nombre,
            nombreError,
            selectedCategoria,
            selectedCategoriaError,
            crearProductoClicked,
            getCategorias,
            categorias,
            crearProducto,
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
