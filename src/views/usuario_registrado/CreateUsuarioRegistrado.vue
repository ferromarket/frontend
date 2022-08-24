<template>
    <CardPanel class="flex justify-content-center sm:col-4 sm:col-offset-4">
        <template #title>
            <div class="flex justify-content-center flex-wrap card-container">
                <h2>Registro de Usuario</h2>
            </div>
        </template>
        <template #content>
            <CreateUsuarioRegistrado/>
        </template>
    </CardPanel>
</template>

<script>
import CreateUsuarioRegistrado from '../../components/usuario_registrado/CreateUsuarioRegistrado.vue'
import auth from '../../utils/auth.js';

export default {
    setup() {
        auth.checkToken();
    },
    name: 'App',
    components: {
        CreateUsuarioRegistrado
    }
}
</script>

<style lang="scss" scoped>
p {
    line-height: 1.5;
    margin: 0;
}
</style>
