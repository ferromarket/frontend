<template>
    <div class="surface-card p-4 shadow-2 border-round w-full lg:w-6">
        <div class="text-center mb-5">
            <span class="p-float-label">
                <InputText id="username" type="text" v-model="value1" />
                <label for="username">Username</label>
            </span>
        </div>
        {{ value1 }}
    </div>                    
</template>

<script>
import { ref } from 'vue';

export default {
    setup() {
        const value1 = ref();
        return { value1 }
    },
};
</script>
