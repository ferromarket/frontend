<template #content>
    <PerfilRepartidor />
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
