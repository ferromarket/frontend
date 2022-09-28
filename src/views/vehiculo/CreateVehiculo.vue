<template>
    <div class="sm:col-4 sm:col-offset-4">
        <CardPanel class="flex justify-content-center">
            <template #title>
                <div class="flex justify-content-center flex-wrap card-container">
                    <h2>Crear Vehiculo</h2>
                </div>
            </template>
            <template #content>
                <CreateVehiculo/>
            </template>
        </CardPanel>
    </div>
</template>

<script>
import CreateVehiculo from '../../components/vehiculo/CreateVehiculo.vue'

export default {
    name: 'App',
    components: {
        CreateVehiculo
    }
}
</script>

<style lang="scss" scoped>
p {
    line-height: 1.5;
    margin: 0;
}
</style>
