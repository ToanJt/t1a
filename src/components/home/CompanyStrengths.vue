<script setup lang="ts">
import { Icon } from "@iconify/vue"
</script>

<template>
    <section class="bg-vr-light-gray">
        <div class=" mx-auto container lg:pt-24 pt-16 md:pb-10 pb-6 px-4">
            <div class="flex flex-col items-center lg:mb-24 sm:mb-16 mb-8">
                <p class="uppercase sofia-pro sm:text-15 text-[13px] tracking-widest sm:mb-5 mb-2">Company Strengths</p>
                <h1 class="xl:text-6xl lg:text-5xl sm:text-4xl text-2xl text-center sofia-medium">Our Core Strengths
                    Driving Success
                </h1>
            </div>
            <div class="grid lg:grid-cols-3 md:grid-cols-2 xl:mx-20 grid-cols-1 gap-6">
                <div class="flex flex-col items-center xl:pt-20 pt-16 px-8 pb-10 bg-white border border-solid">
                    <Icon icon="mdi:power" class="xl:text-7xl text-6xl" style="color: red" />
                    <div class="xl:mt-8 mt-5 text-center ">
                        <h1 class="font-heading xl:text-28 text-xl mb-3">6 years of Expericence</h1>
                        <div class="font-europa-light">
                            <p class="xl:text-base text-sm xl:mb-5 mb-3">With successful deliveries of 3D Still Image
                                for Home
                                projects in
                                American,
                                Australia...</p>
                            <p class="xl:text-base text-sm">Produced by creative communicators with great expertise in
                                Design, we know which tools
                                can
                                outstanding the Home and excite your client, whether it is a single-family home or
                                Apartment
                                building</p>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col items-center xl:pt-20 pt-16 px-8 pb-10 bg-white border border-solid">
                    <Icon icon="entypo:price-ribbon" class="xl:text-7xl text-6xl" style="color: red" />
                    <div class="xl:mt-8 mt-5 text-center ">
                        <h1 class="font-heading xl:text-28 text-xl mb-3">Completitive price</h1>
                        <div class="font-europa-light">
                            <p class="xl:text-base text-sm xl:mb-5 mb-3">We live in Vietnam, a country famous for its
                                abundant labor force, good
                                prices and is currently the place where the world's largest technology companies have
                                their factories located after China.</p>
                            <p class="xl:text-base text-sm">So If you work directly with us, you're getting the original
                                "Factory" Price!</p>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col items-center xl:pt-20 pt-16 px-8 pb-10 bg-white border border-solid">
                    <Icon icon="mdi:clock-outline" class="xl:text-7xl text-6xl" style="color: red" />
                    <div class="xl:mt-8 mt-5 text-center ">
                        <h1 class="font-heading xl:text-28 text-xl mb-3">Great Communication</h1>
                        <div class="font-europa-light">
                            <p class="xl:text-base text-sm xl:mb-5 mb-3">Some Architects were afraid of Outsourcing
                                because the communication method
                                is complicated and prolonging project time..</p>
                            <p class="xl:text-base text-sm">Problems resolved by our dedicated project management team
                                who are there 24/7 to discuss
                                with you as soon as you need.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>