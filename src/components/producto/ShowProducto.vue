<template>
<div class="card ">
    <div class="flex m-2 flex-wrap-reverse md:flex-wrap card-container orange-container justify-content-center" style="max-width: 100%">
        <div class="flex align-items-center justify-content-center bg-orange-400 font-bold text-white m-2 border-round" style="min-width: 40%; min-height: 30%">
        <CardPanel style="width: 25em">
            <template #header>
                <div class="flex align-items-center justify-content-center">
                <img src="../../assets/AvatarProducto.png" style="height: 60%; width: 60%;" />
                </div>
            </template>
            <template #title>
                <div class="flex align-items-center justify-content-center">
                    Ficha del producto
                </div>
            </template>
            <template #subtitle>
                <div class="flex align-items-center justify-content-center">
                <strong>Nombre:</strong>     {{producto.Nombre}}
                </div>
                <div class="flex align-items-center justify-content-center">
                </div>
                <div class="flex align-items-center justify-content-center">
                <strong>Marca:</strong>     {{producto.Valor1}}
                </div>
            </template>
            <template #content>
                <p>

                </p>
            </template>
            <template #footer="slotProps">
                <div class="flex justify-content-center">
                <ButtonComponent class="color justify-content-center"  icon="pi pi-pencil" label="Editar" @click="modifyProducto(slotProps.data)" />
                <ButtonComponent icon="pi pi-replay" label="Volver" class="color justify-content-center" style="margin-left: .5em" @click="volverProducto()" />
                </div>

            </template>
        </CardPanel>
        </div>
        </div>

</div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import router from '@/main';

export default {
    setup() {
        onMounted(() => {
            getProducto();
        });

        const route = useRoute();

        // si el puerto es 8080, no es con proxy
        const url = new URL(window.location.href);
        const api = (url.port == "8080") ? "http://localhost:3001" : "/api";

        const producto = ref({
            Nombre: "",
            Categoria: {
                Nombre: "",
            },
            Valor1: "",
            Valor2: "",
        });

        const productos = ref([]);
        
        const getProducto = () => {
            axios
                .get(api + "/producto/" + route.params.id)
                .then((response) => {
                    producto.value = response.data;
                })
                .catch(err => {
                    if (err.response.status === 404) {
                        router.push("/producto");
                    }
                    console.log(err);
                });
        };
        
        const volverProducto = () => {
            router.push("/producto/");
        }
        const modifyProducto = () => {
            router.push("/producto/modificar/" +  route.params.id);
        }; 

        return {
            producto,
            productos,
            getProducto,
            modifyProducto,
            volverProducto,
        };
    }
};
</script>
