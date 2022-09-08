<template>
    <CardPanel class="flex justify-content-center bg-orange-400 sm:col-6 sm:col-offset-3 ">
    <template #content>
        <PerfilVehiculo />
    </template>
    </CardPanel>
</template>

<script>
import PerfilVehiculo from "../../components/vehiculo/PerfilVehiculo.vue";

export default {
    name: "App",
    components: {
        PerfilVehiculo,
    },
};
</script>

<style lang="scss" scoped>
p {
    line-height: 1.5;
    margin: 0;
}
</style>
