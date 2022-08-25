<template>
    <section>
        <div class="container">
            <div class="titleContainer">
                <div class="titleContainer_logo">
                    <!-- <img src="../assets/LogoListito.png" alt="logo Listito" /> -->
                    <h1>Listito</h1>
                </div>
                <p>Your to-do list App</p>
            </div>
            <div class="subtitleContainer">
                <h4>Hello again!</h4>
                <h4>Welcome back</h4>
            </div>

            <form @submit.prevent="handleSignIn">
                <div class="formContainer">
                    <div>
                        <label for="email"
                            ><p><!-- Email --></p></label
                        >
                    </div>
                    <div>
                        <input
                            type="text"
                            name="email"
                            id="email"
                            v-model="email"
                            placeholder="Enter your Email"
                            class="input"
                        />
                    </div>

                    <div>
                        <label for="password"
                            ><p><!-- Password --></p></label
                        >
                    </div>
                    <div class="passwordInput">
                        <input
                            :type="passwordInputType"
                            name="password"
                            id="password"
                            v-model="password"
                            placeholder="Enter your Password"
                            class="input"
                        />
                        <i
                            :class="passwordIconClick"
                            @click="hidePassword = !hidePassword"
                            class="material-icons iconEye"
                        >
                            {{ icon }}
                        </i>
                    </div>
                    <div>
                        <button type="submit">Log in</button>
                    </div>
                </div>
            </form>
            <div class="haveSign">
                Don’t have an account? &nbsp;
                <PersonalRouter
                    :route="route"
                    :buttonText="buttonText"
                    class="haveSign_text"
                />
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, computed } from "vue";
import PersonalRouter from "./PersonalRouter.vue";
import { supabase } from "../supabase";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";

// Route Variables
const route = "/auth/sign-up";
const buttonText = "Sign Up";

// Access to the constants store
const user = useUserStore();

// Input Fields
const email = ref("");
const password = ref("");

// Icons Show and hide password & const to manage
const hidePassword = ref(true);
const icon = ref("visibility_off");

// Error Message
const errorMsg = ref("");

// Show hide password variable
// Show hide confirmPassword variable
const passwordIconClick = computed(() =>
    hidePassword.value
        ? (icon.value = "visibility")
        : (icon.value = "visibility_off")
);
const passwordInputType = computed(() =>
    hidePassword.value ? "password" : "text"
);

// Router to push user once SignedIn to the HomeView
const redirect = useRouter();

// Arrow function to Signin user to supaBase
const handleSignIn = async () => {
    try {
        // calls the user store and send the users info to backend to logIn
        await user.signIn(email.value, password.value);
        // redirects user to the homeView
        redirect.push({ path: "/" });
        // redirect.push({ path: "/auth/login" });
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
section {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
.container {
    padding: 0rem 0rem;
    width: 280px;
}
.titleContainer {
    display: flex;
    flex-direction: column;
    text-align: center;
    margin-bottom: 80px;
}

.titleContainer_logo {
    display: flex;
    justify-content: center;
    align-items: center;
}

img {
    width: 20%;
    margin-right: 15px;
}

.subtitleContainer {
    margin-bottom: 26px;
}

.input {
    width: 100%;
    margin-bottom: 1.25rem;
    padding: 1rem 0.5rem;
    border: 1.5px solid #fff;
    border-radius: 10px;
    box-shadow: 0px 3px 15px -4px #dadee2, 0px 2px 10px -4px #dadee2;
    letter-spacing: 0.5px;
    transition: 0.4s;
}
/* To prevent the color-bg when autofill */
.input:-webkit-autofill,
.input:-webkit-autofill:active {
    transition: background-color 1000s ease-out;
}

.input:focus {
    outline: none;
    border: 1.5px solid #034c8c;
}

.errorInput {
    border: 1.5px solid #f24452;
    box-shadow: 0px 2px 13px -10px #f24452;
}

.passwordInput {
    position: relative;
}

.iconEye {
    cursor: pointer;
    color: #757575;
    position: absolute;
    top: 15px;
    right: 20px;
    font-size: 22px;
}

button {
    background: #034c8c;
    border: 2px solid #034c8c;
    color: #f6f7f8;
    border-radius: 50px;
    margin: 1rem 0;
    padding: 1rem 1.25rem;
    text-align: center;
    text-decoration: none;
    font-size: 16px;
    cursor: pointer;
    width: 100%;
    text-transform: uppercase;
    transition: 0.5s;
}
button:hover {
    background-color: #fff;
    border: 2px solid #034c8c;
    color: #034c8c;
}

.haveSign {
    margin: 15px 0;
    text-align: center;
}
.haveSign_text {
    color: #034c8c;
}
.haveSign_text:hover {
    background: none;
}
</style>
