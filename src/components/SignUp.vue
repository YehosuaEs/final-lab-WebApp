<template>
    <section>
        <div class="container">
            <div class="titleContainer">
                <div class="titleContainer_logo">
                    <img src="../assets/Listito.png" alt="logo Listito" />
                    <h1>Listito</h1>
                </div>
                <p>Your to-do list App</p>
            </div>
            <div class="subtitleContainer">
                <h4>Hello!</h4>
                <h4>Signup to get started</h4>
                <p class="errormsg">{{ errorMsg }}</p>
            </div>
            <!-- <div > -->
            <form @submit.prevent="handleSignUp">
                <div class="formContainer">
                    <!-- ------- email ------- -->
                    <div class="inputContainer">
                        <label for="email" class="label"
                            ><p><!-- Email --></p></label
                        >
                        <input
                            type="text"
                            name="email"
                            id="email"
                            v-model="email"
                            placeholder="Enter your Email"
                            class="input"
                            :class="errorCheckEmail ? 'errorInput' : 'input'"
                        />
                        <p class="errormsg">
                            {{ emailErrorMsg }}
                        </p>
                    </div>
                    <!-- ------- password ------- -->
                    <div class="passwordInput inputContainer">
                        <label for="password"
                            ><p><!-- Password --></p></label
                        >
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
                        <p class="errormsg">{{ passwordErrorMsg }}</p>
                    </div>
                    <!-- ------- repeat password ------- -->
                    <div class="inputContainer">
                        <label for="passwordRepeat"
                            ><p><!-- Repeat Password --></p></label
                        >
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
import AlertMessage from "./AlertMessage.vue";
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
        /^(?=.*[0-9])(?=.*[!@#$%^&*\.,\-_])[a-zA-Z0-9!@#$%^&*\.,\-_]{6,50}$/;
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

// Error Message
const errorMsg = ref("");
const emailErrorMsg = ref("");
const passwordErrorMsg = ref("");
// Error Input
const errorNoValue = ref(false);
const errorCheckEmail = ref(false);
const errorPasswordSame = ref(false);
const errorCheckPassword = ref(false);
// const formConfirm = ref(true);
// Arrow function to SignUp user to supaBase with a timeOut() method for showing the error
const handleSignUp = async () => {
    try {
        if (!email.value || !password.value) {
            errorMsg.value = "Missing info, please chack!";
            setTimeout(function () {
                errorMsg.value = "";
            }, 4000);
        } else if (!checkEmail(email.value)) {
            errorNoValue.value = false;
            errorMsg.value = "";
            errorCheckEmail.value = true;
            emailErrorMsg.value = "Valid email required.";
            setTimeout(function () {
                errorCheckEmail.value = false;
                emailErrorMsg.value = "";
            }, 3000);
        } else if (password.value !== repeatPassword.value) {
            errorCheckEmail.value = false;
            emailErrorMsg.value = "";
            errorPasswordSame.value = true;
            passwordErrorMsg.value = "The password doesn't match";
            setTimeout(function () {
                errorPasswordSame.value = false;
                passwordErrorMsg.value = "";
            }, 3000);
        } else if (!checkPassword(password.value)) {
            errorPasswordSame.value = false;
            errorCheckPassword.value = true;
            passwordErrorMsg.value =
                "Passwords must contain at least six characters, one number and one special character";
            setTimeout(function () {
                errorCheckPassword.value = false;
                passwordErrorMsg.value = "";
            }, 6000);
        } else {
            // calls the user from store and send the users info to backend to login
            await user.signUp(email.value, password.value);
            // formConfirm.value = false;
            errorCheckPassword.value = false;
            passwordErrorMsg.value = null;
            alert(
                `We've sent you an email to ${email.value}, please confirm to join Listito`
            );
            redirect.push({ path: "/auth/login" });
        }
    } catch (error) {
        errorMsg.value = `Error: ${error.message}`;
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
    padding: 0rem 0rem;
    width: 280px;
}

.titleContainer {
    text-align: center;
    margin-bottom: 25px;
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

.inputContainer {
    position: relative;
    margin-bottom: 1.25rem;
}

.input {
    width: 100%;
    padding: 1rem 0.7rem;
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
    border: 1.5px solid #f2a74b;
}

.errorInput {
    border: 1.5px solid #f24452;
    box-shadow: 0px 2px 13px -10px #f24452;
}

.errormsg {
    color: #f24452;
    font-size: 14px;
    margin-left: 0.7rem;
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
    background: #f2a74b;
    border: 2px solid #f2a74b;
    border-radius: 50px;
    color: white;
    margin: 1rem 0;
    padding: 1rem 1.25rem;
    text-align: center;
    text-decoration: none;
    font-size: 16px;
    cursor: pointer;
    width: 100%;
    transition: 0.5s;
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
.haveSign_text:hover {
    background: none;
}
</style>
