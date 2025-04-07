<script setup lang="ts">
import TextParticles from '../threejs/TextParticles.vue';
import Typed from 'typed.js';
import { Icon } from '@iconify/vue'
import { onMounted, reactive, ref } from 'vue';
import { onTop } from '../functions/functions';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const infomation = reactive({
    email: '',
    facebookLink: '',
    instagramLink: '',
    whatsappLink: '',
})

const email = ref("")
const isValidEmail = ref(true)
const isSentSuccessfully = ref(false)


function validateEmail(email: string) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}


async function handleSubmit() {
    isValidEmail.value = validateEmail(email.value)
    if (email.value == "") {
        isValidEmail.value = false;
    }
    else {
        const customerEmail = {
            email: email.value
        }
        try {
            isSentSuccessfully.value = true;
            const customerDoc = doc(collection(db, "customers/"));
            await setDoc(customerDoc, customerEmail);
        } catch (error) {
            console.log("Failed send Email!! " + error);
        }

    }
}

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
    <div class="container">
        <TextParticles class="w-screen"></TextParticles>
        <section class="bg-black text-white lg:pb-16 md:pb-10 pb-6 pt-8 w-screen">
            <div class="mx-auto container px-4">
                <div class="grid lg:grid-cols-5 grid-cols-1 lg:gap-40 gap-20">
                    <div class=" col-span-3">
                        <h1 class="2xl:text-8xl md:text-6xl text-5xl font-heading text-dark">We make <br>a <span
                                class="auto-type underline text-white"></span>
                        </h1>
                    </div>
                    <div class=" col-span-2 flex sm:flex-row flex-col sm:gap-20 gap-5">
                        <ul class=" font-europa-light">
                            <li class="2xl:text-2xl md:text-xl sm:text-lg text-2xl sofia-bold sm:mb-8 mb-5">Contact</li>
                            <li class="sm:pb-6 pb-3">
                                <router-link to="/about">
                                    <p class="2xl:text-xl md:text-lg sm:text-md text-xl">About Us</p>
                                </router-link>
                            </li>
                            <li class="sm:pb-6 pb-3">
                                <router-link to="/contact">
                                    <p class="2xl:text-xl md:text-lg sm:text-md text-xl">Email Us</p>
                                </router-link>
                            </li>
                            <li class="sm:pb-6 pb-3">
                                <router-link to="/contact">
                                    <p class="2xl:text-xl md:text-lg sm:text-md text-xl">Call Us</p>
                                </router-link>
                            </li>
                        </ul>
                        <ul class=" font-europa-light">
                            <li class="2xl:text-2xl md:text-xl sm:text-lg text-2xl sofia-bold sm:mb-8 mb-5">Our Projects
                            </li>
                            <li class="sm:pb-6 pb-3">
                                <router-link to="/projects">
                                    <p class="2xl:text-xl md:text-lg sm:text-md text-xl">Interior</p>
                                </router-link>
                            </li>
                            <li class="sm:pb-6 pb-3">
                                <router-link to="/projects">
                                    <p class="2xl:text-xl md:text-lg sm:text-md text-xl">Exterior</p>
                                </router-link>
                            </li>

                            <li class="sm:pb-6 pb-3">
                                <router-link to="/projects">
                                    <p class="2xl:text-xl md:text-lg sm:text-md text-xl">360 Rendering</p>
                                </router-link>
                            </li>
                            <li class="sm:pb-6 pb-3">
                                <router-link to="/projects">
                                    <p class="2xl:text-xl md:text-lg sm:text-md text-xl">Animation</p>
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="grid lg:grid-cols-5 grid-cols-1 lg:gap-40 gap-6 lg:mt-20 md:mt-10 mt-6">
                    <div class=" col-span-3 sofia-light">
                        <p class="md:mb-4 mb-2 sofia-pro">Send for Us</p>
                        <form @submit.prevent="handleSubmit()" class=" flex mb-2">
                            <input v-model="email"
                                class="bg-white lg:text-[1rem] text-sm w-80 md:px-4 px-3 outline-none text-black"
                                placeholder="Your Email Address" type="email">

                            <div class="sm:p-2 p-1 bg-white">
                                <button type="submit"
                                    class="bg-main-color lg:text-[1rem] text-sm hover:scale-[0.9] text-white transition-all duration-500 border-main-color border-solid border-[1px] sofia-pro uppercase md:px-4 px-2 py-3 md:w-40 w-32">Send
                                    For Us</button>
                            </div>

                        </form>
                        <p class="mb-2 text-sm text-blue-500" v-if="isSentSuccessfully && isValidEmail">🤝"Email sent!
                            We look forward to working with you soon."
                        </p>
                        <p class="mb-2 text-sm text-red-500" v-if="!isValidEmail">Please enter a valid
                            Email address</p>

                        <p class="text-sm sm:block hidden text-light-dark ">Start your project today. Just leave your
                            email, and we'll contact you promptly.</p>
                    </div>
                    <div class="sm:block hidden col-span-2">
                        <p class="2xl:text-2xl lg:text-xl text-md sofia-bold lg:mb-4 mb-1">
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
                <div class="sm:flex hidden justify-center items-center lg:mt-20 mt-8">
                    <div class="bg-dark h-[1px] w-full"></div>
                    <div @click="onTop('smooth')"
                        class="hoverable flex justify-center items-start w-80 gap-2 text-light-dark hover:cursor-pointer">
                        <p class="lg:text-[1rem] text-sm">Scroll to Top</p>
                        <Icon class="lg:text-xl text-lg" icon="solar:arrow-to-top-left-bold" />
                    </div>
                    <div class="bg-dark h-[1px] w-full"></div>
                </div>
                <div class="flex justify-between mt-8">
                    <p class="lg:text-[1rem] text-sm uppercase">2024 TrungTeam®.</p>
                    <ul class="flex gap-4 2xl:mr-20 mr-0">
                        <a :href="infomation.facebookLink" target="_blank">
                            <Icon
                                class="lg:text-3xl md:text-2xl text-xl cursor-pointer hover:text-blue-600 transition-all"
                                icon="ic:baseline-facebook" />
                        </a>
                        <a :href="infomation.whatsappLink" target="_blank">
                            <Icon
                                class="lg:text-3xl md:text-2xl text-xl cursor-pointer hover:text-green-600 transition-all"
                                icon="ic:baseline-whatsapp" />
                        </a>
                        <a :href="infomation.instagramLink" target="_blank">
                            <Icon
                                class="lg:text-3xl md:text-2xl text-xl cursor-pointer hover:text-pink-600 transition-all"
                                icon="dashicons:instagram" />
                        </a>
                    </ul>
                </div>
            </div>
        </section>
    </div>
</template>


<style>
.error {
    border: 2px solid red;
}

.error-message {
    color: red;
}
</style>