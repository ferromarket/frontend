<template>
    <CardPanel class="flex justify-content-center sm:col-4 sm:col-offset-4">
        <template #title>
            <div class="flex justify-content-center flex-wrap card-container">
                <h2>Crear Ferretería</h2>
            </div>
        </template>
        <template #content>
            <CreateFerreteria/>
        </template>
    </CardPanel>
</template>

<script>
import CreateFerreteria from '../../components/ferreteria/CreateFerreteria.vue'
import auth from '../../utils/auth.js';

export default {
    setup() {
        auth.checkToken();
    },
    name: 'App',
    components: {
        CreateFerreteria
    }
}
</script>

<style lang="scss" scoped>
p {
    line-height: 1.5;
    margin: 0;
}
</style>
