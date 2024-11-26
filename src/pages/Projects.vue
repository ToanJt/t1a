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
const isActive = ref<Array<boolean>>([true, false, false, false, false, false, false, false]);
const currentOption = ref<number>(0);
const projectType = ref<string>('all');
const projectSize = ref<string>('');
const is360 = ref<boolean>();

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

let columns: number;
if (window.innerWidth > 1280) {
    columns = 3;
} else if (window.innerWidth > 640) {
    columns = 2;
}
else {
    columns = 1;
}
// Hàm để chia các ảnh thành các cột
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
    if (params === 7) {
        return projects.value.filter((item) => {
            return item.is360 === is360.value;
        })
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
        case 7:
            isActive.value[7] = true;
            isActive.value[currentOption.value] = false;
            is360.value = true;
            break;
    }
    currentOption.value = optionNumber;
}
</script>

<template>
    <div>
        <div class="bg-black ">
            <div class="relative">
                <div class="w-screen relative lg:h-[600px] md:h-[500px] h-[400px] opacity-15 overflow-hidden ">
                    <img class="w-full h-full bg-top object-cover" src="../assets/images/projects-bg.jpg" alt="">
                </div>
                <div
                    class="container w-full h-full fixHeight mx-auto md:px-20 px-4 absolute top-0 left-0 right-0 fix-firstScreen bottom-0 justify-center text-white flex flex-col items-start">
                    <h1
                        class="2xl:text-8xl lg:text-6xl md:text-5xl sm:text-4xl text-3xl sofia-medium uppercase 2xl:mb-20 sm:mb-10 mb-5">
                        Portfolio</h1>
                    <p class="md:w-2/3 2xl:text-base lg:text-15 sm:text-sm text-[12px]">Lorem ipsum, dolor sit amet
                        consectetur
                        adipisicing
                        elit.
                        Tenetur
                        ducimus,
                        perspiciatis nobis
                        cupiditate maxime deserunt? Qui error, quos rem placeat omnis quasi sit ratione vel voluptas
                        saepe
                        odit, ea aspernatur!</p>
                </div>
            </div>
        </div>
        <div class="bg-vr-light-gray ">
            <div class="container mx-auto md:px-20 px-4 lg:pt-24 pt-16 lg:pb-36 pb-20">
                <div class="flex flex-col items-center">
                    <h1 class="2xl:text-6xl lg:text-5xl sm:text-4xl text-2xl text-center sofia-medium sm:mb-5 mb-2">Our
                        Latest
                        Articles & Resources</h1>
                    <p class="uppercase text-center sofia-pro sm:text-15 text-[13px] tracking-widest">
                        Design Matters: Exploring the Impact of Architecture on Our Lives</p>
                    <ul
                        class="flex flex-wrap 2xl:gap-x-12 gap-x-10 gap-y-2 justify-center 2xl:text-2xl lg:text-xl md:text-lg text-sm lg:pb-6 pb-3 2xl:mt-24 lg:mt-16 mt-8 border-b border-solid uppercase text-zinc-500">
                        <li @click="activeHandle(0)" :class="{ 'activeOption': isActive[0] }"
                            class="hover:text-black transition-colors duration-500 cursor-pointer ">
                            All</li>
                        <li @click="activeHandle(1)" :class="{ 'activeOption': isActive[1] }"
                            class="hover:text-black transition-colors duration-500 cursor-pointer">Full Project</li>
                        <li @click="activeHandle(2)" :class="{ 'activeOption': isActive[2] }"
                            class="hover:text-black transition-colors duration-500 cursor-pointer">Exterior</li>
                        <li @click="activeHandle(3)" :class="{ 'activeOption': isActive[3] }"
                            class="hover:text-black transition-colors duration-500 cursor-pointer">Interior</li>
                        <li @click="activeHandle(7)" :class="{ 'activeOption': isActive[7] }"
                            class="hover:text-black transition-colors duration-500 cursor-pointer">
                            360°
                        </li>
                    </ul>
                </div>
                <div class="grid 2xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-x-6 lg:mt-20 md:mt-16 mt-8">
                    <div v-for="(column, index) in galleries" :key="index" class="column col-span-1 gallery">
                        <div class="relative project-image cursor-pointer overflow-hidden mb-6"
                            v-for="(image, key) in column" :key="key">
                            <router-link :to="{ name: 'project-details', params: { id: slugify(image.name) } }">
                                <img loading="lazy" class=" transition-all duration-500" :src="image.thumbnailURL"
                                    :alt="image.description || undefined" />
                                <div
                                    class="project-description transition-all duration-500  text-white p-6 bg-vr-light-gray-blur flex flex-col justify-center items-center absolute top-0 left-0 right-0 bottom-0">
                                    <h1 class="xl:text-2xl lg:text-xl text-lg text-center mb-2">{{ image.name }}</h1>
                                    <div class="lg:flex hidden justify-center w-full">
                                        <p class="xl:text-15 text-[12px] mx-2">Client: {{ image.client }}</p>
                                        <div class="flex items-center">
                                            <Icon icon="mdi:dot" width="1em" height="1em" style="color: white" />
                                        </div>
                                        <p class="xl:text-15 text-[12px] mx-2">Year: {{ image.year
                                            }}</p>
                                        <div class="flex items-center">
                                            <Icon icon="mdi:dot" width="1em" height="1em" style="color: white" />
                                        </div>
                                        <p class="xl:text-15 text-[12px] mx-2">{{ image.type }}</p>
                                    </div>
                                </div>
                            </router-link>
                        </div>
                    </div>
                </div>
                <div
                    class="bg-black lg:mt-20 md:mt-10 mt-2 lg:static relative text-white flex 2xl:gap-32 lg:gap-16 gap-8">
                    <img class="lg:mt-24 lg:opacity-100 opacity-30 mt-0 lg:static absolute left-0 right-0 top-0 bottom-0 2xl:w-96 lg:w-60 w-full 2xl:h-96 lg:h-[21rem] h-full object-cover"
                        src="../assets/images/bg-contact.jpg" alt="">
                    <div class="lg:mt-24 p-8 lg:static relative">
                        <h1
                            class="text-left lg:mr-4 mr-0 2xl:text-6xl lg:text-5xl sm:text-4xl text-2xl sofia-medium sm:mb-5 mb-25">
                            Our Latest Articles & Resources</h1>
                        <p class="uppercase lg:mr-4 mr-0 text-left sofia-pro sm:text-15 text-[13px] tracking-widest">
                            Design Matters: Exploring the Impact of Architecture on Our Lives</p>
                        <div class=" flex mt-20 lg:mr-4 mr-0 lg:mb-8 md:mb-5 mb-2">
                            <input
                                class="bg-white lg:text-[1rem] text-sm 2xl:w-80 w-full md:px-4 px-3 outline-none text-black"
                                placeholder="Your Email Address" type="email">
                            <div class="sm:p-2 p-1 bg-white">
                                <button
                                    class="bg-black lg:text-[1rem] sm:text-sm text-[12px] hover:scale-[0.9] text-white transition-all duration-500 border-black border-solid border-[1px] sofia-pro uppercase md:px-4 px-2 md:py-3 py-2 md:w-40 w-32">Send
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