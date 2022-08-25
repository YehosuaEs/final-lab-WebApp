<template>
    <Nav />
    <Header />
    <div class="containerMain">
        <img src="../assets/Humaaans.png" alt="human" />
        <div class="button_continer">
            <ButtonAddTask @click="handleAdd" />
        </div>

        <div v-if="toggleAdd" class="newTask">
            <NewTask @emitNew-task="addTaskTodo" />
        </div>
        <div class="tasks">
            <TaskItem
                v-for="(item, id) in taskStore.tasks"
                :key="id"
                :task="item"
                @emitDelete-task="deleteTask"
                @emitEdit-task="editTask"
                @emitCheck-task="checkTask"
            />
        </div>
    </div>
    <Footer />
</template>

<script setup>
import Nav from "../components/Nav.vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import ButtonAddTask from "../components/ButtonAddTask.vue";
import NewTask from "../components/NewTask.vue";
import TaskItem from "../components/TaskItem.vue";

import { ref, computed, onMounted } from "vue";
import { useUserStore } from "../stores/user";
import { useTaskStore } from "../stores/task";
// Access to the constants store
const userStore = useUserStore();
// Using the store to get theinfo of the tasks
const taskStore = useTaskStore();

const toggleAdd = ref(false);

onMounted(() => {
    taskStore.fetchTasks();
});

async function addTaskTodo(task) {
    await taskStore.addTask(task.title, task.description);
    taskStore.fetchTasks();
}
async function checkTask(task) {
    const saveBoolean = !task.is_complete;
    const saveId = task.id;
    await taskStore.checkTaskItem(saveBoolean, saveId);
    taskStore.fetchTasks();
}
async function deleteTask(task) {
    const taskId = task.id;
    await taskStore.deleteTaskItem(taskId);
    taskStore.fetchTasks();
}
async function editTask(task) {
    const newTitle = task.newTitle;
    const newDescription = task.newDescription;
    const id = task.oldValue.id;
    await taskStore.editTaskItem(newTitle, newDescription, id);
    taskStore.fetchTasks();
}
const handleAdd = () => {
    toggleAdd.value = !toggleAdd.value;
};
</script>

<style scoped>
.containerMain {
    min-height: calc(80vh - 86px);
    /* min-height: -webkit-calc(68vh - 86px);
    min-height: -moz-calc(68vh - 86px); */
    background: #fff;
    position: relative;
}
/* ---------------------------------- */
.button_continer {
    display: flex;
    justify-content: end;
    padding: 1.5rem 1.5rem 0;
}

/* ---------------------------------- */
img {
    display: none;
    width: 500px;
    position: absolute;
    top: -50px;
    left: -350px;
}
/* ---------------------------------- */
.tasks {
    padding-bottom: 10px;
}

@media (min-width: 1366px) {
    img {
        display: block;
    }
}
</style>
