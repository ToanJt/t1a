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
    <section class="bg-vr-light-gray md:pb-10 pb-6">
        <section class="container mx-auto px-4">
            <div class="lg:mb-24 mb-10 2xl:mx-20  grid-cols-1 md:gap-10 gap-6">
                <h1 class="uppercase 2xl:text-28 text-xl mb-5">What we offer</h1>
                <div class="grid grid-cols-3 gap-6 ">
                    <div class="flex  flex-col items-center gap-6">
                        <div class=" service-box relative">
                            <img class=" w-full h-full sm:opacity-100 sm:static absolute object-cover"
                                src="../../assets/images/Exterior-Services.jpg" alt="">
                            <div
                                class="blur-box transition-all cursor-pointer duration-300 absolute z-90 flex opacity-0 justify-center items-center top-0 left-0 right-0 bottom-0">
                                <div class=" absolute top-0 left-0 right-0 bottom-0 bg-black opacity-60">
                                </div>

                            </div>
                            <!-- <button class="" ref="button">
                                <i class="fa-solid fa-link"></i>
                            </button> -->
                        </div>
                        <p class="service-text  text-xl uppercase">
                            Exterior
                            Rendering
                        </p>

                    </div>
                    <div class="flex flex-col items-center gap-6">
                        <div class=" service-box relative">
                            <img class=" w-full h-full sm:opacity-100 sm:static absolute object-cover"
                                src="../../assets/images/Interior-Services.jpg" alt="">
                            <div
                                class="blur-box transition-all cursor-pointer duration-300 absolute z-90 flex opacity-0 justify-center items-center top-0 left-0 right-0 bottom-0">
                                <div class=" absolute top-0 left-0 right-0 bottom-0 bg-black opacity-60">
                                </div>

                            </div>
                        </div>
                        <p class="text-xl uppercase">Interior Rendering</p>
                    </div>
                    <div class="flex flex-col items-center gap-6">
                        <div class=" service-box relative">
                            <img class=" w-full h-full sm:opacity-100 sm:static absolute object-cover"
                                src="../../assets/images/Interior-Services.jpg" alt="">
                            <div
                                class="blur-box transition-all cursor-pointer duration-300 absolute z-90 flex opacity-0 justify-center items-center top-0 left-0 right-0 bottom-0">
                                <div class=" absolute top-0 left-0 right-0 bottom-0 bg-black opacity-60">
                                </div>

                            </div>
                        </div>
                        <p class="text-xl uppercase">360 Rendering</p>
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
    opacity: 100 !important;
}
</style>
