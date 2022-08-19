<template>
    <!-- <div v-if="click === false">
        Gracias por usar todo App haz click aqui par ainiciar sesión
        <button @click="handleGoToSignIn">Go to Login Page</button>
    </div> -->

    <router-view></router-view>
</template>

<script setup>
// import { useRouter } from "vue-router";
// import { ref } from "vue";

// const click = ref(false);

// const redirect = useRouter();

// const handleGoToSignIn = () => {
//     click.value = true;
//     redirect.push({ path: "/auth/login" });
// };
</script>

<style></style>
