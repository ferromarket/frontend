<template>
    <CardPanel class="flex justify-content-center sm:col-6 sm:col-offset-3">
        <template #content>
            <h2>Listado de Repartidores Registrados</h2>
            <ListRepartidor/>
        </template>
    </CardPanel>
</template>

<script>
import ListRepartidor from '../../components/repartidor/ListRepartidor.vue'

export default {
    name: 'App',
    components: {
        ListRepartidor
    }
}
</script>

<style lang="scss" scoped>
p {
    line-height: 1.5;
    margin: 0;
}
</style>
