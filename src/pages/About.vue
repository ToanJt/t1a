<script setup lang="ts">
import { onMounted } from 'vue';
import WhoWeAre from '../components/about/WhoWeAre.vue';
import TeamSquad from '../components/about/TeamSquad.vue';
import Career from '../components/about/Career.vue';
import { onTop } from '../functions/functions';

onMounted(() => {
    onTop('instant');
})
</script>

<template>
    <div>
        <div class="bg-black ">
            <div class="">
                <div class="w-screen relative h-[600px]  opacity-15 overflow-hidden ">
                    <img class="w-full bg-top test" src="../assets/images/aboutus-bg.jpg" alt="">
                </div>
                <div
                    class="w-1286 mx-auto absolute top-0 left-0 right-0 bottom-40 justify-center text-white flex flex-col items-start mb-24">
                    <h1 class="text-8xl sofia-medium uppercase mb-20">About us</h1>
                    <p class="w-2/3 font-europa-regular">Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                        Tenetur ducimus,
                        perspiciatis nobis
                        cupiditate maxime deserunt? Qui error, quos rem placeat omnis quasi sit ratione vel voluptas
                        saepe
                        odit, ea aspernatur!</p>
                </div>
            </div>
        </div>
        <WhoWeAre></WhoWeAre>
        <TeamSquad></TeamSquad>
        <Career></Career>
    </div>
</template>
