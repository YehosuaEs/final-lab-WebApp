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
            <!-- ------- email ------- -->
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
            <!-- ------- password ------- -->
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
            <!-- ------- repeat password ------- -->

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
            <!-- ------- button submit ------- -->
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

// Route Variables as Props
const route = "/auth/login";
const buttonText = "Log in";
/* -----------------------------VARIABLES---------------------------- */
// Access to the constants in the Store
const user = useUserStore();
// Router to push user once handleSignUp to Signin component
const redirect = useRouter();
// Input Fields
const email = ref("");
const password = ref("");
const repeatPassword = ref("");
// Icons Show and hide password & const to manage
const hidePassword = ref(true);
const icon = ref("visibility_off");
// Error Message
const errorMsg = ref("");
// To confirm password

/* -----------------------METHODS and FUNCTIONS----------------------- */
// To verify correct email
const checkEmail = (email) => {
    const validEmail =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return validEmail.test(email);
};
// To verify correct password
const checkPassword = (password) => {
    const strongPassword =
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$/;
    return strongPassword.test(password);
};
// To hide and show password
const passwordIconClick = computed(() =>
    hidePassword.value
        ? (icon.value = "visibility")
        : (icon.value = "visibility_off")
);
const passwordInputType = computed(() =>
    hidePassword.value ? "password" : "text"
);

// Arrow function to SignUp user to supaBase with a timeOut() method for showing the error
const handleSignUp = async () => {
    try {
        if (!email.value || !password.value) {
            alert("missing infoo");
        } else if (!checkEmail(email.value)) {
            alert("Valid email required.");
        } else if (password.value !== repeatPassword.value) {
            alert("the password doesn't match");
        } else if (!checkPassword(password.value)) {
            alert(
                "Passwords must contain at least six characters, including uppercase, lowercase, numbers and a special character"
            );
        } else {
            // calls the user from store and send the users info to backend to login
            await user.signUp(email.value, password.value);
            console.log(email.value + " si entraste  con tu email well done");
            // redirect.push({ path: "/auth/login" });
            redirect.push({ path: "/auth/sign-up" });
        }
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
