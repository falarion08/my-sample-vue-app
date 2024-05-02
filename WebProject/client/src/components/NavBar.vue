<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { ref, computed } from 'vue';
import store from '@/viewModel/store';
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';



let isActive = ref(false);

const user = computed(()=>store.getters.getUser());
const pic_url = computed(()=>store.getters.getPicture());
const toast = useToast(); 


function toggleMenu() {
  isActive.value = !isActive.value;
}


function checkIsAdmin(){
  return String(user.value.isAdmin) === 'true';
}

function logoutUser(){
  window.scrollTo(0,0);
  store.mutations.logoutUser(); 
  toast('You have logged out');
}
</script>

<template>
  <nav class="navbar is-warning" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="/">
        <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="30" height="28" />
      </a>
      <a role="button" @click="toggleMenu" :class="{ 'is-active': isActive }" class="navbar-burger" aria-label="menu"
        aria-expanded="false" data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div :class="{ 'is-active': isActive }" id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start" v-if="JSON.stringify(user) !== '{}'">
        <RouterLink to="/Activity" class="navbar-item fas fa-running" style="margin-top: 10px;">
          My Activity
        </RouterLink>

        <RouterLink to="/statistics" class="navbar-item fas fa-chart-line" style="margin-top: 10px;">
          Statistics
        </RouterLink>

        <RouterLink to="/FriendActivity" class="navbar-item fas fa-users" style="margin-top: 10px;">
          Friends Activity
        </RouterLink>

        <RouterLink to="/search" class="navbar-item fa fa-search" style="margin-top: 10px;">
          People Search
        </RouterLink>

        <div class="navbar-item has-dropdown is-hoverable" v-if="checkIsAdmin()">
          <a class="navbar-link fa fa-user-circle" style="margin-top: 10px;">
            Admin
          </a>

          <div class="navbar-dropdown">
            <!-- add v-f -->
            <RouterLink to="/user" class="navbar-item fa fa-user" >
              User
            </RouterLink>
            <hr class="navbar-divider">

            <RouterLink to="/Report" class="navbar-item">
              Report an issue
            </RouterLink>
          </div>
        </div>
      </div>

      <div class="navbar-end" v-if="JSON.stringify(user) === '{}'">
        <div class="navbar-item">

          <!-- login -->
            <div class="button-left p-1">
            <RouterLink to="/login" class="navbar-item button is-white">
              <strong>Login</strong>
            </RouterLink>
          </div>

          <div class="button-left p-1">
            <RouterLink to="/signup" class="navbar-item button is-white">
              <strong>Sign up</strong>
            </RouterLink>
          </div>
        </div>
      </div>

      <div class="navbar-end" v-else>
        <div class="navbar-item">

          <!-- login -->
            <div class="navbar-item ">
              <img :src = "pic_url" alt ="profile picture">
          </div>

          <button @click="logoutUser()" class="button-left p-0 clear-button">
            <RouterLink to="/" class="navbar-item button is-white">
                <strong >Logout</strong>
            </RouterLink>
          </button>
        </div>
      </div>

    </div>
  </nav>
</template>

<style scoped>

.clear-button{
  border: none;
  background: none;
}

.navbar-item {
  color: black;
}

.dropdown-menu{
  background-color: #f5f5f5;
  padding: auto;
  font-size: small;
}
</style>
