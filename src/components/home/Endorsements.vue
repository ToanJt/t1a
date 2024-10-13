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
    <section class="bg-black text-white">
        <div class="w-1286 ml-96 pt-24 pb-16">
            <h1 class="text-6xl sofia-medium uppercase">Endorsements</h1>
            <Swiper pagination loop :modules="module" @swiper="onSwiper">
                <SwiperSlide v-for="feedback in feedbacks">
                    <div class="relative grid grid-cols-3 gap-12 mt-24">
                        <div class="pr-4 flex items-center">
                            <img class=" max-h-[900px] object-cover col-span-1 rounded-3xl opacity-85"
                                :srcset="`${feedback.avatar}?w=400 400w, ${feedback.avatar}?w=800 800w, ${feedback.avatar}?w=1200 1200w`"
                                sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1200px"
                                v-lazy="feedback.avatar" loading="lazy" alt="avatar">
                        </div>
                        <div class="col-span-2 my-6 pr-20">
                            <div class="font-[poppins] mb-16 font-light">
                                <i class="text-6xl mb-2 fa-solid fa-quote-right"></i>
                                <p class="mb-6 text-[16px]">
                                    {{ feedback.content1 }}
                                </p>
                                <p v-if="feedback.content2" class="mb-6 text-[16px]">
                                    {{ feedback.content2 }}
                                </p>
                                <p v-if="feedback.content3" class="text-[16px]">
                                    {{ feedback.content3 }}
                                </p>
                            </div>
                            <div class="font-[poppins] font-light">
                                <p class=" text-[16px] text-red-500 font-medium mb-1">{{ feedback.customerName }}
                                </p>
                                <p class=" text-[16px]">Construction company in {{ feedback.from }}</p>
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