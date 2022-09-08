<template>
    <CardPanel class="flex justify-content-center sm:col-4 sm:col-offset-4">
        <template #title>
            <div class="flex justify-content-center flex-wrap card-container">
                <h2>{{ ferreteria.Nombre }}</h2>
            </div>
        </template>
        <template #content>
            <div class="w-full justify-content-center p-fluid grid">
                <div class="field col-12">
                    {{ ferreteria.Descripcion }}
                </div>
                <div class="field col-12">
                    <strong>Dirección:</strong> {{ ferreteria.Direccion }}, {{ ferreteria.Comuna.Nombre }}, {{ ferreteria.Comuna.Ciudad.Nombre }}, {{ ferreteria.Comuna.Ciudad.Region.Nombre }}
                </div>
                <div class="col-12">
                    <strong>Horario:</strong>
                </div>
                <div class="col-12">
                    <table>
                        <tr v-for="horario in ferreteria.Horarios" :key="horario.ID">
                            <td>
                                &emsp; <strong>{{ horario.Dia.Nombre }}</strong>:
                            </td>
                            <td>
                                &ensp; {{ horario.Abrir.Hora }} a {{horario.Cerrar.Hora}}
                            </td>
                        </tr>
                    </table>
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
            getFerreteria();
        });

        const route = useRoute();

        // si el puerto es 8080, no es con proxy
        const url = new URL(window.location.href);
        const api = (url.port == "8080") ? "http://localhost:3001" : "/api";

        const ferreteria = ref({
            Nombre: "",
            Descripcion: "",

        });

        const getFerreteria = () => {
            axios
                .get(api + "/ferreteria/" + route.params.id)
                .then((response) => {
                    ferreteria.value = response.data;
                })
                .catch(err => {
                    if (err.response.status === 404) {
                        router.push("/ferreterias");
                    }
                    console.log(err);
                });
        };

        return {
            ferreteria,
            getFerreteria
        };
    }
};
</script>
