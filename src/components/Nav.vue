<template>
    <div>Nav Component</div>
    <button @click="handleLogout">LogOut</button>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
//constant to save a variable that will hold the use router method

// constant to save a variable that will get the user from store with a computed function imported from vue

// constant that calls user email from the useUSerStore

// constant that saves the user email and cleans out the @client from the user

// Access to the constants store
const user = useUserStore();
// Router to push user once signout to Login
const redirect = useRouter();
// Error Message
const errorMsg = ref("");
// async function that calls the signOut method from the useUserStore and pushes the user back to the Auth view.
const handleLogout = async () => {
    console.log("You are logout seey you soon!");
    try {
        // calls the user store and send the users info to backend to logIn
        await user.signOut();
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

<style></style>
