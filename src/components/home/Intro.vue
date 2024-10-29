<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { onMounted, ref } from 'vue';
import gsap from 'gsap';
import 'swiper/css';
import { collection, DocumentData, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const swiperInstance = ref();
const backgrounds = ref<DocumentData[]>([]);
const onSwiper = (swiper: any) => {
    swiperInstance.value = swiper;
}

const nextSlide = () => {
    swiperInstance.value.slideNext();
    animationGsap();
}

// Hàm hiệu ứng xuất hiện của text với hiệu ứng chạy từ dưới lên
function animationGsap() {
    gsap.timeline({
        defaults: {
            duration: 1.5,
            ease: 'power4.out',
        }
    })
        .set([".gsap-heading", ".gsap-text1", ".gsap-text2", ".gsap-text3", ".gsap-button"], {
            y: 100, // Bắt đầu từ dưới
            opacity: 0, // Bắt đầu với độ mờ thấp
        })
        .to(".gsap-heading", {
            y: 0, // Di chuyển lên vị trí gốc
            opacity: 1, // Hiện ra hoàn toàn
            duration: 1.5,
            stagger: 0.2,
        })
        .to([".gsap-text1", ".gsap-text2", ".gsap-text3", ".gsap-button"], {
            y: 0,
            opacity: 1,
            duration: 1.5,
            stagger: 0.2,
        })
}

// Hàm hiệu ứng thoát ra với hiệu ứng chạy lên trên
function animationGsapExit(callback: any) {
    gsap.timeline({
        defaults: {
            ease: 'power4.inOut',
        },
        onComplete: callback
    })
        .to([".gsap-heading", ".gsap-text1", ".gsap-text2", ".gsap-text3"], {
            y: 100, // Di chuyển lên trên
            opacity: 0, // Làm mờ dần
            duration: 1.5,
        })
        .to(".gsap-button", {
            y: 100,
            opacity: 0,
            duration: 1.5,
        }, '-=1.5');
}


onMounted(async () => {
    const getBackgrounds = await getDocs(collection(db, 'backgrounds'));
    getBackgrounds.forEach((background) => {
        backgrounds.value.push(background.data());
    })
    animationGsap();
    setInterval(() => {
        // Gọi hiệu ứng thoát ra trước khi chuyển slide
        animationGsapExit(() => {
            nextSlide();
        });
    }, 30000);
});
</script>


<template>
    <section class="w-screen">
        <Swiper @swiper="onSwiper" :slides-per-view="1" loop>
            <SwiperSlide v-for="background in backgrounds">
                <div>
                    <div class="relative bg-black text-white">
                        <img class="w-screen h-screen object-cover opacity-15" :src="background.image" alt="">
                        <div
                            class=" absolute mx-auto px-4 flex flex-col justify-center items-start 2xl:pr-80 lg:pr-40 sm:pr-32 pr-10 top-0 left-0 right-0 bottom-0 container ">
                            <h1
                                class="gsap-heading sofia-medium 2xl:text-7xl lg:text-5xl sm:text-4xl text-2xl leading-tight mb-10">
                                {{
                                    background.title }}
                            </h1>
                            <p
                                class="gsap-text1 sm:text-left text-justify 2xl:text-[1rem] lg:text-[15px] sm:text-[14px] text-[12px] mb-4">
                                {{
                                    background.content1
                                }}</p>
                            <p v-if="background.content2"
                                class="gsap-text2 sm:text-left text-justify 2xl:text-[1rem] lg:text-[15px] sm:text-[14px] text-[12px] mb-4">
                                {{
                                    background.content2
                                }}
                            </p>
                            <p v-if="background.content3"
                                class="gsap-text3 sm:text-left text-justify 2xl:text-[1rem] lg:text-[15px] sm:text-[14px] text-[12px]">
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