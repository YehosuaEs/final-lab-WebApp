<template>
    <div>Sign In</div>
    <div>
        Don’t have an account? &nbsp;
        <PersonalRouter :route="route" :buttonText="buttonText" />
    </div>
    <form @submit.prevent="handleSignIn">
        <div>
            <p>Fill in this form to login into your account.</p>
            <hr />

            <div>
                <label for="email"><b>Email</b></label>
            </div>
            <div>
                <input
                    type="text"
                    name="email"
                    id="email"
                    v-model="email"
                    placeholder="Enter your Email"
                />
            </div>

            <div>
                <label for="password"><b>Password</b></label>
            </div>
            <div>
                <input
                    :type="passwordInputType"
                    name="password"
                    id="password"
                    v-model="password"
                    placeholder="Enter your Password"
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
.iconEye {
    cursor: pointer;
}
form {
    display: flex;
    flex-direction: column;
    margin: 1rem 0;
}
input {
    color: black;
    margin-bottom: 1rem;
}
button {
    background-color: #4caf50; /* Green */
    border: none;
    color: white;
    padding: 10px 10px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
}
</style>
