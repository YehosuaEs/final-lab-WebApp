<template>
    <div id="menu">
        <div id="menu-bar" @click="menuOnClick()">
            <div id="bar1" class="bar"></div>
            <div id="bar2" class="bar"></div>
            <div id="bar3" class="bar"></div>
        </div>
        <nav class="nav" id="nav">
            <ul>
                <li><a href="#">About</a></li>
            </ul>
        </nav>
    </div>

    <div class="menu-bg" id="menu-bg"></div>
</template>

<script setup>
function menuOnClick() {
    document.getElementById("menu-bar").classList.toggle("change");
    document.getElementById("nav").classList.toggle("change");
    document.getElementById("menu-bg").classList.toggle("change-bg");
}
</script>

<style scoped>
#menu {
    z-index: 2;
}

#menu-bar {
    width: 45px;
    height: 40px;
    margin: 30px 0 20px 20px;
    cursor: pointer;
}

.bar {
    height: 5px;
    width: 80%;
    background-color: #dc052d;
    display: block;
    border-radius: 10px;
    transition: 0.3s ease;
}

#bar1 {
    transform: translateY(-4px);
    height: 5px;
}

#bar3 {
    transform: translateY(4px);
    height: 5px;
}

.nav {
    transition: 0.3s ease;
    display: none;
}

.nav ul {
    padding: 0 22px;
}

.nav li {
    list-style: none;
    padding: 12px 0;
}

.nav li a {
    color: white;
    font-size: 20px;
    text-decoration: none;
}

.nav li a:hover {
    font-weight: bold;
}

.menu-bg,
#menu {
    top: 0;
    left: 0;
    position: absolute;
}

.menu-bg {
    z-index: 1;
    width: 0;
    height: 0;
    margin: 30px 0 20px 20px;
    background: radial-gradient(circle, #dc052d, #dc052d);
    border-radius: 50%;
    transition: 0.3s ease;
}

.change {
    display: block;
}

.change .bar {
    background-color: white;
}

.change #bar1 {
    transform: translateY(4px) rotateZ(-45deg);
}

.change #bar2 {
    opacity: 0;
}

.change #bar3 {
    transform: translateY(-6px) rotateZ(45deg);
}

.change-bg {
    width: 520px;
    height: 460px;
    transform: translate(-60%, -30%);
}
</style>
