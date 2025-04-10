<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Navigation, Pagination } from 'swiper/modules'
import { getDocs, collection, DocumentData } from 'firebase/firestore'
import { db } from '../../firebaseConfig'

const swiperInstance = ref();
const module = [Navigation, Pagination];
const feedbacks = ref<DocumentData[]>([]);

const onSwiper = (swiper: any) => {
    swiperInstance.value = swiper;
}

const nextSlide = () => {
    swiperInstance.value.slideNext();
}

onMounted(async () => {
    const getFeedbacks = await getDocs(collection(db, 'feedbacks'));
    getFeedbacks.forEach((feedback) => {
        feedbacks.value.push(feedback.data());
    })
    setInterval(() => {
        nextSlide();
    }, 15000)
})
</script>

<template>
    <section class="bg-black  text-white">
        <div class="container mx-auto overflow-hidden px-4 pt-24 2xl:px-24 pb-16">
            <h1 class="2xl:text-6xl lg:text-5xl text-4xl sofia-medium uppercase">Endorsements</h1>
            <Swiper :speed="800" center class="sm:w-auto gap-4 w-[calc(100vw-2rem)] container mx-auto" pagination loop
                :modules="module" @swiper="onSwiper">
                <SwiperSlide class="sm:pr-0 ssm:pr-8 pr-0" v-for="feedback in feedbacks">
                    <div class="relative grid sm:grid-cols-3 grid-cols-1 lg:gap-12 gap-2 2xl:mt-24 lg:mt-16 mt-8">
                        <div class=" flex items-start">
                            <img class="sm:w-auto w-[calc(100%-2rem)] h-full object-cover col-span-1 rounded-3xl opacity-85"
                                :src="feedback.avatar" loading="lazy" alt="avatar">
                        </div>
                        <div class="sm:col-span-2 my-6 lg:pr-20 pr-4">
                            <div class="font-[poppins] lg:mb-16 mb-8 font-light">
                                <i class="2xl:text-6xl lg:text-5xl text-4xl mb-2 fa-solid fa-quote-right"></i>
                                <p class="mb-6 sm:text-left text-justify lg:text-15 md:text-[13px] text-[11px]">
                                    {{ feedback.content1 }}
                                </p>
                                <p v-if="feedback.content2"
                                    class="mb-6 sm:text-left text-justify lg:text-15 md:text-[13px] text-[11px]">
                                    {{ feedback.content2 }}
                                </p>
                                <p v-if="feedback.content3"
                                    class="lg:text-15 sm:text-left text-justify md:text-[13px] text-[11px]">
                                    {{ feedback.content3 }}
                                </p>
                            </div>
                            <div class="font-[poppins] font-light">
                                <p class=" lg:text-15 md:text-[13px] text-[11px] text-red-500 font-medium mb-1">{{
                                    feedback.customerName }}
                                </p>
                                <p class=" lg:text-15 md:text-[13px] text-[11px]">{{
                                    feedback.from }}</p>
                            </div>
                        </div>

                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    </section>
</template>


<style>
.swiper-pagination-bullet {
    width: 8px;
    height: 8px;
    background: transparent;
    border: 1px solid rgb(255, 255, 255);
    opacity: 1;
}

.swiper-pagination-bullet-active {
    width: 40px;
    transition: width .5s;
    border-radius: 5px;
    background: rgb(255, 255, 255);
    border: 1px solid transparent;
}
</style>