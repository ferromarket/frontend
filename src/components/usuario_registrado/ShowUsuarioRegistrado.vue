<template>
    <CardPanel class="flex justify-content-center sm:col-4 sm:col-offset-4">
        <template #title>
            <div class="flex justify-content-center flex-wrap card-container">
                <h2>{{ usuario.Nombres }}</h2>
            </div>
        </template>
        <template #content>
            <div class="w-full justify-content-center p-fluid grid">
                <div class="field col-12">
                    <strong>Apeliido Paterno:</strong> {{ usuario.ApellidoPaterno }}
                </div>
            </div>
            <div class="w-full justify-content-center p-fluid grid">
                <div class="field col-12">
                    <strong>Apeliido Materno:</strong> {{ usuario.ApellidoMaterno }}
                </div>
            </div>
            <div class="w-full justify-content-center p-fluid grid">
                <div class="field col-12">
                    <strong>Telefono:</strong> {{ usuario.Telefono }}
                </div>
            </div>
            <div class="w-full justify-content-center p-fluid grid">
                <div class="field col-12">
                    <strong>Dirección:</strong> {{ usuario.Direccion }}
                </div>
            </div>
            <div class="w-full justify-content-center p-fluid grid">
                <div class="field col-12">
                    <strong>Fecha de Nacimiento:</strong> {{ usuario.FechaNacimiento }}
                </div>
            </div>
        </template>
        <template #footer="slotProps">
            <div class="flex justify-content-center">
                <ButtonComponent class="color justify-content-center"  icon="pi pi-pencil" label="Editar" @click="modifyUsuario(slotProps.data)" />
                <ButtonComponent icon="pi pi-replay" label="Volver" class="color justify-content-center" style="margin-left: .5em" @click="volverUsuario()" />
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
            getUsuario();
        });

        const route = useRoute();

        // si el puerto es 8080, no es con proxy
        const url = new URL(window.location.href);
        const api = (url.port == "8080") ? "http://localhost:3001" : "/api";

        const usuario = ref({
            ID: "",
            Nombres: "",
            Direccion: "",
            RUT: "",
            Contrasena:"",
            Email: "",
            ApellidoPaterno: "",
            ApellidoMaterno: "",
            Telefono: "",
            FechaNacimiento: ""
        });

        const getUsuario = () => {
            axios
                .get(api + "/usuario/" + route.params.id)
                .then((response) => {
                    usuario.value = response.data;
                })
                .catch(err => {
                    if (err.response.status === 404) {
                        router.push("/usuarios");
                    }
                    console.log(err);
                });
        };
        const volverUsuario = () => {
            router.push("/usuario_registrado/");
        }
        const modifyUsuario = () => {
            router.push("/usuario_registrado/modificar/" + route.params.id);
        }; 
        return {
            usuario,
            getUsuario,
            volverUsuario,
            modifyUsuario
        };
    }
};
</script>
