<script setup lang="ts">
import { gsap } from "gsap";
import Header from "../src/components/Header.vue";
// import Footer from "../src/components/Footer.vue";
import { onMounted, ref, watch } from "vue";
import { RouterView } from "vue-router";
import PreLoader from "./components/PreLoader.vue";
import { useRoute } from "vue-router";

onMounted(() => {
  const $bigBall = document.querySelector(".cursor__ball--big");
  const $smallBall = document.querySelector(".cursor__ball--small");
  const $hoverables = document.querySelectorAll(".hoverable");
  document.body.addEventListener("mousemove", onMouseMove);
  for (let i = 0; i < $hoverables.length; i++) {
    $hoverables[i].addEventListener("mouseenter", onMouseHover);
    $hoverables[i].addEventListener("mouseleave", onMouseHoverOut);
  }
  function onMouseMove(e: any) {
    gsap.to($bigBall, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.4,
    });
    gsap.to($smallBall, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.1,
    });
  }
  function onMouseHover() {
    gsap.to($bigBall, {
      scale: 3,
      duration: 0.3,
    });
  }
  function onMouseHoverOut() {
    gsap.to($bigBall, {
      scale: 1,
      duration: 0.3,
    });
  }
  startLoading();
})

const route = useRoute();
const isLoading = ref(true);
const startLoading = () => {
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
  }, 1500)
}

watch(route,
  () => {
    startLoading();
  })

</script>

<template>
  <div class="">
    <div class="cursor">
      <div class="cursor__ball cursor__ball--big fixed">
        <svg height="30" width="30">
          <circle cx="15" cy="15" r="12" stroke-width="0"></circle>
        </svg>
      </div>
      <div class="cursor__ball cursor__ball--small fixed">
        <svg height="10" width="10">
          <circle cx="5" cy="5" r="4" stroke-width="0"></circle>
        </svg>
      </div>
    </div>
    <Header></Header>
    <RouterView v-slot="{ Component, route }">
      <PreLoader :class="{ 'hidden-preloader': !isLoading }">
      </PreLoader>
      <component :is="Component" :key="route.path">
      </component>
    </RouterView>
    <!-- <Footer></Footer> -->
  </div>
</template>

<style>
.hidden-preloader {
  display: none;
  transition: all .3s linear;
}
</style>