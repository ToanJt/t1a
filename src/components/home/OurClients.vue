<template>
    <main class=" mx-auto container sm:px-4 px-0 lg:pb-24 pb-10 lg:mt-24 mt-16">
        <section v-motion :initial="{
            opacity: 0,
            scale: 0.6,
            y: -50,
        }" :visibleOnce="{
            opacity: 1,
            scale: 1,
            y: 0,
        }" class="slide_global-network space-components">
            <div class="flex flex-col items-center lg:mb-24 sm:mb-16 mb-8">
                <p class="uppercase text-center sofia-pro sm:text-15 text-[13px] tracking-widest sm:mb-5 mb-2">With over
                    45
                    clients and 500
                    completed
                    projects</p>
                <h1 class="2xl:text-6xl lg:text-5xl sm:text-4xl text-2xl text-center sofia-medium">Our Featured Clients
                </h1>
            </div>
            <div class="slide container !w-screen mx-auto">
                <div class="slide-decoration-left"></div>
                <div class="globaln_img">
                    <img class="lg:h-12 md:h-8 sm:h-10 h-8 w-48" src="../../assets/images/logo2.png" alt="">
                    <img class="lg:h-12 md:h-8 sm:h-10 h-8 w-48 " src="../../assets/images/logo4.png" alt="">
                    <img class="lg:h-12 md:h-8 sm:h-10 h-8 w-48 " src="../../assets/images/logo5.png" alt="">
                    <img class="lg:h-12 md:h-8 sm:h-10 h-8 w-48 " src="../../assets/images/logo6.png" alt="">
                    <img class="lg:h-12 md:h-8 sm:h-10 h-8 w-48 " src="../../assets/images/logo7.png" alt="">
                    <img class="lg:h-12 md:h-8 sm:h-10 h-8 w-48 " src="../../assets/images/logo2.png" alt="">
                    <img class="lg:h-12 md:h-8 sm:h-10 h-8 w-48 " src="../../assets/images/logo4.png" alt="">
                    <img class="lg:h-12 md:h-8 sm:h-10 h-8 w-48 " src="../../assets/images/logo5.png" alt="">
                    <img class="lg:h-12 md:h-8 sm:h-10 h-8 w-48 " src="../../assets/images/logo6.png" alt="">
                    <img class="lg:h-12 md:h-8 sm:h-10 h-8 w-48 " src="../../assets/images/logo7.png" alt="">
                </div>
                <div class="slide-decoration-right"></div>
            </div>
        </section>
    </main>
</template>

<style scoped>
.slide_global-network {
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: all 1.5s;
}


.slide {
    display: flex;
    flex-direction: row;
    width: 100%;
    padding: 0 4rem;
    overflow: hidden;
    position: relative;
}

.slide-decoration-left,
.slide-decoration-right {
    z-index: 1;
    width: 100px;
    height: 50px;
    background-image: linear-gradient(to right, #fff 23%, rgba(255, 255, 255, 0));
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}

.slide-decoration-right {
    background-image: linear-gradient(270deg, #fff 23%, rgba(255, 255, 255, 0));
    left: auto;
}

.globaln_img {
    display: flex;
    width: calc(192px * 10);
    animation: scroll 3s linear infinite;
    will-change: transform;
}

.slide_global-network img {
    margin-left: 6rem;
    height: 2.5rem;
}

@keyframes scroll {
    0% {
        transform: translateX(0);
    }

    100% {
        transform: translateX(calc(-238px * 5))
    }
}

/* 
@media only screen and (max-width: 1340px) {
    .slide {
        max-width: 62rem;
    }
}

@media only screen and (max-width: 972px) {
    .slide {
        max-width: 52rem;
    }

    .slide_global-network img {
        height: 2rem;
    }

}

@media only screen and (max-width: 820px) {
    .slide {
        max-width: 100%;
    }

}

@media only screen and (max-width: 640px) {
    .slide {
        max-width: 100%;
    }

    .slide_global-network img {
        height: 1.5rem;
        margin-left: 2rem;
    }

    .space-components {
        margin-bottom: 5rem;
    }
} */
</style>