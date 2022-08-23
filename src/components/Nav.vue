<template>
    <div>Nav Component</div>
    <p class="name">{{ name }}</p>
    <button @click="handleLogout">LogOut</button>
    <button @click="handleFetchUser">Fetch User</button>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
// Access to the constants store
const userStore = useUserStore();
//constant to save a variable that will hold the use router method
// const route = "/";

// constant to save a variable that will get the user from store with a computed function imported from vue
// constant that calls user email from the useUSerStore
// constant that saves the user email and cleans out the @client from the user
const user = userStore.user;
const userEmail = userStore.user.email;
const name = userEmail.replace(/@.*$/, "");

// Router to redirect user once signout to Login
const redirect = useRouter();
// Error Message
const errorMsg = ref("");

// async function that calls the signOut method from the useUserStore and pushes the user back to the Auth view.
const handleLogout = async () => {
    console.log("You are logout seey you soon!");
    try {
        // calls the user store and send the users info to backend to logIn
        await userStore.signOut();
        console.log("You are logout seey you soon!");
        // redirects user to the farewell page
        redirect.push({ path: "/auth/login" });
    } catch (error) {
        // displays error message
        errorMsg.value = `Error: ${error.message}`;
        // hides error message
        setTimeout(() => {
            errorMsg.value = null;
        }, 5000);
    }
};
</script>

<style scoped>
.name {
    text-transform: capitalize;
}
</style>
