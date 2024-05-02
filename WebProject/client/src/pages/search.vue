<script setup lang="ts">
import { ref, type PropType, computed, onMounted } from 'vue';
import { type User } from "@/model/users";
import { useRoute, useRouter } from 'vue-router'
import { getAllUsers } from '@/services/userServices';
import store from '@/viewModel/store';

const search = ref('')
const users = ref([] as User[]);
const API_URL= 'http://localhost:3000'

onMounted(()=>{
  getAllUsers().then((response)=>{
    let requestedUsers = response.users;

    users.value = requestedUsers.filter((user:User)=>{return user.username !== store.getters.getUser().username});
  });
})

const filteredUsers = computed(() => {
  return users.value.filter(user => {
    const searchTerm = search.value.toLowerCase();
    return (
    // user.username.toLowerCase().includes(searchTerm) ||
       user.username.toLowerCase().includes(searchTerm) 
    // user.lastName.toLowerCase().includes(searchTerm) ||
    // user.email.toLowerCase().includes(searchTerm)
    );
  });
});


const router = useRouter()
if(store.getters.getToken() === '')
  router.push('/login')


const openUserProfile = (user: User) => {
  router.push({ name: 'user', params: { id: user.id } })
    .catch(error => {
      console.error(error);
    });
}

</script>

<template>
  <form @submit.prevent="">
    <input class="input is-primary fa fa-search" type="search" v-model="search" placeholder="Search by username" >
  </form>

  <div class="user-list">
    <div v-for="user in filteredUsers" :key="user.id" class="card">
      <div class="card-image" @click="openUserProfile(user)">
        <img class="user-image" :src="`${API_URL}/${user.profile_pic}`" :alt="user.username" />
      </div>
      <div class="card-content">
        <h3>{{ user.username }}</h3>
        <p>{{ user.email }}</p>
        <p>{{ `${user.lastName}, ${user.firstName}` }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>

.card {
  border-radius: 1rem;
  box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1), 0 0px 0 1px rgba(10, 10, 10, 0.02);
  color: #4a4a4a;
  max-width: 22%;
  display: inline-table;
  flex-basis: 15rem;
  flex-grow: 1;
  margin: 0.5rem;
  margin-top: 50px;
  width: 15rem;
  margin: 0.5rem;
}
.user-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

h3 {
  font-weight: bold;
}

img {
  width:auto;
  height: 200px;
  object-fit: cover; /* Updated property */
  border-radius: 1rem 1rem 0 0;
}

.is-primary.input:focus,
.is-primary.textarea:focus,
.is-primary.is-focused.input,
.is-primary.is-focused.textarea,
.is-primary.input:active,
.is-primary.textarea:active,
.is-primary.is-active.input,
.is-primary.is-active.textarea {
  box-shadow: 0 0 0 0.125em rgb(250, 210, 242);
}

.is-primary.input,
.is-primary.textarea {
  border-color: lightgray;
}

form {
  display: inherit;
  margin-top: 20px;
  width: auto;
  padding-left: auto;
}

.input, .textarea {
  border-radius: 0.5rem;
  border: 1px solid lightgray;
  padding: 0.5rem;
  margin: 0.5rem;
  padding-left: auto;
  text-align: center;
}
</style>
