<template>
    <div class="sm:col-6 sm:col-offset-3">
        <CardPanel class="flex justify-content-center">
            <template #content>
                <ListFerreteria/>
            </template>
        </CardPanel>
    </div>
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
