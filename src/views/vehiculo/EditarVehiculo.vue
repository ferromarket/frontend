<template>
    <div class="sm:col-4 sm:col-offset-4">
        <CardPanel class="flex justify-content-center">
            <template #title>
                <div class="flex justify-content-center flex-wrap card-container">
                    <h2>Editar Vehiculo</h2>
                </div>
            </template>
            <template #content>
                <EditarVehiculo/>
            </template>
        </CardPanel>
    </div>
</template>

<script>
import EditarVehiculo from '../../components/vehiculo/EditarVehiculo.vue'

export default {
    name: 'App',
    components: {
        EditarVehiculo
    }
}
</script>

<style lang="scss" scoped>
p {
    line-height: 1.5;
    margin: 0;
}
</style>
