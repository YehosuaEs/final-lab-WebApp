<template>
    <div class="containerTaskItem">
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
        <form
            v-if="thereIsForm"
            @submit.prevent="editTask"
            class="containerFormEdit"
        >
            <div v-if="erroHandle" class="errormsg">{{ error }}</div>
            <input
                type="text"
                placeholder="Edit Title"
                v-model="editTitle"
                class="inputEditTask"
            />
            <input
                type="text"
                placeholder="Edit Description"
                v-model="editDescription"
                class="inputEditTask"
            />
            <button type="submit">Save</button>
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
        }, 1000);
    }
    setTimeout(() => {
        error.value = "";
    }, 4000);
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
.containerTaskItem {
}
.containerTask {
    position: relative;
    z-index: 1;
    border: 0.1px solid #e9e9e9;
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
.taskInfo_title:first-letter {
    text-transform: capitalize;
}
.taskInfo_description {
    color: rgb(158, 158, 158);
}

span {
    cursor: pointer;
    margin: 0 5px;
}
span:hover {
    opacity: 0.9;
}

.circle {
    color: #31ce85;
}
.circle:hover {
    content: "\e86c";
}

.done {
    color: #fff;
    background-color: #31ce85;
    border-radius: 20px;
}
.edit {
    color: #f2a74b;
}
.delete {
    color: #f24452;
}
/* ----------------------- FORM TO EDIT TASK ----------------------- */

.containerFormEdit {
    position: relative;
    background: #f7f7f7;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: -50px 15px 20px 15px;
    padding: 40px 10px 0px 10px;
    border: none;
    -webkit-border-bottom-right-radius: 20px;
    -webkit-border-bottom-left-radius: 20px;
    -moz-border-radius-bottomright: 20px;
    -moz-border-radius-bottomleft: 20px;
    border-bottom-right-radius: 20px;
    border-bottom-left-radius: 20px;
}
.errormsg {
    color: #f24452;
    font-size: 14px;
    margin-left: 0.7rem;
}
input {
    width: 80vw;
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
button {
    background: #f2a74b;
    border: 2px solid #f2a74b;
    border-radius: 50px;
    color: #fff;
    margin: 1rem 0;
    padding: 0.5rem 1.6rem;
    text-align: center;
    text-decoration: none;
    font-size: 16px;
    cursor: pointer;
    transition: 0.5s;
    box-shadow: 0px 5px 15px -3px rgba(0, 0, 0, 0.1);
    transition: 0.5s;
}

button:hover {
    background-color: transparent;
    border: 2px solid #f2a74b;
    color: #f2a74b;
}
</style>
