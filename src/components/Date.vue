<template>
    <p>{{ currentDateTime() }}</p>
</template>

<script setup>
const currentDateTime = () => {
    const current = new Date();

    const monthName = toMonthName();
    const dayName = toDayName();

    const date = `${current.getDate()} ${monthName} ${current.getFullYear()}`;
    const justDate = `${dayName} ${date}`;

    return justDate;
};

const toMonthName = () => {
    const monthofYearName = new Date().toLocaleString("en-US", {
        month: "short",
    });
    return monthofYearName;
};

const toDayName = () => {
    const dayOfWeekName = new Date().toLocaleString("en-US", {
        weekday: "short",
    });
    return dayOfWeekName;
};
</script>

<style scoped></style>
