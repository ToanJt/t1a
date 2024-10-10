<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { Icon } from "@iconify/vue"
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig'
import { onTop } from '../functions/functions';

const contact = reactive({
    facebookLink: '',
    whatsappLink: '',
    instagramLink: '',
    locationEmbed: '',
    address: '',
    emailAddress: '',
    phone: '',
})

onMounted(async () => {
    const contactLinks = await getDocs(collection(db, 'contacts'));
    contactLinks.forEach((item) => {
        contact.facebookLink = item.data().facebook;
        contact.whatsappLink = item.data().whatsapp;
        contact.instagramLink = item.data().instagram;
        contact.locationEmbed = item.data().location;
        contact.address = item.data().address;
        contact.emailAddress = item.data().email;
        contact.phone = item.data().phone;
    })
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
                    <h1 class="text-8xl sofia-medium uppercase mb-20">Contact</h1>
                    <ul class="flex gap-6 text-2xl pb-6">
                        <a class="text-2xl" :href="contact.facebookLink" target="_blank">
                            <Icon class="hoverable cursor-pointer hover:text-blue-600 transition-all"
                                icon="ic:baseline-facebook" width="1.5em" height="1.5em" />
                        </a>
                        <a class="text-2xl" :href="contact.whatsappLink" target="_blank">
                            <Icon class="hoverable cursor-pointer hover:text-green-600 transition-all"
                                icon="ic:baseline-whatsapp" width="1.5em" height="1.5em" />
                        </a>
                        <a class="text-2xl" :href="contact.instagramLink" target="_blank">
                            <Icon class="hoverable cursor-pointer hover:text-pink-600 transition-all"
                                icon="dashicons:instagram" width="1.5em" height="1.5em" />
                        </a>
                    </ul>
                </div>
            </div>
        </div>
        <div class="bg-vr-light-gray">
            <div class="w-1286 mx-auto pt-24 pb-36 ">
                <div class="flex flex-col items-center">
                    <h1 class="text-6xl sofia-medium mb-5">You Have An Idea, Let Us Make It Happen!</h1>
                    <p class="uppercase sofia-pro text-15 tracking-widest mb-8">
                        Contact Us Via</p>
                    <div class="flex items-center justify-center gap-40 w-full">
                        <div class="flex flex-col items-center">
                            <p class="sofia-light-italic mb-1">Trung Le - Founder</p>
                            <p class="text-19 text-blue-800">{{ contact.emailAddress }}</p>
                        </div>
                        <div class="flex flex-col items-center">
                            <p class="sofia-light-italic mb-1">Address: Da Nang City, VietNam</p>
                            <p class="text-19 ">{{ contact.address }}</p>
                        </div>
                        <div class="flex flex-col items-center">
                            <p class="sofia-light-italic mb-1">Whatsapp - Call</p>
                            <p class="text-19 text-green-600">+84 {{ contact.phone }}</p>
                        </div>
                    </div>
                    <div class="border-b border-solid w-4/5 mt-12"></div>
                </div>
                <div class="formBox mx-80 px-12 py-12 bg-white border border-solid mt-20">
                    <form action="">
                        <div class=" flex flex-col mb-8">
                            <label class="mb-2 text-black" for="username">Your Name</label>
                            <input placeholder="Full Name" class="pl-4 pr-2 h-12 outline-none bg-[#FAF6F3]" type="text"
                                id="username">
                        </div>
                        <div class=" flex flex-col mb-8">
                            <label class="mb-2 text-black" for="email">Your Email</label>
                            <input placeholder="Enter your email" class="pl-4 pr-2 h-12 outline-none bg-[#FAF6F3]"
                                type="email" id="email">
                        </div>
                        <div class=" flex flex-col mb-8">
                            <label class="mb-2 text-black" for="email">Subject</label>
                            <input placeholder="Enter your email" class="pl-4 pr-2 h-12 outline-none bg-[#FAF6F3]"
                                type="email" id="email">
                        </div>
                        <div class=" flex flex-col mb-8">
                            <label class="mb-2 text-black" for="messenge">Leave us a Message</label>
                            <textarea placeholder="Please type your message here..."
                                class="pl-4 pr-2 py-3 outline-none bg-[#FAF6F3]" name="messenge" id="messenge" rows="5"
                                cols="15"></textarea>
                        </div>
                        <button
                            class="bg-black hover:scale-[0.9] text-white transition-all duration-500 border-black border-solid border-[1px] sofia-pro px-4 py-3 w-40">Send
                            Message</button>
                    </form>
                </div>
                <iframe class="w-full mt-20 border border-solid" :src="contact.locationEmbed" width="600" height="500"
                    loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </div>
    </div>
</template>

<style scoped>
.formBox {
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}
</style>
