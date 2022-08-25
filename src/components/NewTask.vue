<template>
    <section>
        <div class="container">
            <h4 class="title_newTask">New Task</h4>

            <p class="errormsg">{{ errorMsg }}</p>
            <form @submit.prevent="addNewTask">
                <div v-if="errorNoValue"></div>

                <input
                    type="text"
                    placeholder="e.g., Code every day with vue.js "
                    v-model="title"
                />

                <input
                    type="text"
                    placeholder="New Task Description"
                    v-model="description"
                />

                <button type="submit" class="button">Add</button>
            </form>
        </div>
    </section>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import Date from "./Date.vue";

// constant to save a variable that define the custom event that will be emitted to the homeView
const emit = defineEmits(["emitNew-task"]);

const title = ref("");
const description = ref("");

const errorNoValue = ref(false);
const errorMsg = ref("");

// arrow function to call the form holding the task title and task description that uses a conditional to first checks if the task title is empty, if true the error message is displayed through the errorMessage container and sets a timeOut method that hides the error after some time. Else, its emmits a custom event to the home view with the task title and task description; clears the task title and task description input fields.
const addNewTask = () => {
    if (title.value.length === 0 || description.value.length === 0) {
        errorNoValue.value = true;
        errorMsg.value = "Title and description are needed";
        setTimeout(() => {
            errorMsg.value = null;
            errorNoValue.value = false;
        }, 2000);
    } else {
        const newTask = {
            title: title.value,
            description: description.value,
        };
        emit("emitNew-task", newTask);
        // this.$emit("emitNew-task", newTask);
        title.value = "";
        description.value = "";
    }
};
</script>

<style scoped>
* {
    box-sizing: border-box;
}
.container {
    border: 0.5px solid #e9e9e9;
    margin: 20px 0;
    padding: 10px 10px 15px 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    /* border-bottom-right-radius: 20px;
    border-bottom-left-radius: 20px;
    -webkit-border-bottom-right-radius: 20px;
    -webkit-border-bottom-left-radius: 20px;
    -moz-border-radius-bottomright: 20px;
    -moz-border-radius-bottomleft: 20px; */
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    border-radius: 20px;
    box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1),
        0px -24px 10px -26px rgba(0, 0, 0, 0.1);
}

.title_newTask {
    padding: 10px 0;
}

input {
    width: 85vw;
    margin: 5px 15px;
    padding: 0.8rem 0.5rem;
    border: none;
    border-radius: 10px;
    box-shadow: 0px 3px 15px -4px #dadee2, 0px 2px 10px -4px #dadee2;
    letter-spacing: 0.5px;
    transition: 0.4s;
}
/* to To prevent the color-bg when autofill */
input:-webkit-autofill,
input:-webkit-autofill:active {
    transition: background-color 1000s ease-out;
}

input:focus {
    outline: none;
    border: 0.5px solid #fff;
}
.button {
    background: #f24452;
    border: 2px solid #f24452;
    border-radius: 50px;
    color: #fff;
    margin: 1rem 0 0.3rem 0;
    padding: 0.5rem 1.6rem;
    text-align: center;
    text-decoration: none;
    font-size: 16px;
    cursor: pointer;
    transition: 0.5s;
    box-shadow: 0px 5px 15px -3px rgba(0, 0, 0, 0.1);
}

.button:hover {
    background-color: #fff;
    border: 2px solid #f24452;
    color: #f24452;
}
.errormsg {
    color: #f24452;
    font-size: 14px;
    margin-left: 0.7rem;
}
</style>
