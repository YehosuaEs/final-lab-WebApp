<template>
    <div class="container">
        <div class="content">
            <span class="material-symbols-outlined icon"> done </span>
            <p class="iconText">
                Thanks for Signup up! <br />
                Now please check your inbox email and confirm.
            </p>
        </div>
    </div>
</template>

<script setup></script>

<style scoped>
.container {
    /* display: none; */
    position: absolute;
    border-radius: 10px;
    background: rgb(59, 191, 99);
    top: 20px;
    color: #fff;
    transition: 2s;
}

.content {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 15px;
}

.icon {
    border: 2px solid #fff;
    border-radius: 100px;
    padding: 0.2rem;
}

.iconText {
    margin-left: 15px;
}
</style>
