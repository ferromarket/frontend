<template>
   <div class="card ">
    <div class="flex m-2 flex-wrap-reverse md:flex-wrap card-container orange-container" style="max-width: 100%">
        <div class="flex align-items-center justify-content-center bg-orange-400 font-bold text-white m-2 border-round" style="min-width: 40%; min-height: 30%">
        <CardPanel style="width: 25em">
            <template #header>
                <div class="flex align-items-center justify-content-center">
                <img src="../../assets/AvatarRepartidor.png" style="height: 60%; width: 60%;" />
                </div>
            </template>
            <template #title>
                <div class="flex align-items-center justify-content-center">
                    Bienvenido:
                </div>
                <div class="flex align-items-center justify-content-center">
                {{repartidor.Nombres}}
                </div>
            </template>
            <template #subtitle>
                <div class="flex align-items-center justify-content-center">
                RUT: {{repartidor.RUT}} 
                </div>
                <div class="flex align-items-center justify-content-center">
                 Tipo de Licencia: {{repartidor.TipoLicencia}} {{vehiculo.Repartidor.Nombres}}
                </div>
            </template>
            <template #content>
                <p>

                </p>
            </template>
            <template #footer="slotProps">
                <div class="flex justify-content-center">
                <ButtonComponent class="color justify-content-center"  icon="pi pi-pencil" label="Editar" @click="editarRepartidor(slotProps.data)" />
                <ButtonComponent class="color justify-content-center"  icon="pi pi-pencil" label="Añadir Vehiculo" style="margin-left: .5em" @click="crearVehiculo(slotProps.data)" />
                <ButtonComponent icon="pi pi-replay" label="Volver" class="color justify-content-center" style="margin-left: .5em" @click="VolverRepartidor()" />
                </div>
            </template>
        </CardPanel>
            <div>
            </div>
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
            getRepartidor();
        });

        const route = useRoute();

        // si el puerto es 8080, no es con proxy
        const url = new URL(window.location.href);
        const api = (url.port == "8080") ? "http://localhost:3001" : "/api";

        const repartidor = ref({
            RUT: "",
            Email: "",
            Nombres: "",
            ApellidoPaterno: "",
            ApellidoMaterno: "",
            ApellidoM: "",
            TipoLicencia: "",

            }
            
        );
        const repartidores = ref([]);
        const getRepartidor = () => {
            axios
                .get(api + "/repartidor/" + route.params.id)
                .then((response) => {
                    repartidor.value = response.data;
                })
                .catch(err => {
                    if (err.response.status === 404) {
                        router.push("/repartidores");
                    }
                    console.log(err);
                });
        };

        const VolverRepartidor = () => {
            router.push({name: "Listado de Repartidores"});
        }

        
        const editarRepartidor = () => {
            router.push("/repartidor/Editar/" + route.params.id);
        };

        const crearVehiculo = () => {
            router.push("/vehiculo/crear/" + route.params.id);
        };

        const vehiculo = ref({
            Repartidor: {
                Nombres: "",
            },
            Marca: "",
            Modelo: "",
            Ano: "",
            PermisoCirculacion: "",
            Patente: "",
            Seguro: "",
            TipoLicencia: "",
            }
        );




            


        return {
            crearVehiculo,
            repartidor,
            getRepartidor,
            repartidores,
            editarRepartidor,
            VolverRepartidor,
            vehiculo,
        };
    }
};
</script>
<style lang="scss" scoped>
::v-deep(.color) {
    background: var(--orange-400) !important;
    color: var(--surface-0) !important;
}
.color:hover {
    background: var(--orange-500) !important;
    color: var(--surface-0) !important;
}

</style>
