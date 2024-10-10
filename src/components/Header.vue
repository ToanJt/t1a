<template>
    <div
        class="fixed mix-blend-exclusion  text-white z-10 top-0 left-0 right-0 container mx-auto h-28 flex items-center justify-between">
        <h1 class="font-roboto text-6xl">T1A</h1>
        <div class="flex gap-8 text-xl font-heading">
            <router-link to="/">Home</router-link>
            <router-link to="/projects">Projects</router-link>
            <router-link to="/about">About Us</router-link>
            <router-link to="/contact">Contact</router-link>
        </div>
    </div>
</template>

<style scoped>
.router-link-exact-active,
.router-link-active {
    color: white;
}

a {
    color: #727272;
    background-size: 200% 100%;
    background-position: -100%;
    display: inline-block;
    padding: 3px 0;
    position: relative;
    transition: all 0.3s ease-in-out;
}

a:before {
    content: '';
    background: white;
    display: block;
    position: absolute;
    bottom: -3px;
    left: 0;
    width: 0;
    height: 3px;
    transition: all 0.3s ease-in-out;
}

a:hover {
    background-position: 0;
}

a:hover::before {
    width: 100%;
}
</style>