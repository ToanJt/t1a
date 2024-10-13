<script setup lang="ts">
import TextParticles from '../threejs/TextParticles.vue';
import Typed from 'typed.js';
import { Icon } from '@iconify/vue'
import { onMounted, reactive } from 'vue';
import { onTop } from '../functions/functions';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const infomation = reactive({
    email: '',
    facebookLink: '',
    instagramLink: '',
    whatsappLink: '',
})

onMounted(async () => {
    new Typed('.auto-type', {
        strings: ['difference.', 'beautiful.', 'trust.'],
        typeSpeed: 130,
        backSpeed: 130,
        loop: true,
    });

    const getInformation = await getDocs(collection(db, 'contacts'));
    getInformation.forEach((item) => {
        infomation.email = item.data().email;
        infomation.facebookLink = item.data().facebook;
        infomation.instagramLink = item.data().instagram;
        infomation.whatsappLink = item.data().whatsapp;
    })
})

</script>


<template>
    <div>
        <TextParticles></TextParticles>
        <section class="bg-black text-white pb-16 pt-8 w-screen">
            <div class="mx-auto container">
                <div class="grid grid-cols-5 gap-40">
                    <div class=" col-span-3">
                        <h1 class="text-8xl font-heading text-dark">We make <br>a <span
                                class="auto-type underline text-white"></span>
                        </h1>
                    </div>
                    <div class=" col-span-2 flex gap-28">
                        <ul class=" font-europa-light text-xl">
                            <li class="text-2xl sofia-bold mb-8">Contact</li>
                            <li class="pb-6">Email Us</li>
                            <li class="pb-6">Careers</li>
                            <li class="pb-6">About Us</li>
                        </ul>
                        <ul class=" font-europa-light text-xl">
                            <li class="text-2xl sofia-bold mb-8">Contact</li>
                            <li class="pb-6">Email Us</li>
                            <li class="pb-6">Careers</li>
                            <li class="pb-6">About Us</li>
                        </ul>
                    </div>
                </div>
                <div class="grid grid-cols-5 gap-40 mt-20">
                    <div class=" col-span-3 sofia-light">
                        <p class="mb-4 sofia-pro">Send for Us</p>
                        <div class=" flex mb-8">
                            <input class="bg-white w-80 px-4 outline-none text-black" placeholder="Your Email Address"
                                type="email">
                            <div class="p-2 bg-white">
                                <button
                                    class="bg-black hover:scale-[0.9] text-white transition-all duration-500 border-black border-solid border-[1px] sofia-pro uppercase px-4 py-3 w-40">Send
                                    For Us</button>
                            </div>
                        </div>
                        <p class="text-sm text-light-dark ">Shape stunning interiors and exteriors with the Flowbase
                            team.<br> Fresh
                            ideas
                            delivered to your
                            inbox today.</p>
                    </div>
                    <div class="col-span-2">
                        <p class="text-2xl sofia-bold mb-4">
                            Get in touch
                        </p>
                        <p
                            class="hoverable flex items-center cursor-pointer hover:text-white transition-all text-light-dark gap-2">
                            {{ infomation.email }}
                            <span>
                                <Icon class="text-light-dark" icon="akar-icons:link-out" width="1.2em" height="1.2em" />
                            </span>
                        </p>
                    </div>
                </div>
                <div class="flex justify-center items-center mt-20">
                    <div class="bg-dark h-[1px] w-full"></div>
                    <div @click="onTop('smooth')"
                        class="hoverable flex justify-center items-start w-80 gap-2 text-light-dark hover:cursor-pointer">
                        <p>Scroll to Top</p>
                        <Icon icon="solar:arrow-to-top-left-bold" width="1.5em" height="1.5em" />
                    </div>
                    <div class="bg-dark h-[1px] w-full"></div>
                </div>
                <div class="flex justify-between mt-20 ">
                    <p class=" uppercase">2024 TrungTeam®.</p>
                    <ul class="flex gap-4 mr-20">
                        <a :href="infomation.facebookLink">
                            <Icon class=" cursor-pointer hover:text-blue-600 transition-all" icon="ic:baseline-facebook"
                                width="2em" height="2em" />
                        </a>
                        <a :href="infomation.whatsappLink">
                            <Icon class=" cursor-pointer hover:text-green-600 transition-all"
                                icon="ic:baseline-whatsapp" width="2em" height="2em" />
                        </a>
                        <a :href="infomation.instagramLink">
                            <Icon class=" cursor-pointer hover:text-pink-600 transition-all" icon="dashicons:instagram"
                                width="2em" height="2em" />
                        </a>
                    </ul>
                </div>
            </div>
        </section>
    </div>
</template>
