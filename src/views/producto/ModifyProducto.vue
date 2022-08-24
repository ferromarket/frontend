<template>
    <div class="sm:col-4 sm:col-offset-4">
        <CardPanel class="flex justify-content-center">
            <template #title>
                <div class="flex justify-content-center flex-wrap card-container">
                    <h2>Modificar Producto</h2>
                </div>
            </template>
            <template #content>
                <ModifyProducto/>
            </template>
        </CardPanel>
    </div>
</template>

<script>
import ModifyProducto from '../../components/producto/ModifyProducto.vue'

export default {
    name: 'App',
    components: {
        ModifyProducto
    }
}
</script>

<style lang="scss" scoped>
p {
    line-height: 1.5;
    margin: 0;
}
</style>
