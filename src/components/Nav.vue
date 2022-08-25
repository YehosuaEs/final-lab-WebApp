<template>
    <div class="NavContainer">
        <div class="navBar_logo">
            <img src="../assets/Listito.jpg" alt="logo Listito" />
        </div>

        <nav>
            <button @click="handleLogout">logout</button>
        </nav>
    </div>
    <!-- <Burger /> -->
</template>

<script setup>
import Burger from "./Burger.vue";
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
.NavContainer {
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: space-between;
    padding: 20px 15px 15px;
    box-shadow: 0px 0.1px 15px -3px rgba(215, 217, 219, 0.5);
}
img {
    width: 20%;
}
button {
    background: #fff;
    border: 2px solid #034c8c;
    color: #034c8c;
    border-radius: 50px;
    /* margin: 1rem 0 0.3rem 0; */
    padding: 0.4rem 1.2rem;
    text-align: center;
    text-decoration: none;
    font-size: 12px;
    cursor: pointer;
    text-transform: uppercase;
    transition: 0.5s;
    box-shadow: 0px 5px 15px -3px rgba(0, 0, 0, 0.1);
}
button:hover {
    background-color: #034c8c;
    border: 2px solid #034c8c;
    color: #fff;
    box-shadow: 0px 5px 15px -3px rgba(0, 0, 0, 0.1);
}
</style>
