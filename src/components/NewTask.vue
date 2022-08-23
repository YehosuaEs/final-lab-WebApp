<template>
    <section>
        <div class="container">
            <h4>Add a new Task</h4>

            <div>
                <p>Keep your life organized</p>
                <p>Today's date is <Date /></p>
            </div>
            <p class="errormsg">{{ errorMsg }}</p>
            <form @submit.prevent="addNewTask">
                <div v-if="errorNoValue"></div>
                <div>
                    <input
                        type="text"
                        placeholder="New Task Title"
                        v-model="title"
                    />
                </div>

                <div>
                    <input
                        type="text"
                        placeholder="New Task Description"
                        v-model="description"
                    />
                </div>
                <button type="submit" class="button">add your task</button>
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
.container {
    border: 1px solid red;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}
.button {
    background: #034c8c;
    border: 2px solid #034c8c;
    color: #f6f7f8;
    border-radius: 50px;
    color: white;
    margin: 1rem 0;
    padding: 0.5rem 1rem;
    text-align: center;
    text-decoration: none;
    font-size: 16px;
    cursor: pointer;
    transition: 0.5s;
}

.button:hover {
    background-color: #fff;
    border: 2px solid #034c8c;
    color: #034c8c;
}
.errormsg {
    color: #f24452;
    font-size: 14px;
    margin-left: 0.7rem;
}
</style>
