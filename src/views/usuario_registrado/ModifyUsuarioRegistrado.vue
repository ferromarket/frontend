<template>
    <CardPanel class="flex justify-content-center sm:col-4 sm:col-offset-4">
        <template #title>
            <div class="flex justify-content-center flex-wrap card-container">
                <h2>Modificar Usuario</h2>
            </div>
        </template>
        <template #content>
            <ModifyUsuarioRegistrado/>
        </template>
    </CardPanel>
</template>

<script>
import ModifyUsuarioRegistrado from '../../components/usuario_registrado/ModifyUsuarioRegistrado.vue'
//import auth from '../../utils/auth.js';

export default {
//    setup() {
//        auth.checkToken();
//    },
    name: 'App',
    components: {
        ModifyUsuarioRegistrado
    }
}
</script>

<style lang="scss" scoped>
p {
    line-height: 1.5;
    margin: 0;
}
</style>
