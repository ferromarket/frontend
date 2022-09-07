<template>
    <ConfirmDialog/>
    <DialogBox header="Error" v-model:visible="displayModal" :breakpoints="{'960px': '75vw', '640px': '90vw'}" :style="{width: '25vw'}" :modal="true">
        <p class="m-0">{{modalMessage}}</p>
        <template #footer>
            <ButtonComponent label="Cerrar" icon="pi pi-check" @click="closeModal" class="p-button-danger" autofocus />
        </template>
    </DialogBox>
    <div class="w-full justify-content-center p-fluid grid"/>
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
            <div class="field col-6">
            <span class="p-float-label">
                <InputText id="valor1" type="text" v-model="valor1" v-bind:class="{ 'p-invalid': valor1Error }" />
                <label for="valor1">Valor </label>
            </span>
        </div>   
        <div class="field col-6">
            <span class="p-float-label">
                <InputText id="valor2" type="text" v-model="valor2" v-bind:class="{ 'p-invalid': valor2Error }" />
                <label for="valor2">Data</label>
            </span>
        </div>  
        <div class="field col-12 sm:col-3">
            <ButtonComponent @click="modificarProductoClicked" class="ferro" label="Modificar producto" icon="pi pi-check" iconPos="right" />
        </div>
    </div>                    
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { useConfirm } from "primevue/useconfirm";

export default {
    setup() {
        onMounted(() => {
            getCategorias();
        });

        const route = useRoute();

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


        const getProducto = () => {
            axios
                .get(api + "/productos/" + route.params.id)
                .then((response) => {
                    response.data.forEach(element => {
                        let producto = {
                            ID: element.ID,
                            Nombre: element.Nombre,
                            Categoria: element.Categoria.Nombre,
                            Valor1: element.Valor1,
                            Valor2: element.Valor2,
                        };
                        producto.value.push(producto);
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        };

        const modificarProductoClicked = () => {
            if (validar()) {
                confirm.require({
                    message: 'Modificar producto "' + nombre.value + '"?',
                    header: 'Confirmación',
                    icon: 'pi pi-info-circle',
                    acceptClass: 'p-button-warning',
                    accept: () => {
                        modificarProducto();
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
                openModal("Falta nombre del producto!");
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

        const modificarProducto = () => {
            let producto;
            producto.value.Categorias.forEach(element => {
                producto.push({
                    ID: element.ID,
                    ProductoID: element.ProductoID,
                    CategoriaID: element.CategoriaID,
                });
            });
            axios
                .patch(api + "/producto/" + route.params.id, {
                    Nombre: nombre.value,
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
            categorias.value = [];
            selectedCategoria.value = null;
            axios
                .get(api + "/categorias")
                .then((response) => {
                    response.data.forEach(element => {
                        categorias.value.push(element);
                    });
                    getProducto();
                })
                .catch(err => {
                    console.log(err);
                });
        };

        const categoriaChanged = () => {
            getCategorias();
            console.log(selectedCategoria.value);
        }


        return { 
            categorias,
            getCategorias,
            getProducto,
            categoriaChanged,
            modificarProductoClicked,
            modificarProducto,
            selectedCategoria,
            selectedCategoriaError,
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
