<template>
    <section class="bg-vr-light-gray md:pb-10 pb-6">
        <section class="container mx-auto px-4">
            <div class="lg:mb-24 mb-10 2xl:mx-20 grid grid-rows-3 grid-cols-1 md:gap-10 gap-6">
                <div class=" flex relative h-full gap-6">
                    <img class="2xl:w-[380px] lg:w-[320px] sm:w-[300px] w-full h-full sm:opacity-100 opacity-20 sm:static absolute object-cover"
                        src="../../assets/images/Exterior-Services.jpg" alt="">
                    <div
                        class="sm:bg-white bg-black h-full flex flex-col items-start justify-between p-8 border border-solid ">
                        <div>
                            <p class="2xl:text-28 text-xl">01.</p>
                            <div class="sm:text-black text-white">
                                <h1 class="uppercase 2xl:text-28 text-xl font-heading mb-6">Exterior</h1>
                                <p class="2xl:text-base text-sm opacity-[68%]">Always pay attention to the reality of
                                    the
                                    enviroment
                                    surrounding Each
                                    project, from the
                                    Landscape,flora , tree, roads,..etc and recreate it as accurately as possible.</p>
                            </div>
                        </div>
                        <button
                            class="lg:mt-0 mt-5 viewhover hover:bg-black hover:text-white hover:scale-[0.9] transition-all duration-500 border-2 border-solid sm:border-black border-white md:p-3 p-2">
                            <p class="">View Service</p>
                        </button>
                    </div>
                </div>
                <div class=" flex relative h-full gap-6">
                    <img class="2xl:w-[380px] lg:w-[320px] sm:w-[300px] w-full h-full sm:opacity-100 opacity-20 sm:static absolute object-cover"
                        src="../../assets/images/Interior-Services.jpg" alt="">
                    <div
                        class="sm:bg-white bg-black h-full flex flex-col items-start justify-between p-8 border border-solid ">
                        <div>
                            <p class="2xl:text-28 text-xl">02.</p>
                            <div class="sm:text-black text-white">
                                <h1 class="uppercase 2xl:text-28 text-xl font-heading mb-6">Interior</h1>
                                <p class="2xl:text-base text-sm opacity-[68%]">Always pay attention to the reality of
                                    the
                                    enviroment
                                    surrounding Each
                                    project, from the
                                    Landscape,flora , tree, roads,..etc and recreate it as accurately as possible.</p>
                            </div>
                        </div>
                        <button
                            class="lg:mt-0 mt-5 viewhover hover:bg-black hover:text-white hover:scale-[0.9] transition-all duration-500 border-2 border-solid sm:border-black border-white md:p-3 p-2">
                            <p class="">View Service</p>
                        </button>
                    </div>
                </div>
                <div class=" flex relative h-full gap-6">
                    <img class="2xl:w-[380px] lg:w-[320px] sm:w-[300px] w-full h-full sm:opacity-100 opacity-20 sm:static absolute object-cover"
                        src="../../assets/images/interior.jpg" alt="">
                    <div
                        class="sm:bg-white bg-black h-full flex flex-col items-start justify-between p-8 border border-solid ">
                        <div>
                            <p class="2xl:text-28 text-xl">03.</p>
                            <div class="sm:text-black text-white">
                                <h1 class="uppercase 2xl:text-28 text-xl font-heading mb-6">Interior Design</h1>
                                <p class="2xl:text-base text-sm opacity-[68%]">Always pay attention to the reality of
                                    the
                                    enviroment
                                    surrounding Each
                                    project, from the
                                    Landscape,flora , tree, roads,..etc and recreate it as accurately as possible.</p>
                            </div>
                        </div>
                        <button
                            class="lg:mt-0 mt-5 viewhover hover:bg-black hover:text-white hover:scale-[0.9] transition-all duration-500 border-2 border-solid sm:border-black border-white md:p-3 p-2">
                            <p class="">View Service</p>
                        </button>
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
</style>