<script setup lang="ts">
import { collection, DocumentData, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig'
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';
import { computed, onMounted, onUnmounted, ref } from "vue";
import { createGalleries, convertToImageData } from '../../functions/functions'
import type { ImageData } from '../../functions/interface'

const projects = ref<ImageData[]>([]);
let lightbox: PhotoSwipeLightbox | null;

const getProjectsDb = async () => {
    const projectsDb = await getDocs(collection(db, 'projects'));
    projectsDb.forEach((doc: DocumentData) => {
        const docData = convertToImageData(doc.data());
        projects.value.push(docData);
    })
    loadImageDimensions(projects.value);
}

const loadImageDimensions = (imageArray: ImageData[]) => {
    imageArray.forEach((image, index) => {
        const img = new Image();
        img.src = image.largeURL;
        img.onload = () => {
            imageArray[index].widthOrigin = img.width;
            imageArray[index].heightOrigin = img.height;
        };
    });
}

let columns: number;
if (window.innerWidth > 1280) {
    columns = 3;
} else if (window.innerWidth > 640) {
    columns = 2;
}
else {
    columns = 1;
}
const galleries = computed(() => createGalleries(projects.value, columns));
let top: number;
let right: number;
let bottom: number;
let left: number;
onMounted(() => {

    if (window.innerWidth > 768) {
        top = right = bottom = left = 100;
    } else if (window.innerWidth > 640) {
        top = right = bottom = left = 60;
    } else if (window.innerWidth > 520) {
        top = right = bottom = left = 30;
    } else {
        top = right = bottom = left = 10;
    }
    if (!lightbox) {
        lightbox = new PhotoSwipeLightbox({
            gallery: '.gallery',
            children: 'a',
            padding: { top: top, bottom: bottom, left: left, right: right },
            pswpModule: () => import('photoswipe'),
        });
        lightbox.on('uiRegister', function () {
            lightbox?.pswp?.ui?.registerElement({
                name: 'custom-caption',
                order: 9,
                isButton: false,
                appendTo: 'root',
                html: 'Caption text',
                onInit: (el) => {
                    lightbox?.pswp?.on('change', () => {
                        const currSlideElement = lightbox?.pswp?.currSlide?.data.element;
                        let captionHTML: null | string = '';
                        if (currSlideElement) {
                            const hiddenCaption = currSlideElement.querySelector('.hidden-caption-content');
                            if (hiddenCaption) {
                                captionHTML = hiddenCaption.innerHTML;
                            } else {
                                const attrImg = currSlideElement.querySelector('img')?.getAttribute('alt');
                                captionHTML = attrImg || null;
                            }
                        }
                        el.innerHTML = captionHTML || '';
                    })
                }
            })
        })
        lightbox.on('uiRegister', function () {
            lightbox?.pswp?.ui?.registerElement({
                name: 'download-button',
                order: 8,
                isButton: true,
                tagName: 'a',
                html: {
                    isCustomSVG: true,
                    inner: '<path d="M20.5 14.3 17.1 18V10h-2.2v7.9l-3.4-3.6L10 16l6 6.1 6-6.1ZM23 23H9v2h14Z" id="pswp__icn-download"/>',
                    outlineID: 'pswp__icn-download'
                },
                onInit: (el: HTMLElement, pswp) => {
                    el.setAttribute('download', '');
                    el.setAttribute('target', '_blank');
                    el.setAttribute('rel', 'noopener');

                    if (el instanceof HTMLAnchorElement) {
                        pswp.on('change', () => {
                            const test = pswp?.currSlide?.data.src;
                            el.href = test || '';
                        });
                    } else {
                        console.error('Expected an HTMLAnchorElement but got', el);
                    }
                }
            });
        });
        lightbox.init();
    }
    getProjectsDb();
}),
    onUnmounted(() => {
        if (lightbox) {
            lightbox.destroy();
            lightbox = null;
        }
    })
</script>

<template>
    <section class="lg:pt-24 pt-16">
        <div class="container mx-auto px-4 lg:pb-24 md:pb-20 pb-16">
            <div class="flex flex-col items-center lg:mb-24 sm:mb-16 mb-8">
                <p class="uppercase sofia-pro sm:text-15 text-[13px] tracking-widest sm:mb-5 mb-2">Let the Magic Begin!
                </p>
                <h1 class="2xl:text-6xl lg:text-5xl sm:text-4xl text-2xl text-center sofia-medium">Our Latest Creations
                </h1>
            </div>
            <div class="grid 2xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
                <div v-for="(column, index) in galleries" :key="index" class="column col-span-1 gallery">
                    <a v-for="(image, key) in column" :key="key" :href="image.largeURL"
                        :data-pswp-width="image.widthOrigin" :data-pswp-height="image.heightOrigin" target="_blank"
                        rel="noreferrer">
                        <img loading="lazy" class="mb-6" :src="image.thumbnailURL" :alt="image.name || undefined" />
                    </a>
                </div>
            </div>
            <div class="flex justify-center mt-8">
                <router-link to="/projects">
                    <button
                        class=" relative h-[38px] text-sm w-32 overflow-hidden border border-black bg-white text-black shadow-2xl transition-all before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:duration-500 after:absolute after:right-0 after:top-0 after:h-full after:w-0 after:duration-500 hover:text-white hover:shadow-black hover:before:w-2/4 hover:before:bg-black hover:after:w-2/4 hover:after:bg-black"><span
                            class="relative z-10">See more</span></button>
                </router-link>
            </div>
        </div>
    </section>
</template>

<style>
.pswp__custom-caption {
    background: transparent;
    font-size: 16px;
    font-family: "Europa Light", system-ui, Avenir, Helvetica, Arial, sans-serif;
    color: white;
    display: flex;
    justify-content: center;
    font-size: 1.5rem;
    width: 100%;
    height: 100px;
    padding: 4px 8px;
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
}

@media screen and (max-width: 1024px) {
    .pswp__custom-caption {
        bottom: 120px;
    }
}

@media screen and (max-width: 768px) {
    .pswp__custom-caption {
        bottom: 130px;
    }
}

.pswp__custom-caption a {
    color: #fff;
    text-decoration: underline;
}

.hidden-caption-content {
    display: none;
}

.pswp__img {
    display: flex;
    object-fit: contain !important;
}
</style>