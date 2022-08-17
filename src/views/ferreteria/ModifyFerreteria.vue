<template>
    <div class="sm:col-4 sm:col-offset-4">
        <CardPanel class="flex justify-content-center">
            <template #title>
                <div class="flex justify-content-center flex-wrap card-container">
                    <h2>Modify Ferretería</h2>
                </div>
            </template>
            <template #content>
                <ModifyFerreteria/>
            </template>
        </CardPanel>
    </div>
</template>

<script>
import ModifyFerreteria from '../../components/ferreteria/ModifyFerreteria.vue'

export default {
    name: 'App',
    components: {
        ModifyFerreteria
    }
}
</script>

<style lang="scss" scoped>
p {
    line-height: 1.5;
    margin: 0;
}
</style>
