<template>
    <div class="w-full justify-content-center p-fluid grid">
        <div class="field col-12">
            <span class="p-float-label">
                <InputText id="nombre" type="text" v-model="nombre" />
                <label for="nombre">Nombre</label>
            </span>
        </div>
        <div class="field col-6">
            <span class="p-float-label">
                <DropDown id="abrir" v-model="selectedAbrir" :options="horarios" optionLabel="name" placeholder="&#8205;">
                    <template #value="slotProps">
                        <div v-if="slotProps.value">
                            <div>{{slotProps.value.name}}</div>
                        </div>
                        <span v-else>
                            {{slotProps.placeholder}}
                        </span>
                    </template>
                    <template #option="slotProps">
                        <div>
                            <div>{{slotProps.option.name}}</div>
                        </div>
                    </template>
                </DropDown>
                <label for="abrir">Horario de abrir</label>
            </span>
        </div>
        <div class="field col-6">
            <span class="p-float-label">
                <DropDown id="cerrar" v-model="selectedCerrar" :options="horarios" optionLabel="name" placeholder="&#8205;">
                    <template #value="slotProps">
                        <div v-if="slotProps.value">
                            <div>{{slotProps.value.name}}</div>
                        </div>
                        <span v-else>
                            {{slotProps.placeholder}}
                        </span>
                    </template>
                    <template #option="slotProps">
                        <div>
                            <div>{{slotProps.option.name}}</div>
                        </div>
                    </template>
                </DropDown>
                <label for="cerrar">Horario de cerrar</label>
            </span>
        </div>
        <div class="field col-12">
            <span class="p-float-label">
                <DropDown id="region" v-model="selectedRegion" :options="regiones" optionLabel="name" :filter="true" placeholder="&#8205;" :showClear="true">
                    <template #value="slotProps">
                        <div v-if="slotProps.value">
                            <div>{{slotProps.value.name}}</div>
                        </div>
                        <span v-else>
                            {{slotProps.placeholder}}
                        </span>
                    </template>
                    <template #option="slotProps">
                        <div>
                            <div>{{slotProps.option.name}}</div>
                        </div>
                    </template>
                </DropDown>
                <label for="region">Región</label>
            </span>
        </div>
        <div class="field col-12">
            <span class="p-float-label">
                <DropDown id="ciudad" v-model="selectedCiudad" :options="ciudades" optionLabel="name" :filter="true" placeholder="&#8205;" :showClear="true">
                    <template #value="slotProps">
                        <div v-if="slotProps.value">
                            <div>{{slotProps.value.name}}</div>
                        </div>
                        <span v-else>
                            {{slotProps.placeholder}}
                        </span>
                    </template>
                    <template #option="slotProps">
                        <div>
                            <div>{{slotProps.option.name}}</div>
                        </div>
                    </template>
                </DropDown>
                <label for="ciudad">Ciudad</label>
            </span>
        </div>
        <div class="field col-12">
            <span class="p-float-label">
                <DropDown id="comuna" v-model="selectedComuna" :options="comunas" optionLabel="name" :filter="true" placeholder="&#8205;" :showClear="true">
                    <template #value="slotProps">
                        <div v-if="slotProps.value">
                            <div>{{slotProps.value.name}}</div>
                        </div>
                        <span v-else>
                            {{slotProps.placeholder}}
                        </span>
                    </template>
                    <template #option="slotProps">
                        <div>
                            <div>{{slotProps.option.name}}</div>
                        </div>
                    </template>
                </DropDown>
                <label for="comuna">Comuna</label>
            </span>
        </div>
        <div class="field col-12">
            <span class="p-float-label">
                <InputText id="direccion" type="text" v-model="direccion" />
                <label for="direccion">Dirección</label>
            </span>
        </div>
        <div class="field col-12">
            <span class="p-float-label">
                <TextArea class="w-full" v-model="descripcion" :autoResize="true" rows="5" />
                <label for="direccion">Descripción</label>
            </span>
        </div>
        <!--<div class="field col-12">
            <HorarioCheckbox v-for="category in categories" :key="category.id" :ids="category.id" :name="category.name" :category="category"/>
        </div>-->
        <div class="field col-12 sm:col-2">
            <ButtonComponent @click="crearFerreteria" class="ferro" label="Crear" icon="pi pi-check" iconPos="right" />
        </div>
    </div>                    
</template>

<script>
import { ref, reactive } from 'vue';
import axios from 'axios';
//import HorarioCheckbox from './HorarioCheckbox.vue';

export default {
    setup() {
        const nombre = ref();
        const direccion = ref();
        const selectedRegion = ref();
        const selectedCiudad = ref();
        const selectedComuna = ref();
        const selectedAbrir = ref({"name": "00:00", "value": "test"});
        const selectedCerrar = ref({"name": "00:00", "value": "test"});
        const descripcion = ref();
        const fields = reactive({
            regiones: [],
            ciudades: [],
            comunas: [],
            descripcion: ""
        });
        const regiones = ref([
            { name: "Bío Bío", code: "AU" }
        ]);
        const ciudades = ref([
            { name: "Concepción", code: "AU" },
            { name: "Talcahuano", code: "CN" }
        ]);
        const comunas = ref([
            { name: "Concepción", code: "AU" },
            { name: "Hualpen", code: "BR" }
        ]);
        const horarios = ref([
            { name: "00:00", value: "test" },
            { name: "01:00", value: "test2" },
        ]);
        const crearFerreteria = () => {
            console.log(selectedAbrir);
            axios.post("/api/ferreteria", {
                Nombre: nombre.value,
                Descripcion: descripcion.value,
                Direccion: direccion.value,
                ComunaID: 1
            })
                .then(function (response) {
                console.log(response);
            })
                .catch(function (error) {
                console.log(error);
            });
        };
        /*axios.get("http://localhost:3050/api/ferreterias").
            then(response => {
                const data = response.data[response.data.length - 1]
                fields.descripcion = data.Nombre
                const item = {
                    id: data.ID,
                    name: data.Nombre
                }
                fields.regiones.push(item);
                fields.regiones.push(item);
            });*/

        const categories = ref([
            {name: 'Accounting', id: 1},
            {name: 'Marketing', id: 2},
            {name: 'Production', id: 3},
            {name: 'Research', id: 4}
        ]);
        return { nombre, direccion, descripcion, fields, selectedAbrir, selectedCerrar, selectedRegion, selectedCiudad, selectedComuna, regiones, ciudades, comunas, horarios, crearFerreteria, categories };
    },
    //components: { HorarioCheckbox }
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
