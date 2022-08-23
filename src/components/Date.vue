<template>
    <p>{{ currentDate }}</p>
</template>

<script setup>
const date = new Date();
const day = date.getDate();
const month = date.getMonth() + 1;
const year = date.getFullYear();
const currentDate = `${day}/${month}/${year}`;
</script>

<style scoped></style>
