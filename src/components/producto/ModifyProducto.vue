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
                <DropDown id="categoria" @change="categoriaChanged" v-model="selectedCategoria" :options="categorias" optionLabel="Nombre" :filter="true" placeholder="&#8205;" v-bind:class="{ 'p-invalid': selectedCategoriaError }">
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
                <label for="valor1">Marca </label>
            </span>
        </div>   
        <div class="field col-6">
            <span class="p-float-label">
                <InputText id="valor2" type="text" v-model="valor2" v-bind:class="{ 'p-invalid': valor2Error }" />
                <label for="valor2">Detalle</label>
            </span>
        </div>  
        <div class="field col-12 sm:col-3">
            <ButtonComponent @click="modificarProductoClicked" class="ferro" label="Modificar producto" icon="pi pi-check" iconPos="right" />
        </div>
    </div>                    
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';
import { useConfirm } from "primevue/useconfirm";

export default {
    setup() {
        onMounted(() => {
            getCategorias();
        });

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

        const producto = ref();

        const nombre = ref("");
        const valor1 = ref("");
        const valor2 = ref("");
        const selectedCategoria = ref();
        const categorias = ref([]);

        const nombreError = ref(false);
        const selectedCategoriaError = ref(false);
        const valor1Error = ref(false);
        const valor2Error = ref(false);

        const error = ref(false);


        const getProducto = () => {
            axios
                .get(api + "/producto/" + route.params.id)
                .then((response) => {
                    producto.value = response.data;
                    nombre.value = response.data.Nombre;
                    valor1.value = response.data.Valor1;
                    valor2.value = response.data.Valor2;
                    categorias.value.forEach(element => {
                        if (element.ID == response.data.CategoriaID) {
                            selectedCategoria.value = element;
                        }
                    });
                })
                .catch(err => {
                    console.log(err);
                })
                .catch(err => {
                    if (err.response.status === 404) {
                        router.push("/productos");
                    }
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


        const modificarProducto = () => {
            let categorias = [];
            producto.value.Categorias.forEach(element => {
                categorias.push({
                    ID: element.ID,
                    CategoriaID: element.CategoriaID,
                });
            });
            axios
                .patch(api + "/producto/" + route.params.id, {
                    Nombre: nombre.value,
                    Categorias: categorias,
                    Valor1: valor1.value,
                    Valor2: valor2.value
                })
                .then(function (response) {
                    if (response !== null && response.status == 200) {
                        openModal("Producto modificado exitosamente!", redirect);
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
            router.push({name: "Mostrar producto"});
        };


        const getCategorias = (id) => {
            if (id === null) {
                id = selectedCategoria.value.ID
            }
            categorias.value = [];
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
            nombre,
            nombreError,
            valor1,
            valor1Error,
            valor2,
            valor2Error,
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
            dialogTitle,
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
