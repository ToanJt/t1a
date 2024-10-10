<script setup lang="ts">
import { Icon } from "@iconify/vue"
</script>

<template>
    <section class="bg-vr-light-gray">
        <div class="w-1286 mx-auto container pt-24 pb-10">
            <div class="flex flex-col items-center mb-24">
                <p class="uppercase sofia-pro text-15 tracking-widest mb-5">Company Strengths</p>
                <h1 class="text-6xl sofia-medium">Our Core Strengths Driving Success</h1>
            </div>
            <div class="grid grid-cols-3 gap-6">
                <div class="flex flex-col items-center pt-20 px-8 pb-10 bg-white border border-solid">
                    <Icon icon="mdi:power" width="5em" height="5em" style="color: red" />
                    <div class="mt-8 text-center ">
                        <h1 class="font-heading text-28 mb-3">6 years of Expericence</h1>
                        <div class="font-europa-light ">
                            <p class="mb-5">With successful deliveries of 3D Still Image for Home projects in
                                American,
                                Australia...</p>
                            <p>Produced by creative communicators with great expertise in Design, we know which tools
                                can
                                outstanding the Home and excite your client, whether it is a single-family home or
                                Apartment
                                building</p>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col items-center pt-20 px-8 pb-10 bg-white border border-solid">
                    <Icon icon="entypo:price-ribbon" width="5em" height="5em" style="color: red" />
                    <div class="mt-8 text-center ">
                        <h1 class="font-heading text-28 mb-3">Completitive price</h1>
                        <div class="font-europa-light">
                            <p class="mb-5 ">We live in Vietnam, a country famous for its abundant labor force, good
                                prices and is currently the place where the world's largest technology companies have
                                their factories located after China.</p>
                            <p>So If you work directly with us, you're getting the original "Factory" Price!</p>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col items-center pt-20 px-8 pb-10 bg-white border border-solid">
                    <Icon icon="mdi:clock-outline" width="5em" height="5em" style="color: red" />
                    <div class="mt-8 text-center ">
                        <h1 class="font-heading text-28 mb-3">Great Communication</h1>
                        <div class="font-europa-light">
                            <p class="mb-5 ">Some Architects were afraid of Outsourcing because the communication method
                                is complicated and prolonging project time..</p>
                            <p>Problems resolved by our dedicated project management team who are there 24/7 to discuss
                                with you as soon as you need.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>