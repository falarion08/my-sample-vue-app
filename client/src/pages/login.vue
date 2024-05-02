<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { loginAPI } from '@/services/userServices';
import { useToast } from 'vue-toastification';
import store from '@/viewModel/store';
import { useRouter } from 'vue-router';
const toast = useToast();
const username = ref('')
const password = ref('')

const router = useRouter()

if (store.getters.getToken() !== '')
    router.push('/FriendActivity')

function loginUser(){
    
    loginAPI({
        'username':username.value,
        'password':password.value
    }).then((response)=>{

        if(response.message === 'success'){
            store.mutations.authenticateUser(response.user, response.authToken,response.user.profile_pic);
            toast.success('Successfully logged in');
            router.push('/FriendActivity')
            
        } else {
            toast.error(`${response.message}`)
        }
    })
}
</script>


<template>

    <div class="hero is-fullheight">
        <div class="hero-body is-justify-content-center is-align-items-center">
            <div class="columns is-flex is-flex-direction-column box">
                <form @submit.prevent="loginUser()">

                <div class="column">
                    <h1 class="title is-3 has-text-centered has-text-primary">Login</h1>
                        <label for="username">
                            <span>Username</span>
                        </label>
                        <input class="input is-primary" type="text" id="username" v-model="username">
                </div>

                <div class="column">
                        <label for="Name">
                            <span>Password</span>
                        </label>
                        <input class="input is-primary" type="password" v-model="password" placeholder="Password">
                    <a href="forget.html" class="is-size-7 has-text-primary">forget password?</a>
                </div>
                <div class="column">
                    <button class="button is-primary is-fullwidth" type="submit">Login</button>
                </div>
            </form>
                <div class="has-text-centered">
                    <p class="is-size-7"> Don't have an account? <a href="\signup" class="has-text-primary">Sign up</a>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.is-primary.input, .is-primary.textarea {
    border-color: pink;
}

.button.is-primary.is-hovered, .button.is-primary:hover {
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
    color: rgb(200, 93, 150)!important;
}
</style>
