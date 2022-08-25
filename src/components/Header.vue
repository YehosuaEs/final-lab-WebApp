<template>
    <div>
        <div class="greet">
            <h4>Hello! &nbsp;</h4>
            <h4 class="name">{{ name }}</h4>
        </div>
        <div class="greet">
            <h5>Today's &nbsp;</h5>
            <h5><Date /></h5>
        </div>
    </div>
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
.greet {
    display: flex;
}
.name {
    text-transform: capitalize;
}
</style>
