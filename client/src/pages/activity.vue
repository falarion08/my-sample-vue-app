<script setup lang="ts">
import { computed, onMounted } from 'vue';
import AddActivityCard from '@/components/AddCard.vue';
import * as activityServices from '@/services/activityServices';
import ActivityCard from '@/components/ActivityCard.vue';
import store from '@/viewModel/store';
import { ref } from 'vue';
import type Activity from '@/model/activities';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

const router = useRouter();
if(store.getters.getToken() === '')
  router.push('/login')

const toast = useToast();
const token = computed(()=>store.getters.getToken());
const pic_url = computed(()=>store.getters.getPicture());
let userActivities = ref<Activity[]>([]);

onMounted(()=>{
  updateActivities();
})

function updateActivities(){
  activityServices.getActivitiesAPI().then(response=>{
    let activities = response.currentUserActivities;
    userActivities.value = activities.filter((activity:Activity)=>{
      return activity.ownerUsername === store.getters.getUser().username;
    })  
  })

}

function deleteMyActivity(postID:any){
  activityServices.deleteActivityAPI(postID).then((response)=>{
    if(response.message == 'success'){
      updateActivities(); 
      toast('Deleted an actvity')
    }
  })
}

</script>

<template>
    <AddActivityCard v-on:update-activities="updateActivities()" />
    <ActivityCard v-on:delete-activity="deleteMyActivity($event)" :activities ="userActivities" />


</template>

<style scoped>

.label {
    font-weight: bold;
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