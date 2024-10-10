<script lang="ts" setup>
import { onMounted, ref, computed } from 'vue';
import { Icon } from '@iconify/vue'
import slugify from 'slugify';
import { onTop, createGalleries, convertToImageData } from '../functions/functions';
import type { ImageData } from '../functions/interface';
import { db } from '../firebaseConfig'
import { getDocs, collection, DocumentData } from 'firebase/firestore';


const images = ref<ImageData[]>([]);
const projects = ref<DocumentData[]>([]);
const isActive = ref<Array<boolean>>([true, false, false, false, false, false, false]);
const currentOption = ref<number>(0);
const projectType = ref<string>('all');
const projectSize = ref<string>('');

onMounted(async () => {
    const projectsCollection = await getDocs(collection(db, 'projects'));
    projectsCollection.forEach((project) => {
        const projectData = project.data();
        const imageData = convertToImageData(projectData);
        images.value.push(imageData);

        projects.value.push(projectData);
    })
    onTop('instant');
})

// Hàm để chia các ảnh thành các cột
const columns = 3;
const galleries = computed<Array<Array<ImageData>>>(() => {
    const projectData: DocumentData[] = showProjectOption(currentOption.value);
    const imageDataArray: ImageData[] = projectData.map((docData) => convertToImageData(docData));
    return createGalleries(imageDataArray, columns);
});


function showProjectOption(params: number) {
    // All Project
    if (params === 0) {
        return projects.value;
    }
    // Type Project
    else if (params >= 1 && params < 4) {
        return projects.value.filter((item) => {
            return item.type === projectType.value;
        })
    }
    // Size Project
    else {
        return projects.value.filter((item) => {
            return item.size === projectSize.value;
        })
    }
}

function activeHandle(optionNumber: number) {
    switch (optionNumber) {
        case 0:
            isActive.value[0] = true;
            isActive.value[currentOption.value] = false;
            projectType.value = 'all';
            break;
        case 1:
            isActive.value[1] = true;
            isActive.value[currentOption.value] = false;
            projectType.value = 'full-project';
            break;
        case 2:
            isActive.value[2] = true;
            isActive.value[currentOption.value] = false;
            projectType.value = 'exterior';
            break;
        case 3:
            isActive.value[3] = true;
            isActive.value[currentOption.value] = false;
            projectType.value = 'interior';
            break;
        case 4:
            isActive.value[4] = true;
            isActive.value[currentOption.value] = false;
            projectSize.value = 'small';
            break;
        case 5:
            isActive.value[5] = true;
            isActive.value[currentOption.value] = false;
            projectSize.value = 'medium';
            break;
        case 6:
            isActive.value[6] = true;
            isActive.value[currentOption.value] = false;
            projectSize.value = 'large';
            break;
    }
    currentOption.value = optionNumber;
}
</script>

<template>
    <div>
        <div class="bg-black ">
            <div class="">
                <div class="w-screen relative h-[600px]  opacity-15 overflow-hidden ">
                    <img class="w-full bg-top test" src="../assets/images/projects-bg.jpg" alt="">
                </div>
                <div
                    class="w-1286 mx-auto absolute top-0 left-0 right-0 bottom-40 justify-center text-white flex flex-col items-start mb-24">
                    <h1 class="text-8xl sofia-medium uppercase mb-20">Portfolio</h1>
                    <p class="w-2/3">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tenetur ducimus,
                        perspiciatis nobis
                        cupiditate maxime deserunt? Qui error, quos rem placeat omnis quasi sit ratione vel voluptas
                        saepe
                        odit, ea aspernatur!</p>
                </div>
            </div>
        </div>
        <div class="bg-vr-light-gray">
            <div class="w-full mx-auto px-40 pt-24 pb-36">
                <div class="flex flex-col items-center">
                    <h1 class="text-6xl sofia-medium mb-5">Our Latest Articles & Resources</h1>
                    <p class="uppercase sofia-pro text-15 tracking-widest">
                        Design Matters: Exploring the Impact of Architecture on Our Lives</p>
                    <ul class="flex gap-12 text-2xl pb-6 mt-24 border-b border-solid uppercase text-zinc-500">
                        <li @click="activeHandle(0)" :class="{ 'activeOption': isActive[0] }"
                            class="hover:text-black transition-colors duration-500 cursor-pointer ">
                            All</li>
                        <li @click="activeHandle(1)" :class="{ 'activeOption': isActive[1] }"
                            class="hover:text-black transition-colors duration-500 cursor-pointer">Full Project</li>
                        <li @click="activeHandle(2)" :class="{ 'activeOption': isActive[2] }"
                            class="hover:text-black transition-colors duration-500 cursor-pointer">Exterior</li>
                        <li @click="activeHandle(3)" :class="{ 'activeOption': isActive[3] }"
                            class="hover:text-black transition-colors duration-500 cursor-pointer">Interior</li>
                        <li @click="activeHandle(4)" :class="{ 'activeOption': isActive[4] }"
                            class="hover:text-black transition-colors duration-500 cursor-pointer">Small</li>
                        <li @click="activeHandle(5)" :class="{ 'activeOption': isActive[5] }"
                            class="hover:text-black transition-colors duration-500 cursor-pointer">Medium</li>
                        <li @click="activeHandle(6)" :class="{ 'activeOption': isActive[6] }"
                            class="hover:text-black transition-colors duration-500 cursor-pointer">Large</li>
                    </ul>
                </div>
                <div class="grid grid-cols-3 gap-6 mt-20">
                    <div v-for="(column, index) in galleries" :key="index" class="column col-span-1 gallery">
                        <div class="relative project-image cursor-pointer overflow-hidden mb-6"
                            v-for="(image, key) in column" :key="key">
                            <router-link :to="{ name: 'project-details', params: { id: slugify(image.name) } }">
                                <img class=" transition-all duration-500" :src="image.thumbnailURL"
                                    :alt="image.description || undefined" />
                                <div
                                    class="project-description transition-all duration-500  text-white p-6 bg-vr-light-gray-blur flex flex-col justify-center items-center absolute top-0 left-0 right-0 bottom-0">
                                    <h1 class="text-2xl text-center mb-2">{{ image.name }}</h1>
                                    <div class="flex justify-center w-full">
                                        <p class="text-15 mx-2">Client: {{ image.client }}</p>
                                        <div class="flex items-center">
                                            <Icon icon="mdi:dot" width="1em" height="1em" style="color: white" />
                                        </div>
                                        <p class="text-15 mx-2">Year: {{ image.year
                                            }}</p>
                                        <div class="flex items-center">
                                            <Icon icon="mdi:dot" width="1em" height="1em" style="color: white" />
                                        </div>
                                        <p class="text-15 mx-2">{{ image.type }}</p>
                                    </div>
                                </div>
                            </router-link>
                        </div>
                    </div>
                </div>
                <div class="bg-black mt-20 text-white flex gap-60">
                    <img class="mt-24 w-96 h-96 object-cover" src="../assets/images/bg-contact.jpg" alt="">
                    <div class="mt-24">
                        <h1 class="text-5xl sofia-medium mb-5">Our Latest Articles & Resources</h1>
                        <p class="uppercase sofia-pro text-15 tracking-widest">
                            Design Matters: Exploring the Impact of Architecture on Our Lives</p>
                        <div class=" flex mb-8 mt-20">
                            <input class="bg-white w-80 px-4 outline-none text-black" placeholder="Your Email Address"
                                type="email">
                            <div class="p-2 bg-white">
                                <button
                                    class="bg-black hover:scale-[0.9] text-white transition-all duration-500 border-black border-solid border-[1px] sofia-pro uppercase px-4 py-3 w-40">Send
                                    For Us</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.card-project:hover {
    transform: translateY(-8px);
}

.card-project:hover img {
    transform: scale(1.1)
}

.project-description {
    opacity: 0;
}

.project-image:hover .project-description {
    opacity: 1;
}

.project-image:hover img {
    transform: scale(1.1);
}

.activeOption {
    color: black;
    border-bottom: 1px solid black;
}

li {
    color: #727272;
    background-size: 200% 100%;
    background-position: -100%;
    display: inline-block;
    padding: 3px 0;
    position: relative;
    transition: all 0.3s ease-in-out;
}

li:before {
    content: '';
    background: black;
    display: block;
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 0;
    height: 1px;
    transition: all 0.3s ease-in-out;
}

li:hover {
    background-position: 0;
}

li:hover::before {
    width: 100%;
}
</style>