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
            <div class="relative">
                <div class="w-screen relative lg:h-[400px] md:h-[350px] h-[300px] opacity-65 overflow-hidden ">
                    <img class="light-bulb w-full h-full bg-top object-cover lg:object-center md:object-[-200px] "
                        src="../assets/images/bgr-contact.jpg" alt="">
                </div>
                <div
                    class="container px-4 w-full h-full fixHeight mx-auto lg:pb-20 md:pb-16 pb-10 absolute top-0 left-0 right-0 bottom-0 fix-firstScreen text-white flex flex-col justify-end">
                    <p class="uppercase sofia-pro sm:text-15 text-[13px] tracking-widest sm:mb-5 mb-2">Let's
                        Talk</p>
                    <div
                        class="flex sm:flex-row flex-col sm:items-center items-start xl:gap-20 lg:gap-6 sm:gap-12 gap-6">
                        <div>

                            <h1
                                class="2xl:text-7xl xl:text-5xl lg:text-4xl md:text-4xl sm:text-4xl text-3xl sofia-medium uppercase ">
                                Contact</h1>
                        </div>
                        <ul class="flex gap-6 text-2xl ">
                            <a :href="contact.facebookLink">
                                <Icon
                                    class="xl:text-3xl sm:text-2xl text-xl cursor-pointer hover:text-blue-600 transition-all"
                                    icon="ic:baseline-facebook" />
                            </a>
                            <a :href="contact.whatsappLink">
                                <Icon
                                    class="xl:text-3xl sm:text-2xl text-xl cursor-pointer hover:text-green-600 transition-all"
                                    icon="ic:baseline-whatsapp" />
                            </a>
                            <a :href="contact.instagramLink">
                                <Icon
                                    class="xl:text-3xl sm:text-2xl text-xl cursor-pointer hover:text-pink-600 transition-all"
                                    icon="dashicons:instagram" />
                            </a>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="bg-vr-light-gray">
            <div class="container mx-auto px-4 lg:pt-24 pt-16 2xl:pb-36 pb-24 ">
                <div class="flex flex-col items-center">
                    <h1 class="2xl:text-6xl lg:text-5xl sm:text-4xl text-2xl mb-5 text-center sofia-medium">You Have An
                        Idea,
                        Let Us Make It Happen!</h1>
                    <p class="uppercase sofia-pro sm:text-15 text-[13px] tracking-widest mb-8">
                        Contact Us Via</p>
                    <div class="flex sm:flex-row flex-col items-center justify-center lg:gap-40 sm:gap-12 gap-5 w-full">
                        <div class="flex flex-col items-center">
                            <p class="sofia-light-italic mb-1 lg:text-base text-sm">Trung Le - Founder</p>
                            <p class="lg:text-19 text-base text-blue-800">{{ contact.emailAddress }}</p>
                        </div>
                        <div class="flex flex-col items-center">
                            <p class="sofia-light-italic mb-1 lg:text-base text-sm">Address: Da Nang City, VietNam</p>
                            <p class="lg:text-19 text-base ">{{ contact.address }}</p>
                        </div>
                        <div class="flex flex-col items-center">
                            <p class="sofia-light-italic mb-1 lg:text-base text-sm">Whatsapp - Call</p>
                            <p class="lg:text-19 text-base text-green-600">+84 {{ contact.phone }}</p>
                        </div>
                    </div>
                    <div class="border-b border-solid lg:w-4/5 w-full sm:mt-12 mt-5"></div>
                </div>
                <div class="container mx-auto">
                    <div
                        class="formBox 2xl:mx-80 lg:mx-52 sm:mx-20 mx-0 md:px-12 sm:px-8 px-6 md:py-12 sm:py-8 py-6 bg-white border border-solid sm:mt-20 mt-12">
                        <form action="">
                            <div class=" flex flex-col mb-8">
                                <label class="lg:text-base text-sm mb-2 text-black" for="username">Your Name</label>
                                <input placeholder="Full Name"
                                    class="lg:text-base text-sm pl-4 pr-2 h-12 outline-none bg-[#FAF6F3]" type="text"
                                    id="username">
                            </div>
                            <div class=" flex flex-col mb-8">
                                <label class="lg:text-base text-sm mb-2 text-black" for="email">Your Email</label>
                                <input placeholder="Enter your email"
                                    class="lg:text-base text-sm pl-4 pr-2 h-12 outline-none bg-[#FAF6F3]" type="email"
                                    id="email">
                            </div>
                            <div class=" flex flex-col mb-8">
                                <label class="lg:text-base text-sm mb-2 text-black" for="email">Subject</label>
                                <input placeholder="Enter your email"
                                    class="lg:text-base text-sm pl-4 pr-2 h-12 outline-none bg-[#FAF6F3]" type="email"
                                    id="email">
                            </div>
                            <div class=" flex flex-col mb-8">
                                <label class="lg:text-base text-sm mb-2 text-black" for="messenge">Leave us a
                                    Message</label>
                                <textarea placeholder="Please type your message here..."
                                    class="lg:text-base text-sm pl-4 pr-2 py-3 outline-none bg-[#FAF6F3]"
                                    name="messenge" id="messenge" rows="5" cols="15"></textarea>
                            </div>
                            <button
                                class="bg-black lg:text-base text-sm hover:scale-[0.9] text-white transition-all duration-500 border-black border-solid border-[1px] sofia-pro px-4 py-3 w-40">Send
                                Message</button>
                        </form>
                    </div>
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

@media only screen and (max-width: 980px) {
    .light-bulb {
        object-position: -220px;
    }
}

@media only screen and (max-width: 935px) {
    .light-bulb {
        object-position: -240px;
    }
}

@media only screen and (max-width: 900px) {
    .light-bulb {
        object-position: -260px;
    }
}

@media only screen and (max-width: 850px) {
    .light-bulb {
        object-position: -280px;
    }
}

@media only screen and (max-width: 810px) {
    .light-bulb {
        object-position: -310px;
    }
}

@media only screen and (max-width: 768px) {
    .light-bulb {
        object-position: -180px;
    }
}

@media only screen and (max-width: 700px) {
    .light-bulb {
        object-position: -210px;
    }
}

@media only screen and (max-width: 660px) {
    .light-bulb {
        object-position: -230px;
    }
}

@media only screen and (max-width: 640px) {
    .light-bulb {
        object-position: -360px;
    }
}

@media only screen and (max-width: 580px) {
    .light-bulb {
        object-position: -400px;
    }
}

@media only screen and (max-width: 500px) {
    .light-bulb {
        object-position: -450px;
    }
}

@media only screen and (max-width: 450px) {
    .light-bulb {
        object-position: -450px;
    }
}
</style>
