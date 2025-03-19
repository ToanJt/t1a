<script setup lang="ts">
import { onMounted, ref, watch, reactive } from 'vue';
import gsap from 'gsap';
import { Icon } from '@iconify/vue'
import { useRoute } from 'vue-router';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const isActiveNavbar = ref(false);
const route = useRoute();

const activeHandle = () => {
    isActiveNavbar.value = !isActiveNavbar.value;
}
const infomation = reactive({
    email: '',
    facebookLink: '',
    instagramLink: '',
    whatsappLink: '',
})
const setDefaultAnimation = () => {
    gsap.timeline().set('.item', {
        x: -100,
        opacity: 0,
    }).set('.item-right1', {
        x: 200,
        opacity: 0,
    }).set('.item-right2', {
        x: 250,
        opacity: 0,
    })
}

watch(route, () => {
    isActiveNavbar.value = false;
})

watch(isActiveNavbar, () => {
    setDefaultAnimation();
    if (isActiveNavbar.value) {
        gsap.timeline().to('.item', {
            opacity: 1,
            x: 0,
            duration: 0.25,
            stagger: 0.25
        }, '+=0.25')
            .to(['.item-right1'], {
                opacity: 1,
                x: 0,
                delay: 1,
                duration: 0.5,
                stagger: 0.25
            }, '-=0.75')
            .to(['.item-right2'], {
                opacity: 1,
                x: 0,
                delay: 0.25,
                duration: 0.5,
                stagger: 0.25
            }, '-=0.25')
    }
})

onMounted(async () => {
    setDefaultAnimation();

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
    <div class="relative">
        <div
            class="fixed px-4 mix-blend-exclusion text-white z-20 top-0 left-0 right-0 container mx-auto h-28 flex items-center justify-between">
            <router-link to="/">
                <!-- <h1 class="font-roboto lg:text-6xl text-5xl text-white">T1A</h1> -->
                <img src="../assets/images/logo.png" class="lg:h-14 md:h-10 h-8" alt="">
            </router-link>
            <div @click="activeHandle()" class="lg:hidden flex relative">
                <i class="text-2xl fa-solid fa-bars"></i>
            </div>
            <div class="lg:flex hidden gap-8 text-xl font-heading">
                <router-link to="/">Home</router-link>
                <router-link to="/projects">Projects</router-link>
                <router-link to="/about">About Us</router-link>
                <router-link to="/contact">Contact</router-link>
                <div class="flex items-center gap-3">
                    <a :href="infomation.facebookLink" target="_blank">
                        <Icon
                            class=" opacity-50 hover:opacity-100 text-white transition-colors duration-500 hover:text-blue-600"
                            icon="ant-design:facebook-filled" width="1em" height="1em" />
                    </a>
                    <a :href="infomation.instagramLink" target="_blank">
                        <Icon
                            class=" opacity-50 hover:opacity-100 text-white transition-colors duration-500 hover:text-pink-600"
                            icon="ri:instagram-fill" width="1em" height="1em" />
                    </a>
                    <a :href="infomation.whatsappLink" target="_blank">
                        <Icon
                            class=" opacity-50 hover:opacity-100 text-white transition-colors duration-500 hover:text-green-600"
                            icon="mingcute:whatsapp-fill" width="1em" height="1em" />
                    </a>
                </div>
            </div>
        </div>
        <div :class="{ '!flex': isActiveNavbar }"
            class="bg-black px-4 hidden lg:!hidden items-center fixed z-10 left-0 right-0 top-0 bottom-0">
            <div class="container mx-auto grid md:grid-cols-5 text-white">
                <div class="px-4 md:col-span-3 h-screen flex flex-col justify-center">
                    <div class="flex flex-col gap-8 text-xl font-heading">
                        <router-link class="item text-xl" to="/">Home</router-link>
                        <router-link class="item text-xl" to="/projects">Projects</router-link>
                        <router-link class="item text-xl" to="/about">About Us</router-link>
                        <router-link class="item text-xl" to="/contact">Contact</router-link>
                    </div>
                </div>
                <div
                    class="md:col-span-2 border-l border-zinc-600 border-solid md:flex hidden flex-col justify-center gap-8 pl-8">
                    <div>
                        <p class="item-right1 text-xl mb-2 text-[#727272]">Contact Us via</p>
                        <div class="flex item-right2 gap-1 items-center">
                            <p class=" text-2xl">trungle@gmail.com</p>
                        </div>
                    </div>
                    <div>
                        <p class="item-right1 text-xl mb-2 text-[#727272]">Have an Idea?</p>
                        <div class="flex item-right2 gap-2 items-center">
                            <p class=" text-2xl">Send it to Us</p>
                            <Icon icon="lucide:move-right" width="2em" height="2em" style="color: white" />
                        </div>
                    </div>
                    <div>
                        <p class="item-right1 text-xl mb-2 text-[#727272]">Want to see more?</p>
                        <div class="flex item-right2 gap-2 items-center">
                            <router-link class=" text-2xl !text-white" to="/projects">Go to
                                Portfolio</router-link>
                            <Icon icon="lucide:move-right" width="2em" height="2em" style="color: white" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.router-link-exact-active,
.router-link-active {
    color: white;
}

a {
    color: #727272;
    background-size: 200% 100%;
    background-position: -100%;
    display: inline-block;
    padding: 3px 0;
    position: relative;
    transition: all 0.3s ease-in-out;
}


a:before {
    content: '';
    background: white;
    display: block;
    position: absolute;
    bottom: -3px;
    left: 0;
    width: 0;
    height: 3px;
    transition: all 0.3s ease-in-out;
}


a:hover {
    background-position: 0;
}

a:hover::before {
    width: 100%;
}

.heading:hover::before {
    display: none;
}
</style>