<template>
    <CardPanel class="flex justify-content-center sm:col-4 sm:col-offset-4">
        <template #title>
            <div class="flex justify-content-center flex-wrap card-container">
                <h2>Ingresar</h2>
            </div>
        </template>
        <template #content>
            <LoginAuth/>
        </template>
    </CardPanel>
</template>

<script>
import LoginAuth from '../components/LoginAuth.vue'

export default {
    name: 'App',
    components: {
        LoginAuth
    }
}
</script>

<style lang="scss" scoped>
p {
    line-height: 1.5;
    margin: 0;
}
</style>
