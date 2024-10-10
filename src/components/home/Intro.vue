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
                        <img class="w-screen h-screen opacity-15" :src="background.image" alt="">
                        <div
                            class=" absolute mx-auto flex flex-col justify-center items-start top-0 left-0 right-0 bottom-0 w-1286 ">
                            <h1 class="gsap-heading sofia-medium text-7xl leading-tight mb-10">{{ background.title }}
                            </h1>
                            <p class="gsap-text1 font-text mb-4">{{ background.content1 }}</p>
                            <p v-if="background.content2" class="gsap-text2 font-text mb-4">{{ background.content2 }}
                            </p>
                            <p v-if="background.content3" class="gsap-text3 font-text">{{ background.content3 }}</p>
                            <button
                                class="gsap-button hoverable flex items-center gap-1 mt-20 align-middle select-none sofia-bold font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                                type="button" data-ripple-light="true">
                                See Project <span>
                                    <Icon icon="mingcute:right-fill" width="1.5em" height="1.5em"
                                        style="color: white" />
                                </span></button>

                        </div>
                    </div>
                </div>
            </SwiperSlide>
        </Swiper>
    </section>
</template>