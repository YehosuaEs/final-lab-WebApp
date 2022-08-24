<template>
    <div class="container">
        <!-- ABOUT TOGGLE TASK STATUS -->
        <div class="containerTask">
            <span
                v-if="task.is_complete"
                @click="toggleTaskStatus"
                class="material-symbols-outlined done"
            >
                done
            </span>
            <span
                v-if="!task.is_complete"
                @click="toggleTaskStatus"
                class="material-symbols-outlined circle"
            >
                circle
            </span>
            <div class="taskInfo">
                <!-- <p>{{ task.id }}</p> -->
                <p class="taskInfo_title">{{ task.title }}</p>
                <p class="taskInfo_description">{{ task.description }}</p>
            </div>
            <!-- ABOUT EDIT FORM -->
            <span class="material-symbols-outlined edit" @click="handleForm">
                edit
            </span>
            <!-- ABOUT REMOVE ITEM FROM LIST -->
            <span class="material-symbols-outlined delete" @click="removeTask">
                delete
            </span>
        </div>
        <!-- --------FORM TO EDIT TASK------- -->
        <form v-if="thereIsForm" @submit.prevent="editTask">
            <div v-if="erroHandle">{{ error }}</div>
            <input type="text" placeholder="edit Title" v-model="editTitle" />
            <input
                type="text"
                placeholder="Edit Description"
                v-model="editDescription"
            />
            <button type="submit">Edit</button>
        </form>
    </div>
</template>

<!-- --------------------------------------SCRIPT---------------------------------------------- -->
<script setup>
import { reactive, ref, computed } from "vue";
const emit = defineEmits([
    "emitDelete-task",
    "emitCheck-task",
    "emitEdit-task",
]);

const thereIsForm = ref(false);
const editTitle = ref("");
const editDescription = ref("");
const error = ref("");
const erroHandle = ref(false);

const props = defineProps(["task"]);
// const props = defineProps({
//     task: Array,
// });

// 6 To check the task by id--->missing the prop to conect the parent NOT DONE
const toggleTaskStatus = () => {
    emit("emitCheck-task", props.task);
};

const editTask = () => {
    if (editTitle.value === "" || editDescription.value === "") {
        error.value = "Ups! Some of the fields are empty";
        erroHandle.value = true;
    } else {
        error.value = "";
        const editValues = {
            oldValue: props.task,
            newTitle: editTitle.value,
            newDescription: editDescription.value,
        };
        emit("emitEdit-task", editValues);
        setTimeout(() => {
            thereIsForm.value = false;
        }, 700);
    }
};

// Just to handle the form dropdown o not with the value task in the inputs
const handleForm = () => {
    thereIsForm.value = !thereIsForm.value;
    editTitle.value = props.task.title;
    editDescription.value = props.task.description;
};
// 8 Take the id of the item to then pass through the emit
const removeTask = () => {
    emit("emitDelete-task", props.task);
};
</script>
<!-- ------------------------------------------STYLES------------------------------------------ -->
<style scoped>
.containerTask {
    border: 1.5px solid #fff;
    background: #fff;
    display: flex;
    align-items: center;
    margin: 20px 15px;
    padding: 10px;
    border-radius: 20px;
    box-shadow: 0px 2px 15px -3px rgba(0, 0, 0, 0.1),
        0px -0px 10px -26px rgba(0, 0, 0, 0.1);
}

.taskInfo {
    width: 100%;
    margin: 10px;
}
.taskInfo > p {
    padding: 3px;
}
.taskInfo_title {
}
.taskInfo_description {
    color: gray;
}

span {
    cursor: pointer;
    margin: 0 5px;
}
span:hover {
    opacity: 0.9;
}

.circle {
    color: #45bfb3;
}
.circle:hover {
    content: "\e86c";
}

.done {
    color: #fff;
    background-color: #45bfb3;
    border-radius: 20px;
}
.edit {
    color: #f2a74b;
}
.delete {
    color: #f24452;
}
</style>
