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
                <div class="w-screen relative lg:h-[600px] md:h-[500px] h-[400px] opacity-15 overflow-hidden ">
                    <img class="w-full h-full bg-top object-cover" src="../assets/images/aboutus-bg.jpg" alt="">
                </div>
                <div
                    class="container mx-auto md:px-20 px-4 absolute top-0 left-0 right-0 fix-firstScreen md:bottom-40 sm:bottom-60 ssm:bottom-80 bottom-[30vh] justify-center text-white flex flex-col items-start mb-24">
                    <h1
                        class="xl:text-8xl lg:text-6xl md:text-5xl sm:text-4xl text-3xl sofia-medium uppercase xl:mb-20 sm:mb-10 mb-5">
                        About us</h1>
                    <p class="md:w-2/3 xl:text-base lg:text-15 sm:text-sm text-[12px]">Lorem ipsum, dolor sit amet
                        consectetur
                        adipisicing
                        elit.
                        Tenetur
                        ducimus,
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
