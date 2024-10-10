<template>
    <section class="relative">
        <div id="magic" ref="magicContainer">
        </div>

    </section>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

html,
body {
    font-family: 'Roboto' !important;
}

#magic {
    position: relative;
    width: 100%;
    height: 100vh;
    display: block;
    z-index: -9999;
}

.playground {
    position: absolute;
    top: 0;
    display: block;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
}

.bottomPosition {
    text-align: center;
    margin-bottom: 50px;
}

.minText {
    font-size: 14px;
}

a {
    color: white;
    font-size: 12px;
    text-decoration: none;
}

.logo {
    width: 50px;
    height: 50px;
}
</style>
