<template>
    <header class="headerContainer">
        <div class="greet">
            <p>Hello!</p>
            <p class="name">{{ name }}</p>
        </div>
        <div class="date">
            <p>Today's</p>
            <p class="currentDate"><Date /></p>
        </div>
    </header>
</template>

<script setup>
import Date from "./Date.vue";
import { useUserStore } from "../stores/user";
const userStore = useUserStore();
const user = userStore.user;
const userEmail = userStore.user.email;
const name = userEmail.replace(/@.*$/, "");
</script>

<style scoped>
.headerContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    letter-spacing: 0.2px;
    padding: 20px 0 10px;
}

.greet {
    display: flex;
}
.greet > p {
    font-size: 20px;
    font-weight: 700;
}

.name::first-letter {
    text-transform: capitalize;
}
.date {
    display: flex;
    color: rgb(158, 158, 158);
}
.date > p {
}

.name,
.currentDate {
    margin-left: 5px;
}
</style>
