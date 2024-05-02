<script setup lang="ts">
import { onMounted, ref, } from 'vue'
import { registerUser } from '../services/userServices';
import { reactive, computed } from 'vue';
import SuccessCard from '../components/SuccessCard.vue';

const username = ref('');
const email = ref('');
const password = ref('');
const firstName = ref('');
const lastName = ref('');
const profilePicture = ref('');
const birthDate = ref('');
const gender = ref('Male');
const telephone = ref('');
let errMessage =ref("");
let registerStatus = ref(false);


function register() {
    let formData = new FormData();
    formData.append('file', profilePicture.value);
    formData.append('email', email.value);
    formData.append('password', password.value);
    formData.append('firstName', firstName.value);
    formData.append('lastName', lastName.value);
    formData.append('username',username.value);
    formData.append('gender',gender.value);
    formData.append('telephone',telephone.value);
    formData.append('birthDate', birthDate.value);
    formData.append('isAdmin','false');

    registerUser(formData)
    .then((response) => {
        
        if (response.message !== 'success'){
            errMessage.value= response.message;
            window.scrollTo(0,0);
        } else {
            registerStatus.value = true;
        }
    });

};

function handleImageUpload(event: any) {
    profilePicture.value = event.target.files[0];
}

</script>

<template>
    
    <SuccessCard :status ="registerStatus"/>

    <div class="container">
        <div class="hero is-fullheight">
            <div class="hero-body is-justify-content-center is-align-items-center">
                <div class="columns is-flex is-flex-direction-column box">
                    <h1 class="title is-3 has-text-centered has-text-primary">Sign up!</h1> <!-- Signup headline -->
                    <p v-if="errMessage" class="has-text-centered has-text-danger">{{errMessage}}</p>
                    <form @submit.prevent="register()">

                        <div class="column">
                            <label for="profilePicture" class="column">Profile Picture</label>
                            <input id="profilePicture" name="file" type="file" accept="image/*"
                                @change="(event) => handleImageUpload(event)" autocomplete="false" required />
                        </div>
                        <div class="column is-flex is-flex-direction-row">

                            <div class="is-flex-grow-1 p-1">
                                <label for="firstName">First Name</label>
                                <input class="column input is-primary" id="firstName" type="text" v-model="firstName"
                                    placeholder="Enter First Name" required autocomplete="false">
                            </div>
                            <div class="is-flex-grow-1 p-1">
                                <label for="lastName">Last Name</label>
                                <input class="column  input is-primary" id="lastName" type="text" v-model="lastName"
                                    placeholder="Enter Last Name" required autocomplete="false">
                            </div>
                        </div>

                        <div class="column">
                            <label for="username">Username</label>
                            <input class="input is-primary" type="text" v-model="username" id="username" placeholder="username"
                                required autocomplete="false">
                        </div>

                        <div class="column">
                            <label for="email">Email</label>
                            <input class="input is-primary" type="email" id="email" v-model="email" placeholder="email@test.com"
                                required autocomplete="false">
                        </div>

                        <div class="column">
                            <label for="Name">Password</label>
                            <input class="input is-primary" type="password" id="password" v-model="password" placeholder="Password"
                                required autocomplete="false">

                        </div>

                        <div class="column is-flex is-flex-direction-row">

                            <div class="is-flex-grow-1 p-1">
                                <label for="gender">Gender</label>
                                <div class="select is-flex">
                                    <select class="input is-primary" id ="gender" name="gender" v-model="gender" required>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                                </div>
                            </div>
                            <div class="is-flex-grow-1 p-1">
                                <label for="birthDate">Date of Birth</label>
                                <input class="column  input is-primary" id="birthDate" type="date" v-model="birthDate" required>
                            </div>
                        </div>

                        <div class="column">
                            <label for="telephone">Phone </label>
                            <small>(Format: 123-456-7890)</small>
                            <input class="input is-primary" type="tel" id="telephone" v-model="telephone" name="telephone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required />
                        </div>

                        <div class="column">
                            <input type="checkbox" required>
                            I agree to the <a href="#" class="has-text-primary">terms and conditions</a>
                            <button class="button is-primary is-fullwidth" type="submit">Create an account</button>
                        </div>
                        <div class="has-text-centered">
                            <p> Already have an account? <a href="/login" class="has-text-primary">Login</a>
                            </p>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    </div>

</template>

<style scoped>
.gap {
    gap: 10px;
}

.is-primary.input,
.is-primary.textarea {
    border-color: pink;
}

.button.is-primary.is-hovered,
.button.is-primary:hover {
    background-color: rgb(200, 93, 150);
    border-color: transparent;
    color: #fff;
}

.button.is-primary {
    background-color: rgb(223, 145, 158);
    border-color: transparent;
    color: #fff;
}

.has-text-primary {
    color: rgb(200, 93, 150) !important;
}
</style>

