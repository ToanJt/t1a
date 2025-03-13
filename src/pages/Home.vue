<script setup lang="ts">
import Intro from './../components/home/Intro.vue';
import CompanyStrengths from '../components/home/CompanyStrengths.vue';
import Services from '../components/home/Services.vue';
import Endorsements from '../../src/components/home/Endorsements.vue'
import ProjectsShow from '../components/home/ProjectsShow.vue';
import OurClients from '../components/home/OurClients.vue';
import { onMounted } from 'vue';
import { onTop } from '../functions/functions';

onMounted(() => {
    onTop('instant');
})
</script>

<template>
    <div class="">
        <Intro></Intro>
        <Services></Services>
        <CompanyStrengths></CompanyStrengths>

        <ProjectsShow></ProjectsShow>
        <Endorsements></Endorsements>
        <OurClients></OurClients>
    </div>
</template>