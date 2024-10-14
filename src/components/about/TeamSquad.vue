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
    <div class="mb-24 bg-black">
        <div class="w-1286 mx-auto text-white mt-20 pb-24">

            <div class="grid grid-cols-3 gap-8 pt-24">
                <div class="">
                    <div>
                        <h1 class="text-5xl sofia-medium mb-5 uppercase">Team Squad
                        </h1>
                        <p class="uppercase sofia-pro text-15 tracking-widest">
                            We have 15 Talent 3D Artirst</p>
                    </div>
                    <p class="text-lg font-europa-light mt-10">Distinctive And Avant-garde Design
                        and
                        Architecture. Arcus, a Dynamicand Specialized
                        Architecture company.</p>
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
</template>

<style scoped>
.card-team:hover {
    transform: translateY(-8px);
}

.card-team:hover img {
    transform: scale(1.1)
}
</style>