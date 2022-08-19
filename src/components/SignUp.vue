<template>
    <div>Sign Up</div>
    <div>
        Have an account? &nbsp;
        <PersonalRouter :route="route" :buttonText="buttonText" />
    </div>
    <form @submit.prevent="handleSignUp">
        <div>
            <p>Please fill in this form to create an account.</p>
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
                <label for="passwordRepeat"><b>Repeat Password</b></label>
            </div>
            <div>
                <input
                    type="password"
                    name="repeatPassword"
                    id="repeatPassword"
                    v-model="repeatPassword"
                    placeholder="Confirm your Password"
                />
            </div>
            <div>
                <button type="submit">Sign up</button>
            </div>
        </div>
    </form>
</template>

<script setup>
import PersonalRouter from "./PersonalRouter.vue";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";

/* -- Pruebas-- */
import { supabase } from "../supabase";

// Route Variables as Props
const route = "/auth/login";
const buttonText = "Log in";

// Access to the constants store
const user = useUserStore();

// Input Fields
const email = ref("");
const password = ref("");
const repeatPassword = ref("");

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
const clickEye = () => {};
const passwordInputType = computed(() =>
    hidePassword.value ? "password" : "text"
);

// Router to push user once SignedUp to Log In (once you are signup know login)
const redirect = useRouter();

// Arrow function to SignUp user to supaBase with a timeOut() method for showing the error
const handleSignUp = async () => {
    try {
        // calls the user store and send the users info to backend to logIn
        await user.signUp(email.value, password.value);
        console.log(email.value);
        // redirects user to the homeView??? /* path = > LOGIN????  */
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
.iconEye {
    cursor: pointer;
}

form {
    display: flex;
    flex-direction: column;
    margin: 1rem 0;
}
input {
    margin-bottom: 1rem;
}
button {
    background-color: #4caf50;
    border: none;
    color: white;
    padding: 10px 10px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    cursor: pointer;
}
</style>
