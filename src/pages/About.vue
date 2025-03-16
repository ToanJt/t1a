<script setup lang="ts">
import { onMounted, ref } from 'vue';
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
    <div class="w-screen">
        <div class="bg-black w-full py-32 sm:pb-32 pb-20">
            <div class="container mx-auto px-4">
                <div class="grid md:grid-cols-3 grid-cols-5 lg:gap-16 gap-6">
                    <!-- <div class=" col-span-1"> -->
                    <img class="md:col-span-1 col-span-2" src="../assets/images/avt.png" alt="">
                    <!-- </div> -->
                    <div
                        class="md:col-span-2 col-span-3 w-full h-full justify-center text-light-dark flex flex-col items-start ">
                        <h1
                            class="2xl:text-8xl text-white lg:text-6xl md:text-5xl sm:text-4xl text-3xl sofia-medium uppercase 2xl:mb-20 sm:mb-10 mb-5">
                            About us</h1>
                        <p class="text-justify 2xl:text-base lg:text-15 sm:text-sm text-[12px]">Founded by Trung Le in
                            2021,
                            LTR
                            Studio provides high-quality rendering services worldwide for architects, designers, real
                            estate
                            investors, developers, and marketing agencies.
                        </p>
                        <p class="sm:block hidden text-justify 2xl:text-base lg:text-15 sm:text-sm text-[12px] my-5">We
                            have a team of
                            experienced 3D
                            artists, architects, and designers who work seamlessly
                            together
                            to deliver visually compelling and technically accurate renderings that communcate design
                            ideas
                            clearly and strikingly, ensuring complete customer satisfaction.
                        </p>
                        <p class="sm:block hidden text-justify 2xl:text-base lg:text-15 sm:text-sm text-[12px]">Let us
                            know if you have
                            an exciting
                            project and would like to collaborate!</p>
                    </div>

                </div>
                <p
                    class="sm:hidden block text-light-dark text-justify 2xl:text-base lg:text-15 sm:text-sm text-[12px] my-5">
                    We
                    have a team of
                    experienced 3D
                    artists, architects, and designers who work seamlessly
                    together
                    to deliver visually compelling and technically accurate renderings that communcate design
                    ideas
                    clearly and strikingly, ensuring complete customer satisfaction.
                </p>
                <p class="sm:hidden block text-light-dark text-justify 2xl:text-base lg:text-15 sm:text-sm text-[12px]">
                    Let us
                    know if you have
                    an exciting
                    project and would like to collaborate!</p>
            </div>
        </div>
        <Career></Career>
        <TeamSquad v-if="teamActive"></TeamSquad>

    </div>
</template>


<style></style>