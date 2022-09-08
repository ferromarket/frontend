<template>
    <div class="card ">
     <div class="flex m-2 flex-wrap-reverse md:flex-wrap card-container orange-container" style="max-width: 100%">
         <div class="flex align-items-center justify-content-center bg-orange-400 font-bold text-white m-2 border-round" style="min-width: 40%; min-height: 30%">
         <CardPanel style="width: 25em">
             <template #header>
                 <div class="flex align-items-center justify-content-center">
                 <img src="../../assets/55268.png" style="height: 60%; width: 60%;" />
                 </div>
             </template>
             <template #title>
                 <div class="flex align-items-center justify-content-center">
                     Patente del Vehiculo:
                 </div>
                 <div class="flex align-items-center justify-content-center">
                 {{vehiculo.Patente}}
                 </div>
             </template>
             <template #subtitle>
                 <div class="flex align-items-center justify-content-center">
                 Marca: {{vehiculo.Marca}} 
                 </div>
                 <div class="flex align-items-center justify-content-center">
                 Modelo: {{vehiculo.Modelo}}
                 </div>
                 <div class="flex align-items-center justify-content-center">
                 Año: {{vehiculo.Ano}}
                 </div>
             </template>
             <template #content>
                 <p>
 
                 </p>
             </template>
             <template #footer="slotProps">
                 <div class="flex justify-content-center">
                 <ButtonComponent class="color justify-content-center"  icon="pi pi-pencil" label="Editar" @click="editarVehiculo(slotProps.data)" />
                 <ButtonComponent icon="pi pi-replay" label="Volver" class="color justify-content-center" style="margin-left: .5em" @click="Volver()" />
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
             getVehiculo();
         });
 
         const route = useRoute();
 
         // si el puerto es 8080, no es con proxy
         const url = new URL(window.location.href);
         const api = (url.port == "8080") ? "http://localhost:3001" : "/api";
 
         const vehiculo = ref({
             Marca: "",
             Modelo: "",
             Ano: "",
             PermisoCirculacion: "",
             Seguro: "",
             Patente: "",
             }
             
         );
         const vehiculos = ref([]);
         const getVehiculo = () => {
             axios
                 .get(api + "/vehiculo/" + route.params.id)
                 .then((response) => {
                     vehiculo.value = response.data;
                 })
                 .catch(err => {
                     if (err.response.status === 404) {
                         router.push("/vehiculos");
                     }
                     console.log(err);
                 });
         };

         const editarVehiculo = () => {
            router.push("/vehiculo/Editar/" + route.params.id);
        };


         const Volver = () => {
            router.push({name: "Listado de Vehiculos"});
        }
 
         return {
             vehiculo,
             getVehiculo,
             vehiculos,
             editarVehiculo,
             Volver
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
 