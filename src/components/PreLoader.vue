<script setup lang="ts">
import { onMounted, ref } from 'vue';

const isLoading = ref(false);
const timeDuration = 1500;
onMounted(() => {
    setTimeout(() => {
        isLoading.value = true;
        console.log("loading true")
    }, timeDuration)
})
</script>

<template>
    <div
        class=" flex opacity-100 transition-all duration-300 flex-col items-center justify-center fixed z-[999] top-0 left-0 right-0 bottom-0 bg-black">
        <div class="loader"></div>
    </div>

</template>

<style scoped>
/* HTML: <div class="loader"></div> */
.loader {
    width: fit-content;
    font-weight: bold;
    font-family: monospace;
    font-size: 30px;
    background: linear-gradient(90deg, #000 50%, #0000 0) right/200% 100%;
    animation: l21 1.5s infinite linear;
}

.loader::before {
    content: "LTR...";
    color: #0000;
    font-size: 3rem;
    padding: 0 5px;
    background: inherit;
    background-image: linear-gradient(90deg, #fff 50%, #000 0);
    -webkit-background-clip: text;
    background-clip: text;
}

@keyframes l21 {
    100% {
        background-position: left
    }
}
</style>