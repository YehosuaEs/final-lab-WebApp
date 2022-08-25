<template>
    <span class="plus_add_button">
        add task
        <span class="icon_content">
            <i class="material-symbols-outlined icon_add"> add </i>
        </span>
    </span>
</template>

<script setup></script>

<style scoped>
.plus_add_button {
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
    background: transparent;
    color: rgb(158, 158, 158);
    transition: 0.4s;
}
.icon_content {
    width: 30px;
    height: 30px;
    background: transparent;
    border-radius: 30px;
    display: flex;
    align-content: center;
    justify-content: center;
    align-items: center;
    align-self: center;
    margin-left: 0.3rem;
    box-shadow: 4px 3px 8px 0px rgba(0, 0, 0, 0.1);
    transition: 0.5s;
}
.icon_add {
    color: #f24452;
    transition: 0.5s;
    font-weight: 700;
}
.plus_add_button:hover .icon_add {
    color: #fff;
    border-radius: 30px;
    border: none;
}
.plus_add_button:hover .icon_content {
    background: #f24452;
}
.plus_add_button:hover {
    color: #f24452;
}
</style>
