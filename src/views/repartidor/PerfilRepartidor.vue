<template>
    <CardPanel class="flex justify-content-center bg-orange-400 sm:col-6 sm:col-offset-3 ">
    <template #content>
        <PerfilRepartidor />
    </template>
    </CardPanel>
</template>

<script>
import PerfilRepartidor from "../../components/repartidor/PerfilRepartidor.vue";

export default {
    name: "App",
    components: {
        PerfilRepartidor,
    },
};
</script>

<style lang="scss" scoped>
p {
    line-height: 1.5;
    margin: 0;
}
</style>
