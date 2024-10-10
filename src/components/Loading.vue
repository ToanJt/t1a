<script setup lang="ts">
import { onMounted, ref } from 'vue';

const isLoading = ref(false);
onMounted(() => {
    document.onreadystatechange = () => {
        if (document.readyState == 'complete') {
            isLoading.value = true;
        }
    }
})
</script>

<template>
    <div v-if="!isLoading" class="flex flex-col items-center fixed top-0 left-0 right-0 bottom-0 bg-black">
        <div class="donut mb-4">
        </div>
        <p class="text-white -tracking-tighter">Loading...</p>
    </div>
</template>

<style scoped>
.donut {
    width: 8rem;
    height: 8rem;
    border-radius: 50%;
    border: 0.3rem solid;
    border-color: rgba(#39465f, 0.3);
    border-top-color: #a8b5ce;
    animation: 1.5s spin infinite linear;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}
</style>