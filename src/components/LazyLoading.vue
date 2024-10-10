<script setup lang="ts">
import { onMounted, ref } from 'vue';
import AppearTransition from './AppearTransition.vue';

const rootElement = ref(null);
const renderComponent = ref<boolean>();

function createIntersectionObserver() {
    return new IntersectionObserver(entries => {
        for (const entry of entries) {
            if (entry.isIntersecting) {
                renderComponent.value = true
            }
        }
    })
}

onMounted(() => {
    if (rootElement.value) {
        createIntersectionObserver().observe(rootElement.value)
    }
})
</script>

<template>
    <div ref="rootElement">
        <AppearTransition>
            <slot v-if="renderComponent"></slot>
        </AppearTransition>
    </div>
</template>