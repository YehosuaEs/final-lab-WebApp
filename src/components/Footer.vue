<template>
    <footer>
        <div>
            <span class="copyRights"> &#169;</span> {{ year }} Listito. All
            rights reserved.
        </div>
        <div>
            Develop by
            <a href="https://www.linkedin.com/in/yehosua-escobedo/"
                >Yehosua Escobedo</a
            >
        </div>
    </footer>
</template>

<script setup>
import { ref } from "vue";
const year = ref("");

const date = new Date();
year.value = date.getFullYear();

const windowHeight = window.innerHeight;
const height = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
);
</script>

<style scoped>
footer {
    text-align: center;
    font-size: 14px;
    width: 100%;
    color: #8e8e8e;
}
.copyRights {
    font-size: 18px;
}
a {
    color: #8e8e8e;
}
a:hover {
    background: none;
    color: #606060;
}
</style>
