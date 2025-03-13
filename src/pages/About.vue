<script setup lang="ts">
import { onMounted, ref } from 'vue';
import WhoWeAre from '../components/about/WhoWeAre.vue';
import TeamSquad from '../components/about/TeamSquad.vue';
import Career from '../components/about/Career.vue';
import { onTop } from '../functions/functions';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

onMounted(() => {
    onTop('instant');
    getIsActive();
})
const teamActive = ref(false);
const getIsActive = async () => {
    const dataRef = await doc(db, 'actives', 'isActiveTeam');
    const data = await getDoc(dataRef);
    if (data.exists()) {
        teamActive.value = data.data().isactive;
    }
}

</script>

<template>
    <div>
        <div class="bg-black ">
            <div class="relative">
                <div class="w-screen relative lg:h-[600px] md:h-[500px] h-[400px] opacity-25 overflow-hidden ">
                    <img class="w-full h-full bg-top object-cover" src="../assets/images/aboutus-bg.jpg" alt="">
                </div>
                <div
                    class="container w-full h-full mx-auto md:px-20 px-4 absolute fixHeight top-0 left-0 right-0 bottom-0 fix-firstScreen justify-center text-white flex flex-col items-start ">
                    <h1
                        class="2xl:text-8xl lg:text-6xl md:text-5xl sm:text-4xl text-3xl sofia-medium uppercase 2xl:mb-20 sm:mb-10 mb-5">
                        About us</h1>
                    <p class="md:w-2/3 2xl:text-base lg:text-15 sm:text-sm text-[12px]">Lorem ipsum, dolor sit amet
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
        <TeamSquad v-if="teamActive"></TeamSquad>
        <Career></Career>
    </div>
</template>


<style></style>