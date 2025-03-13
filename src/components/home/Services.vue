<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import gsap from 'gsap';

const button = ref<HTMLElement | null>(null);

onMounted(() => {
    if (button.value) {
        const btn = button.value;
        let boundingRect = btn.getBoundingClientRect();

        window.addEventListener('resize', () => {
            boundingRect = btn.getBoundingClientRect();
        });

        btn.addEventListener('mousemove', (e) => {
            const mousePosX = e.clientX - boundingRect.left;
            const mousePosY = e.clientY - boundingRect.top;

            const maxMove = 20;
            const moveX = Math.min(Math.max((mousePosX - boundingRect.width / 3) * 0.8, -maxMove), maxMove);
            const moveY = Math.min(Math.max((mousePosY - boundingRect.height / 3) * 0.8, -maxMove), maxMove);

            gsap.to(btn, {
                x: moveX,
                y: moveY,
                duration: 0.8,
                ease: 'power3.out',
            });
        });

        // Mouseleave event to reset the button position
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.8,
                ease: 'elastic.out(1,0.3)',
            });
        });
    }
});
</script>

<template>
    <section class="bg-vr-light-gray lg:pt-24 pt-16 pb-24">
        <section class=" mx-auto px-24">
            <div class=" 2xl:mx-20  grid-cols-1 md:gap-10 gap-6">
                <div class="flex justify-center lg:mb-8 sm:mb-8 mb-8">
                    <h1 class="2xl:text-6xl lg:text-5xl sm:text-4xl text-2xl text-center sofia-medium">What we offer
                    </h1>
                </div>

                <div class="grid grid-cols-4 gap-3 ">
                    <div class="flex  flex-col items-center gap-6">
                        <div class="rounded-lg h-full overflow-hidden service-box relative">
                            <img class=" w-full h-full rounded-lg sm:opacity-100 sm:static absolute object-cover"
                                src="../../assets/images/exterior-min.jpg" alt="">
                            <div
                                class=" rounded-lg  transition-all cursor-pointer duration-300 absolute z-90 flex opacity-100 justify-center items-center top-0 left-0 right-0 bottom-0">
                                <div>
                                    <div class="rounded-lg  absolute top-0 left-0 right-0 bottom-0 bg-black opacity-60">
                                    </div>
                                    <div
                                        class="absolute z-90  flex flex-col justify-center items-center top-0  left-0 right-0 bottom-0">
                                        <p class="service-text text-xl uppercase text-white mb-2">
                                            Exterior
                                            Rendering
                                        </p>
                                        <div
                                            class="btn px-5 py-1 rounded opacity-80 hover:opacity-100 transition-opacity">
                                            <p class=" uppercase text-[10px] font-heading text-white">See More</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="flex  flex-col items-center gap-6">
                        <div class="rounded-lg h-full overflow-hidden service-box relative">
                            <img class=" w-full h-full rounded-lg sm:opacity-100 sm:static absolute object-cover"
                                src="../../assets/images/pov5-min.jpg" alt="">
                            <div
                                class=" rounded-lg  transition-all cursor-pointer duration-300 absolute z-90 flex opacity-100 justify-center items-center top-0 left-0 right-0 bottom-0">
                                <div>
                                    <div class="rounded-lg  absolute top-0 left-0 right-0 bottom-0 bg-black opacity-60">
                                    </div>
                                    <div
                                        class="absolute z-90  flex flex-col justify-center items-center top-0  left-0 right-0 bottom-0">
                                        <p class="service-text text-xl uppercase text-white mb-2">
                                            Interior
                                            Rendering
                                        </p>
                                        <div
                                            class="btn px-5 py-1 rounded opacity-80 hover:opacity-100 transition-opacity">
                                            <p class=" uppercase text-[10px] font-heading text-white">See More</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- <button class="" ref="button">
                                <i class="fa-solid fa-link"></i>
                            </button> -->
                        </div>
                        <!--  -->

                    </div>
                    <div class="flex  flex-col items-center gap-6">
                        <div class="rounded-lg h-full overflow-hidden service-box relative">
                            <img class=" w-full h-full rounded-lg sm:opacity-100 sm:static absolute object-cover"
                                src="../../assets/images/POV3_OPTIONAL-min.jpg" alt="">
                            <div
                                class=" rounded-lg  transition-all cursor-pointer duration-300 absolute z-90 flex opacity-100 justify-center items-center top-0 left-0 right-0 bottom-0">
                                <div>
                                    <div class="rounded-lg  absolute top-0 left-0 right-0 bottom-0 bg-black opacity-60">
                                    </div>
                                    <div
                                        class="absolute z-90  flex flex-col justify-center items-center top-0  left-0 right-0 bottom-0">
                                        <p class="service-text text-xl uppercase text-white mb-2">
                                            360°
                                            Rendering
                                        </p>
                                        <div
                                            class="btn px-5 py-1 rounded opacity-80 hover:opacity-100 transition-opacity">
                                            <p class=" uppercase text-[10px] font-heading text-white">See More</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- <button class="" ref="button">
                                <i class="fa-solid fa-link"></i>
                            </button> -->
                        </div>
                        <!--  -->

                    </div>
                    <div class="flex  flex-col items-center gap-6">
                        <div class="rounded-lg h-full overflow-hidden service-box relative">
                            <img class=" w-full h-full rounded-lg sm:opacity-100 sm:static absolute object-cover"
                                src="../../assets/images/POV2-min.jpg" alt="">
                            <div
                                class=" rounded-lg  transition-all cursor-pointer duration-300 absolute z-90 flex opacity-100 justify-center items-center top-0 left-0 right-0 bottom-0">
                                <div>
                                    <div class="rounded-lg  absolute top-0 left-0 right-0 bottom-0 bg-black opacity-60">
                                    </div>
                                    <div
                                        class="absolute z-90 flex flex-col justify-center items-center top-0  left-0 right-0 bottom-0">
                                        <p class="service-text text-xl uppercase text-white mb-2">
                                            Animation
                                        </p>
                                        <div
                                            class="btn px-5 py-1 rounded opacity-80 hover:opacity-100 transition-opacity">
                                            <p class=" uppercase text-[10px] font-heading text-white">See More</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>


    </section>
</template>

<style scoped>
.card:hover img {
    opacity: 0.2 !important;
}

.viewhover:hover p {
    color: white;
}

@media screen and (max-width: 640px) {
    .viewhover p {
        color: white;
    }
}

.button {
    padding: 20px;
}

button {
    font-weight: 600;
    font-family: 'Syne', sans-serif;
    cursor: pointer;
    color: white;
    outline: none;
    border: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(8px);
    width: 80px;
    height: 80px;
    border-radius: 100%;
}

.service-box:hover .blur-box {
    opacity: 0 !important;
}

.service-box img {
    scale: 1;
    transition: 0.5s linear all;
}

.service-box:hover img {
    scale: 1.25;
}

.service-box .btn {
    transition: 0.3s linear all;
}

.service-box:hover .btn {
    transition: 0.3s linear all;
    background: #f15e22;
}
</style>
