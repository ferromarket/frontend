<template>
    <div class="sm:col-4 sm:col-offset-4">
        <CardPanel class="flex justify-content-center">
            <template #title>
                <div class="flex justify-content-center flex-wrap card-container">
                    <h2>Editar Repartidor</h2>
                </div>
            </template>
            <template #content>
                <CreateRepartidor/>
            </template>
        </CardPanel>
    </div>
</template>

<script>
//import EditarRepartidor from '../../components/repartidor/EditarRepartidor.vue'

export default {
    name: 'App',
    components: {
       // EditarRepartidor
    }
}
</script>

<style lang="scss" scoped>
p {
    line-height: 1.5;
    margin: 0;
}
</style>
