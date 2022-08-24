<template>
    <div class="sm:col-6 sm:col-offset-3">
        <CardPanel class="flex justify-content-center">
            <template #content>
                <ListProducto/>
            </template>
        </CardPanel>
    </div>
</template>

<script>
import ListProducto from '../../components/producto/ListProducto.vue'

export default {
    name: 'App',
    components: {
        ListProducto
    }
}
</script>

<style lang="scss" scoped>
p {
    line-height: 1.5;
    margin: 0;
}
</style>