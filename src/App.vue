<script setup lang="ts">
import { gsap } from "gsap";
import Header from "../src/components/Header.vue";
import Footer from "../src/components/Footer.vue";
import { onMounted } from "vue";
import { RouterView } from "vue-router";
import LazyLoading from "./components/LazyLoading.vue";

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
})
</script>

<template>
  <div>
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
    <LazyLoading>
      <RouterView></RouterView>
    </LazyLoading>
    <Footer></Footer>
  </div>
</template>
