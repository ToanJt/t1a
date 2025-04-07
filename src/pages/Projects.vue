<script lang="ts" setup>
import { onMounted, ref, computed } from 'vue';
import { Icon } from '@iconify/vue'
import slugify from 'slugify';
import { onTop, createGalleries, convertToImageData } from '../functions/functions';
import type { ImageData } from '../functions/interface';
import { db } from '../firebaseConfig'
import { getDocs, collection, DocumentData, doc, setDoc } from 'firebase/firestore';
import { useRoute } from 'vue-router';

const route = useRoute();
const images = ref<ImageData[]>([]);
const projects = ref<DocumentData[]>([]);
const isActive = ref<Array<boolean>>([false, false, false, false, false, false]);
const currentOption = ref<number>(0);
const projectType = ref<string>('all');
const projectSize = ref<string>('');
const is360 = ref<boolean>();
const isAnimation = ref<boolean>();


const email = ref("")
const isValidEmail = ref(true)
const isSentSuccessfully = ref(false)


function validateEmail(email: string) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}


async function handleSubmit() {
    isValidEmail.value = validateEmail(email.value)
    if (email.value == "") {
        isValidEmail.value = false;
    }
    else {
        const customerEmail = {
            email: email.value
        }
        try {
            isSentSuccessfully.value = true;
            const customerDoc = doc(collection(db, "customers/"));
            await setDoc(customerDoc, customerEmail);
        } catch (error) {
            console.log("Failed send Email!! " + error);
        }

    }
}


onMounted(async () => {
    if (route.params.type) {
        projectType.value = String(route.params.type);
    }
    if (String(route.params.type) === 'exterior') {
        isActive.value[2] = true;
        currentOption.value = 2;
    } else if (String(route.params.type) === 'interior') {
        isActive.value[3] = true;
        currentOption.value = 3;
    } else if (String(route.params.type) === '360') {
        isActive.value[4] = true;
        is360.value = true;
        currentOption.value = 4;
    } else if (String(route.params.type) === 'animation') {
        isActive.value[5] = true;
        isAnimation.value = true;
        currentOption.value = 5;
    } else {
        isActive.value[0] = true;
        currentOption.value = 0;
    }
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
    if (params === 4) {
        return projects.value.filter((item) => {
            return item.is360 === is360.value;
        })
    }
    if (params === 5) {
        return projects.value.filter((item) => {
            return item.isAnimation === isAnimation.value;
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
            is360.value = true;
            break;
        case 5:
            isActive.value[5] = true;
            isActive.value[currentOption.value] = false;
            isAnimation.value = true;
            break;
    }
    currentOption.value = optionNumber;
}
</script>

<template>
    <div class="w-screen">

        <div class="bg-vr-light-gray ">
            <div class="container mx-auto md:px-20 px-4 lg:pt-40 pt-16 lg:pb-36 pb-20">
                <div class="flex flex-col items-center">
                    <h1 class="2xl:text-6xl lg:text-5xl sm:text-4xl text-2xl text-center sofia-medium ">Our
                        Projects</h1>
                    <ul
                        class="flex flex-wrap 2xl:gap-x-12 gap-x-10 gap-y-2 justify-center 2xl:text-2xl lg:text-xl md:text-lg text-sm lg:mt-12 mt-8 uppercase text-zinc-500">
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
                            class="hover:text-black transition-colors duration-500 cursor-pointer">
                            360°
                        </li>
                        <li @click="activeHandle(5)" :class="{ 'activeOption': isActive[5] }"
                            class="hover:text-black transition-colors duration-500 cursor-pointer">
                            Animation
                        </li>
                    </ul>
                </div>
                <div class="grid 2xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-x-6 mt-8">
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
                <div class="bg-black grid grid-cols-5 lg:mt-20 md:mt-10 mt-2 text-white ">
                    <img class="lg:col-span-2 lg:block hidden p-8 object-fill w-full h-full "
                        src="../assets/images/VIEW01_POOL-min.jpg" alt="">
                    <div class="lg:col-span-3 col-span-5 py-8 pr-8 lg:pl-0 pl-8 flex flex-col justify-between">
                        <div>
                            <h1
                                class="text-left lg:mr-4 mr-0 2xl:text-6xl lg:text-5xl sm:text-4xl text-2xl sofia-medium sm:mb-5 mb-25">
                                Are You Ready To Get Started?</h1>
                            <p
                                class="uppercase lg:mr-4 mr-0 text-left sofia-pro sm:text-15 text-[13px] tracking-widest lg:pb-0 pb-5">
                                Leave Your Email And We'll Contact Your Right Away.</p>
                        </div>
                        <div class=" lg:mr-4 mr-0">
                            <form @submit.prevent="handleSubmit()" class=" flex ">
                                <input v-model="email"
                                    class="bg-white lg:text-[1rem] text-sm w-80 md:px-4 px-3 outline-none text-black"
                                    placeholder="Your Email Address" type="email">

                                <div class="sm:p-2 p-1 bg-white">
                                    <button type="submit"
                                        class="bg-main-color lg:text-[1rem] text-sm hover:scale-[0.9] text-white transition-all duration-500 border-main-color border-solid border-[1px] sofia-pro uppercase md:px-4 px-2 py-3 md:w-40 w-32">Send
                                        For Us</button>
                                </div>

                            </form>
                            <p class="mt-2 text-sm text-blue-500" v-if="isSentSuccessfully && isValidEmail">🤝"Email
                                sent!
                                We look forward to working with you soon."
                            </p>
                            <p class="mt-2 text-sm text-red-500" v-if="!isValidEmail">Please enter a valid
                                Email address</p>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.error {
    border: 2px solid red;
}

.error-message {
    color: red;
}

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