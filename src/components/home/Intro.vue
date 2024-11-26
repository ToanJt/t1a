<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { onMounted, ref } from 'vue';
import { gsap } from 'gsap';
import 'swiper/css';
import { collection, DocumentData, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import Splitting from "splitting";

const swiperInstance = ref();
const backgrounds = ref<DocumentData[]>([]);

function animateSlide(swiper: any) {
    const currentIndex = swiper.activeIndex;
    Splitting();

    // Animate the current and previous slides
    gsap.from(swiper.slides[currentIndex].querySelectorAll('.word'), {
        y: -150,
        opacity: 0,
        stagger: 0.05,
    });
    gsap.to(swiper.slides[currentIndex].querySelectorAll('.word'), {
        y: 0,
        opacity: 1,
        stagger: 0.05,
        duration: 0.5,
    });
    gsap.from(swiper.slides[currentIndex].querySelectorAll('p'), {
        y: -150,
        opacity: 0,
        stagger: 0.25,
    })
    gsap.to(swiper.slides[currentIndex].querySelectorAll('p'), {
        y: 0,
        opacity: 1,
        stagger: 0.25,
        duration: 1,
    });
}

const onSwiper = (swiper: any) => {
    swiperInstance.value = swiper;
    swiper.on("slideNextTransitionStart", () => {
        animateSlide(swiper)
    });
    swiper.on("slidePrevTransitionStart", () => {
        animateSlide(swiper)
    });
}

const nextSlide = () => {
    swiperInstance.value.slideNext();
}

onMounted(async () => {
    const getBackgrounds = await getDocs(collection(db, 'backgrounds'));
    getBackgrounds.forEach((background) => {
        backgrounds.value.push(background.data());
    })
    setInterval(() => {
        nextSlide();
    }, 15000)
});

</script>


<template>
    <section class="w-screen">
        <Swiper @swiper="onSwiper" :speed="800" :slides-per-view="1" loop>
            <SwiperSlide v-for="background in backgrounds">
                <div>
                    <div class="relative bg-black text-white">
                        <img class="w-screen h-screen object-cover opacity-25" :src="background.image" alt="">

                        <div
                            class=" absolute mx-auto px-4 flex flex-col justify-center items-start 2xl:pr-80 lg:pr-40 sm:pr-32 pr-10 top-0 left-0 right-0 bottom-0 container ">

                            <h1 data-splitting
                                class=" sofia-medium 2xl:text-7xl lg:text-5xl sm:text-4xl text-2xl leading-tight mb-10">
                                {{
                                    background.title }}
                            </h1>
                            <p
                                class=" sm:text-left text-justify 2xl:text-[1rem] lg:text-[15px] sm:text-[14px] text-[12px] mb-4">
                                {{
                                    background.content1
                                }}</p>
                            <p v-if="background.content2"
                                class=" sm:text-left text-justify 2xl:text-[1rem] lg:text-[15px] sm:text-[14px] text-[12px] mb-4">
                                {{
                                    background.content2
                                }}
                            </p>
                            <p v-if="background.content3"
                                class=" sm:text-left text-justify 2xl:text-[1rem] lg:text-[15px] sm:text-[14px] text-[12px]">
                                {{
                                    background.content3 }}
                            </p>
                            <router-link to="/projects">
                                <button
                                    class="gsap-button hoverable flex items-center gap-1 2xl:mt-20 mt-16 align-middle select-none sofia-bold font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none 2xl:text-xs md:text-[12px] text-[10px] md:py-3 py-2 lg:px-6 md:px-5 px-4 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                                    type="button" data-ripple-light="true">
                                    See Project <span>
                                        <Icon class=" md:text-lg text-base" icon="mingcute:right-fill"
                                            style="color: white" />
                                    </span></button>
                            </router-link>
                        </div>
                    </div>
                </div>
            </SwiperSlide>
        </Swiper>
    </section>
</template>

<style scoped>
.char {
    transform: translateY(115px);
    transition: transform 0.5s;
}
</style>