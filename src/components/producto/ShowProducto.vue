<template>
    <CardPanel class="flex justify-content-center sm:col-4 sm:col-offset-4">
        <template #title>
            <div class="flex justify-content-center flex-wrap card-container">
                <h2>{{ producto.Nombre }}</h2>
            </div>
        </template>
        <template #content>
            <div class="w-full justify-content-center p-fluid grid">
                <div class="field col-12">
                    {{ producto.Descripcion }}
                </div>
                <div class="field col-12">
                    <strong>Categoría</strong> {{ categoria.Nombre }},
                </div>
            </div>
        </template>
    </CardPanel>
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
            Descripcion: "",
            Direccion: "",
            Comuna: {
                Nombre: "",
                Ciudad: {
                    Nombre: "",
                    Region: {
                        Nombre: ""
                    }
                }
            },
        });

        const getProducto = () => {
            axios
                .get(api + "/producto/" + route.params.id)
                .then((response) => {
                    producto.value = response.data;
                })
                .catch(err => {
                    if (err.response.status === 404) {
                        router.push("/productos");
                    }
                    console.log(err);
                });
        };

        return {
            producto,
            getProducto
        };
    }
};
</script>
