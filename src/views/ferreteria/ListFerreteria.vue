<template>
    <CardPanel class="flex justify-content-center sm:col-6 sm:col-offset-3">
        <template #content>
            <ListFerreteria/>
        </template>
    </CardPanel>
</template>

<script>
import ListFerreteria from '../../components/ferreteria/ListFerreteria.vue'

export default {
    name: 'App',
    components: {
        ListFerreteria
    }
}
</script>

<style lang="scss" scoped>
p {
    line-height: 1.5;
    margin: 0;
}
</style>
