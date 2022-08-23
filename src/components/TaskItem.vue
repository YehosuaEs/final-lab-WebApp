<template>
    <!-- <div>Task Item Component</div> -->
    <div>
        <p>{{ props.task.id }}</p>
        <p>{{ props.task.title }}</p>
        <p>{{ props.task.description }}</p>
        <!-- ABout to CHECK or NOT CHECK -->
        <span
            class="material-symbols-outlined"
            @click="checkTaskId(props.task.id)"
        >
            done
        </span>
        <!-- <span class="material-symbols-outlined"> undo </span> -->
        <!-- ABOUT EDIT FORM -->
        <span class="material-symbols-outlined" @click="handleForm">
            edit
        </span>
        <!-- ABOUT REMOVE ITEM FROM LIST -->
        <span
            class="material-symbols-outlined"
            @click="removeTaskId(props.task.id)"
        >
            delete
        </span>
        <form v-if="thereIsFotm" @submit.prevent="editTaskId(props.task.id)">
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

<!-- ------------------------------------------------------------------------------- -->
<script setup>
import { reactive, ref } from "vue";
const emit = defineEmits([
    "emitDelete-task",
    "emitCheck-task",
    "emitEdit-task",
]);

const task = ref({});
const thereIsFotm = ref(false);
const editTitle = ref("");
const editDescription = ref("");

const props = defineProps({
    task: { type: Object },
    editTitle: { type: String },
    editDescription: { type: String },
});

// 6 To check the task by id--->missing the prop to conect the parent NOT DONE
const checkTaskId = (id) => {
    const taskId = id;
    emit("emitCheck-task", taskId);
    console.log("hola");
};
// 7 To edit task by id
const editTaskId = (id) => {
    emit("emitEdit-task", id, editTitle.value, editDescription.value);
    console.log("hola");
    thereIsFotm.value = false;
    editTitle.value = "";
    editDescription.value = "";
};
// Just to handle the form dropdown o not
const handleForm = () => {
    thereIsFotm.value = !thereIsFotm.value;
};
// 8 Take the id of the item to then pass through the emit
const removeTaskId = (id) => {
    const taskId = id;
    emit("emitDelete-task", taskId);
};
</script>
<!-- ------------------------------------------------------------------------------- -->
<style scoped>
span {
    cursor: pointer;
}
</style>

<!-- 
**Hints**

2. Data properties need here are the following: a boolean to store a false**Important variable, a string to store an error, a string to store the value of the task that the user can edit, an initial false boolean to hide the inputFIeld used to edit the new task detail or details[this is in reference of the task title and the task description].

4. Function to handle the error with the data properties used to control the error and the the boolean controlling the boolean empty variable.

5. Function to handle the edit dialogue where the inputField is displayed and the string used to store the value of the inputField will be used here to save the value as a prop on this function.

6. Function to emmit a custom event emit() that takes 2 parameters a name for the custom event and the value that will be send via the prop to the parent component. This function can control the toggle completion of the task on the homeview.

7. Function to edit the task information that you decided that the user can edit. This function's body takes in a conditional that first checks if the value of the task [either title and description or just title] is empty which if true it runs the function used to handle the error on hint4. Else, the conditional sets the first mentioned boolean data property on hint2 back to its inital boolean value to hide the error message and repeat the same for the data property mentioned 4th on hint2; a constant that stores an object that holds the oldValue from the prop item and the value of the task coming from the data property mentioned 3rd on hint2; a custom event emit() that takes 2 parameters a name for the custom event and the value from the object used on this part of the conditional and lastly this part of the conditional sets the value of input field to an empty string to clear it from the ui. 

1. DONE----ref() or reactive() can be used here to store the following, think if you want to store them either individually or like an object, up to you.
3. DONE----Store the custom emit events that will be used to call the functions of the homeView for editing, deleting and toggling the status[completed, not complted] of the taskItem.
8. DONE---Function to emmit a custom event emit() that takes 2 parameters a name for the custom event and the value that will be send via the prop to the parent component. This function can control the removal of  the task on the homeview.


-->
