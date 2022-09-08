<template>
    <div class="sm:col-6 sm:col-offset-3">
        <CardPanel class="flex justify-content-center">
            <template #content>
                <ListCarro/>
            </template>
        </CardPanel>
    </div>
</template>

<script>
import ListCarro from '../../components/carro/ListCarro.vue'

export default {
    name: 'App',
    components: {
        ListCarro
    }
}
</script>

<style lang="scss" scoped>
p {
    line-height: 1.5;
    margin: 0;
}
</style>