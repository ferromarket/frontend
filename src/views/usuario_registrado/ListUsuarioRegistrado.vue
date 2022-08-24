<template>
    <CardPanel class="flex justify-content-center sm:col-6 sm:col-offset-3">
        <template #content>
            <ListUsuarioRegistrado/>
        </template>
    </CardPanel>
</template>

<script>
import ListUsuarioRegistrado from '../../components/usuario_registrado/ListUsuarioRegistrado.vue'

export default {
    name: 'App',
    components: {
        ListUsuarioRegistrado
    }
}
</script>

<style lang="scss" scoped>
p {
    line-height: 1.5;
    margin: 0;
}
</style>
