<template>
    <div class="sm:col-4 sm:col-offset-4">
        <ShowFerreteria/>
    </div>
</template>

<script>
import ShowFerreteria from '../../components/ferreteria/ShowFerreteria.vue'

export default {
    name: 'App',
    components: {
        ShowFerreteria
    }
}
</script>

<style lang="scss" scoped>
p {
    line-height: 1.5;
    margin: 0;
}
</style>
