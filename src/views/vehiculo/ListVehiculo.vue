<template>
    <CardPanel class="flex justify-content-center sm:col-6 sm:col-offset-3">
        <template #content>
            <h2>Listado de Vehiculos Registrados</h2>
            <ListVehiculo/>
        </template>
    </CardPanel>
</template>

<script>
import ListVehiculo from '../../components/vehiculo/ListVehiculo.vue'

export default {
    name: 'App',
    components: {
        ListVehiculo
    }
}
</script>

<style lang="scss" scoped>
p {
    line-height: 1.5;
    margin: 0;
}
</style>
