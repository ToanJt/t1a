<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useRouter } from 'vue-router';
import { defineProps, onMounted, reactive, ref } from 'vue';
import slugify from 'slugify';
import { db } from '../firebaseConfig'
import { collection, getDocs, query } from 'firebase/firestore';
import { onTop } from '../functions/functions';

const projectDetails = reactive({
    name: '',
    largeURL: '',
    thumbnailURL: '',
    widthOrigin: '',
    heightOrigin: '',
    description: '',
    client: '',
    year: '',
    type: '',
    size: '',
    images: <string[]>([]),
});
const router = useRouter();
const props = defineProps({
    id: String
})
const isExistsProject = ref(false);

function goBack() {
    router.back();
}
onMounted(async () => {
    const q = query(collection(db, "projects"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        if (slugify(doc.data().name) === props.id) {
            isExistsProject.value = true;
            projectDetails.name = doc.data().name;
            projectDetails.largeURL = doc.data().largeURL;
            projectDetails.thumbnailURL = doc.data().thumbnailURL;
            projectDetails.widthOrigin = doc.data().widthOrigin;
            projectDetails.heightOrigin = doc.data().heightOrigin;
            projectDetails.description = doc.data().description;
            projectDetails.client = doc.data().client;
            projectDetails.year = doc.data().year;
            projectDetails.type = doc.data().type;
            projectDetails.size = doc.data().size;
            doc.data().images.forEach((img: string) => {
                projectDetails.images.push(img);
            })
        }
    })
    if (isExistsProject.value == false) {
        router.push("/404")
    }
    onTop('instant');
})

function getUrl() {
    const url = window.location.href;
    navigator.clipboard.writeText(url)
    return url;
}

</script>

<template>
    <div class="w-screen">
        <div class="lg:pb-40 sm:pb-20 pb-16 lg:pt-60 md:pt-52 pt-36 container mx-auto px-4">
            <h1 class="md:text-6xl sm:text-5xl text-4xl sofia-medium">{{ projectDetails.name }}</h1>
            <div class="flex mt-16">
                <div class="mr-16">
                    <p class="md:text-xl text-base sofia-medium mb-3">Client:</p>
                    <p class="md:text-xl text-base sofia-medium mb-3">Year:</p>
                    <p class="md:text-xl text-base sofia-medium mb-3">Size:</p>
                    <p class="md:text-xl text-base sofia-medium mb-3">Description:</p>
                </div>
                <div>
                    <p class="md:text-lg text-sm sofia-light mb-3 text-[#727272]">{{ projectDetails.client }}</p>
                    <p class="md:text-lg text-sm sofia-light mb-3 text-[#727272]">{{ projectDetails.year }}</p>
                    <p class="md:text-lg text-sm sofia-light mb-3 text-[#727272]">{{ projectDetails.size }}</p>
                    <p class="md:text-lg text-sm sm:text-left text-justify sofia-light mb-3 text-[#727272]">{{
                        projectDetails.description }}</p>
                </div>
            </div>
            <ul class="flex gap-6 text-2xl pt-8 pb-6">
                <Icon class="hoverable cursor-pointer hover:text-blue-600 transition-all" icon="ic:baseline-facebook"
                    width="1em" height="1em" />
                <Icon class="hoverable cursor-pointer hover:text-green-600 transition-all" icon="ic:baseline-whatsapp"
                    width="1em" height="1em" />
                <Icon class="hoverable cursor-pointer hover:text-pink-600 transition-all" icon="dashicons:instagram"
                    width="1em" height="1em" />
                <div class="flex cursor-pointer relative copyLink">
                    <i @click="getUrl()" class="text-sm fa-solid fa-link"></i>
                    <div
                        class="absolute transition-opacity duration-500 bottom-6 w-10 h-4 bg-vr-light-gray rounded-full flex items-center justify-center">
                        <p class="text-[8px]">copy link</p>
                    </div>
                </div>
            </ul>

            <div class="lg:mt-20 mt-16 grid lg:gap-20 md:gap-16 sm:gap-10 gap-8">
                <img v-for="(image, index) in projectDetails.images" :key="index" loading="lazy" :src="image" alt="">
            </div>
            <div class="flex">
                <div @click="goBack()"
                    class="flex items-center gap-2 lg:mt-16 md:mt-12 mt-8 hover:text-red-500 transition-colors duration-500 cursor-pointer">
                    <i class="text-xl fa-solid fa-arrow-left-long"></i>
                    <p class="sofia-pro">Prev Projects</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.copyLink div {
    opacity: 0;
}

.copyLink:hover div {
    opacity: 1;
}
</style>