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
                <input
                    type="password"
                    name="repeatPassword"
                    id="repeatPassword"
                    v-model="repeatPassword"
                    placeholder="Confirm your Password"
                />
            </div>
            <div>
                <button type="submit">SignUp</button>
            </div>
        </div>
    </form>
</template>

<script setup>
import PersonalRouter from "./PersonalRouter.vue";
import { ref, computed } from "vue";

// Route Variables as Props
const route = "/auth/login";
const buttonText = "Log in";

// Input Fields
const email = ref("");
const password = ref("");
const repeatPassword = ref("");
// Icons Show and hide password
const hidePassword = ref(true);
const icon = ref("visibility_off");

// Error Message

// Show hide password variable
// Show hide confrimPassword variable
const passwordIconClick = computed(() =>
    hidePassword.value
        ? (icon.value = "visibility")
        : (icon.value = "visibility_off")
);
const clickEye = () => {};
const passwordInputType = computed(() =>
    hidePassword.value ? "password" : "text"
);

// Router to push user once SignedUp to Log In

// Arrow function to SignUp user to supaBase with a timeOut() method for showing the error
const handleSignUp = () => {
    console.log(
        password.value + " " + repeatPassword.value + " " + email.value
    );
};
</script>

<style>
.iconEye:hover {
    cursor: pointer;
}
</style>
