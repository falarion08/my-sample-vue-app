<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { type User } from "@/model/users";
import AddActivityCard from '@/components/AddCard.vue';
import ActivityCard from '@/components/ActivityCard.vue';
import { getActivitiesAPI } from '@/services/activityServices';
import type Activity from '@/model/activities';
import store from '@/viewModel/store';
import { useRouter } from 'vue-router';


const router = useRouter();
if(store.getters.getToken() === '')
  router.push('/login')


const activities = ref([] as Activity[])
const type = ref('');
const showModal = ref(false);

onMounted(()=>{
  getActivitiesAPI().then((response)=>{
    activities.value = response.currentUserActivities.filter((activity:Activity)=>
    {return activity.ownerUsername !== store.getters.getUser().username})
  
  })
})


</script>

<template>

<AddActivityCard />

<ActivityCard :activities="activities"/>

</template>

<style scoped>
.box-list {
  margin-top: 50px;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1), 0 0px 0 1px rgba(10, 10, 10, 0.02);
  color: #4a4a4a;
  display: block;
  padding: 0.75rem;
  width: 50%;
}

.label {
  font-weight: bold;
}

@media (min-width: 1024px) {
  .Myactivity {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}

.button {
  border-radius: 0.5rem;
  background-color: rgb(232, 146, 160);
  border-color: #dbdbdb;
  color: #ffffff;
  margin-top: 20px;
  padding: 10px 280px;
  padding-right: 45%;
  padding-left: 40%;
}

.button.is-primary.is-hovered,
.button.is-primary:hover {
  background-color: rgb(200, 93, 150);
  border-color: transparent;
  color: #fff;
}

.image img {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
}

.post-date{
  color: #4a4a4a;
  font-size: 0.8rem;
  margin-left: 500px;
  
}

.post-author {
  color: #212a70;
  font-family: "Arial", sans-serif; /* Replace with your desired font */
  font-size: 1.2rem; /* Adjust the font size as needed */
  font-weight: bold; /* Adjust the font weight as needed */
}

  .post-detail {
    margin-top: 10px;
    font-size: 0.9rem;
    color: #777777;
  }
</style>