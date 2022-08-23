<template>
    <DialogBox v-bind:header="dialogTitle" v-model:visible="displayModal" :closable="false" :breakpoints="{'960px': '75vw', '640px': '90vw'}" :style="{width: '25vw'}" :modal="true">
        <p class="m-0">{{ modalMessage }}</p>
        <template #footer>
            <ButtonComponent label="Cerrar" icon="pi pi-check" @click="closeModal" v-bind:class="{ 'p-button-danger': error }" autofocus />
        </template>
    </DialogBox>
    <div class="w-full justify-content-center p-fluid grid">
        <div class="field col-12">
            <span class="p-float-label">
                <InputText id="email" type="text" v-model="email" v-bind:class="{ 'p-invalid': emailError }" />
                <label for="email">Email</label>
            </span>
        </div>
        <div class="field col-12">
            <span class="p-float-label">
                <PasswordInput id="contrasena" v-model="contrasena" :feedback="false" v-bind:class="{ 'p-invalid': contrasenaError }" />
                <label for="contrasena">Contraseña</label>
            </span>
        </div>
        <div class="field col-12 sm:col-3">
            <ButtonComponent @click="loginClicked" class="ferro" label="Ingresar" icon="pi pi-check" iconPos="right" />
        </div>
    </div>                    
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { Buffer } from 'buffer';

export default {
    setup() {
        onMounted(() => {

        });

        const router = useRouter();

        // si el puerto es 8080, no es con proxy
        const url = new URL(window.location.href);
        const api = (url.port == "8080") ? "http://localhost:3001" : "/api";

        const displayModal = ref(false);
        const modalMessage = ref("");
        const dialogTitle = ref("Error");

        const email = ref("");
        const contrasena = ref("");

        const emailError = ref(false);
        const contrasenaError = ref(false);

        const error = ref(false);

        const loginClicked = () => {
            if (validar()) {
                login();
            }
        };

        const login = () => {
            axios
                .post(api + "/login", {
                    Email: email.value,
                    Contrasena: Buffer.from(contrasena.value).toString('base64')
                })
                .then((response) => {
                    localStorage.setItem("FERROMARKET_TOKEN", response.data.token);
                    router.push("/");
                })
                .catch(err => {
                    console.log(err);
                    openModal("El email y/o contraseña estaba incorrecto!");
                });
        };

        const validar = () => {
            emailError.value = false;
            contrasenaError.value = false;
            error.value = false;
            if (email.value.trim() === "") {
                emailError.value = true;
                error.value = true;
                openModal("Falta ingresar un email!");
                return false;
            }
            if (contrasena.value.trim() === "") {
                contrasenaError.value = true;
                error.value = true;
                openModal("Falta ingresar una contraseña!");
                return false;
            }
            return true;
        };

        const openModal = (message) => {
            modalMessage.value = message;
            dialogTitle.value = "Error";
            displayModal.value = true;
        };

        const closeModal = () => {
            displayModal.value = false;
        };

        return {
            email,
            emailError,
            contrasena,
            contrasenaError,
            loginClicked,
            login,
            validar,
            displayModal,
            dialogTitle,
            modalMessage,
            openModal,
            closeModal,
            error
        };
    }
};
</script>

<style scoped lang="scss">
::v-deep(.ferro) {
    background: var(--orange-400) !important;
    color: var(--surface-0) !important;
}
.ferro:hover {
    background: var(--orange-500) !important;
    color: var(--surface-0) !important;
}
</style>
