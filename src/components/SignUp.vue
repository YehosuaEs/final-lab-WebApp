<template>
    <section>
        <div class="container">
            <div class="titleContainer">
                <h1>Listito</h1>
                <p>Your to-do list App</p>
            </div>
            <div class="subtitleContainer">
                <h4>Hello!</h4>
                <h4>Signup to get started</h4>
            </div>
            <!-- <div > -->
            <form @submit.prevent="handleSignUp">
                <div class="formContainer">
                    <!-- ------- email ------- -->
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
                            :class="
                                errorValue || errorCheckEmail
                                    ? 'errorInput'
                                    : 'input'
                            "
                        />
                    </div>
                    <!-- ------- password ------- -->
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
                            :class="
                                errorPasswordSame || errorCheckPassword
                                    ? 'errorInput'
                                    : 'input'
                            "
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
                        <label for="passwordRepeat"
                            ><p><!-- Repeat Password --></p></label
                        >
                    </div>
                    <div>
                        <input
                            type="password"
                            name="repeatPassword"
                            id="repeatPassword"
                            v-model="repeatPassword"
                            placeholder="Confirm your Password"
                            class="input"
                            :class="
                                errorPasswordSame || errorCheckPassword
                                    ? 'errorInput'
                                    : 'input'
                            "
                        />
                    </div>
                    <!-- ------- button submit ------- -->
                    <div>
                        <button type="submit">SIGN UP</button>
                    </div>
                </div>
            </form>
            <div class="haveSign">
                Already have an account?
                <PersonalRouter
                    :route="route"
                    :buttonText="buttonText"
                    class="haveSign_text"
                />
            </div>
            <!-- </div> -->
        </div>
    </section>
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
// Error Input
const errorNoValue = ref(false);
const errorCheckEmail = ref(false);
const errorPasswordSame = ref(false);
const errorCheckPassword = ref(false);

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
            alert("missing info");
            errorNoValue.value = true;
        } else if (!checkEmail(email.value)) {
            alert("Valid email required.");
            errorNoValue.value = false;
            errorCheckEmail.value = true;
        } else if (password.value !== repeatPassword.value) {
            alert("the password doesn't match");
            errorCheckEmail.value = false;
            errorPasswordSame.value = true;
        } else if (!checkPassword(password.value)) {
            alert(
                "Passwords must contain at least six characters, including uppercase, lowercase, numbers and a special character"
            );
            errorPasswordSame.value = false;
            errorCheckPassword.value = true;
        } else {
            // calls the user from store and send the users info to backend to login
            await user.signUp(email.value, password.value);
            errorCheckPassword.value = false;
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
    } finally {
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
    /* border: 1px solid red; */
    padding: 0rem 0rem;
    width: 280px;
}
.titleContainer {
    text-align: center;
    margin-bottom: 80px;
}

.subtitleContainer {
    margin-bottom: 26px;
}

.formContainer {
}

.input {
    width: 100%;
    margin-bottom: 1.25rem;
    padding: 1rem 0.5rem;
    border: 1px solid #dadee2;
    border-radius: 10px;
    box-shadow: 0px 3px 15px -4px #dadee2, 0px 2px 10px -4px #dadee2;
    letter-spacing: 0.5px;
}

.errorInput {
    border: 1.5px solid #f24452;
    box-shadow: 0px 2px 13px -10px #f24452;
}

input:focus {
    outline: none;
    border: 1.5px solid #f2a74b;
}
.passwordInput {
    position: relative;
}
.iconEye {
    cursor: pointer;
    color: #707070;
    position: absolute;
    top: 15px;
    right: 20px;
}

button {
    background: #f2a74b;
    border: 2px solid #f2a74b;
    color: #f6f7f8;
    border-radius: 50px;
    color: white;
    margin: 1rem 0;
    padding: 1rem 1.25rem;
    text-align: center;
    text-decoration: none;
    font-size: 16px;
    cursor: pointer;
    width: 100%;
}
button:hover {
    background-color: #fff;
    border: 2px solid #f2a74b;
    color: #f2a74b;
}

.haveSign {
    margin: 15px 0;
    text-align: center;
}
.haveSign_text {
    color: #f2a74b;
}
</style>
