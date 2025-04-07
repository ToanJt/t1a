<script setup lang="ts">
import { collection, DocumentData, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { onMounted, ref } from "vue";

const members = ref<DocumentData[]>([]);
const getMembers = async () => {
    const membersData = await getDocs(collection(db, 'members'));
    membersData.forEach((docData) => {
        members.value.push(docData.data());
    })
}

onMounted(() => {
    getMembers();
})

</script>

<template>
    <div class=" bg-black">
        <div class="px-4">
            <div class="container mx-auto 2xl:px-24 text-white lg:pb-24 pb-16">
                <div class="grid 2xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 lg:pt-24 pt-16">
                    <div class=" 2xl:ml-0 sm:ml-12 ml-0">
                        <div>
                            <h1 class="md:text-5xl sm:text-4xl text-3xl sofia-medium sm:mb-5 mb-2 uppercase">Team Squad
                            </h1>
                            <p class="uppercase sofia-pro sm:text-15 text-[13px] tracking-widest sm:mb-5 mb-2">
                                We have 10 Talent 3D Artirst</p>
                        </div>

                    </div>
                    <div v-for="(member, index) in members" :key="index"
                        class="border card-team transition-all duration-500 text-black bg-[#FAF6F3] border-solid p-8">
                        <div class="w-full h-72 overflow-hidden">
                            <img loading="lazy" class="w-full h-full object-cover transition-all duration-500"
                                :src="member.avatar" alt="">
                        </div>
                        <div class="flex items-end justify-between">
                            <div class="mt-6">
                                <p class="text-2xl font-headingTest uppercase">{{ member.fullname }}</p>
                                <p class=" font-headingTest font-medium tracking-wider">{{ member.position }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<style scoped>
.card-team:hover {
    transform: translateY(-8px);
}

.card-team:hover img {
    transform: scale(1.1)
}
</style>