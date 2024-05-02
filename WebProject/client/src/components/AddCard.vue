<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import { type User } from '@/model/users';
import type Activity from '@/model/activities';
import * as fileHandler from '@/utils/functions/fileUploads';
import store from '@/viewModel/store';
import { defineEmits } from 'vue';
import { createActivityAPI } from '@/services/activityServices';
import { useToast } from 'vue-toastification';

const toast = useToast();
const isNewActivityActive = ref(false);
const activityPicture = ref<File | null>(null);
let currentUser = ref<User>(store.getters.getUser());


const emit = defineEmits(['updateActivities']);

const activity = reactive({
    status:'',
    date:'',
    caloriesBurned:'',
    duration:'',
    workoutType:'',    
})

const toggleModal = () => {
  isNewActivityActive.value =!isNewActivityActive.value;
}
const handleImageUpload = (event:any) =>{
  
  fileHandler.handleImageUpload(activityPicture,event);  
}

onMounted(()=>{
  currentUser.value = store.getters.getUser();
})


function saveActivity() {

  if(activityPicture.value !== null){
    const picture:File = activityPicture.value;
    const form = new FormData();
    
  
    form.append('status', activity.status);
    form.append('date',activity.date);
    form.append('caloriesBurned',String(activity.caloriesBurned));
    form.append('duration',String(activity.duration));
    form.append('file', activityPicture.value);
    form.append('workoutType',String(activity.workoutType));
    form.append('ownerID',String(currentUser.value.id))
    form.append('ownerUsername',currentUser.value.username)
    form.append('ownerPicUrl', currentUser.value.profile_pic); 

    activity.status=''
    activity.date=''
    activity.caloriesBurned=''
    activity.duration=''
    activity.workoutType=''    
    activityPicture.value = null;

    createActivityAPI(form).then(()=>{
      emit('updateActivities');
      toast.success('Created a New Activity!')
      toggleModal();
    });

  }

}

</script>

<template>
  <button class="button is-primary" @click="toggleModal">Add Workout</button>
  <div v-if="isNewActivityActive" class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Add Activity</p>
        <button class="delete" aria-label="close" @click="toggleModal"></button>
      </header>
      <section class="modal-card-body">
        <form @submit.prevent="saveActivity()" >
         
          <div class="field">
            <label class="label">Status</label>
            <div class="control">

              <input class="input" type="text" placeholder="Where did you go? What did you do?" required v-model="activity.status">
            </div>
          </div>


          <div class="field">
            <label class="label">Date</label>
            <div class="control">
              <input class="input" type="date" required v-model="activity.date">
            </div>
          </div>

          <div class="field">
            <label class="label">Calories</label>
            <div class="control">
              <!-- v-model="newActivity.caloriesBurned" -->
              <input class="input" type="text" placeholder="How many calories did you burn?" required v-model="activity.caloriesBurned">
            </div>
          </div>


          <div class="field">
            <label class="label">Duration</label>
            <div class="control">
              <!--  v-model="newActivity.duration" -->
              <input class="input" type="text" placeholder="Duration" required v-model="activity.duration">
            </div>
          </div>

          <div class="field">
            <label class="label">Picture</label>
            <div class="control">
              <input class="input" type="file" required @change="(event)=>{handleImageUpload(event)}">
            </div>
          </div>

          <div class="field">
            <label class="label">Workout Type</label>
            <div class="control">
              <!-- v-model="newActivity.name" -->
              <input class="input" type="text" placeholder="Workout type" required v-model="activity.workoutType">
            </div>
          </div>

         <div class="field">
                            <div class="control">
                                <input class="button is-primary" type="submit" value="Save">
                            </div>
                        </div>
        </form>
      </section>
     
    </div>
  </div>
</template>

<style scoped>
.button {
  border-radius: 0.5rem;
  background-color: rgb(232, 146, 160);
  border-color: #dbdbdb;
  color: #ffffff;
  margin-top: 2rem;
  margin-bottom: 2rem;
  margin-left: 21%;
  padding-left: 25%;
  padding-right: 25%;
}

.button.is-primary.is-hovered,
.button.is-primary:hover {
  background-color: rgb(200, 93, 150);
  border-color: transparent;
  color: #fff;
}

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

@media (min-width: 1024px) {
  .Myactivity {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}

</style>