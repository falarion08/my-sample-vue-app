<script setup lang="ts">
import { onMounted, ref,computed } from 'vue';
import { type User} from "@/model/users";
import store from '@/viewModel/store';
import * as activityServices from '@/services/activityServices'


const props = defineProps(["activities"]);

const API_URL = 'http://localhost:3000';

const newst = computed(()=>props.activities.reverse())
const currentUser = computed(()=>store.getters.getUser());

const emit = defineEmits(['deleteActivity'])

</script>

<template>
   
    <div class="box">
      <article class="media" v-for="(activity,index) in newst" :key="activity.id">
        <div class="media-left">
          <figure class="image is-64x64">
            <img class="image is-rounded" :src="`${API_URL}/${activity.ownerPicUrl}`" alt="Image">
          </figure>
        </div>

        <div class="media-content">
          <div class="box">
            <div class="media-right">
              <figure class="image is-5by3">
                <img :src="`${API_URL}/${activity.filename}`" alt="Activity Image">
              </figure>
              <div class="media-content">
                <div class="post-header">
                  <strong class="post-author">{{ activity.ownerUsername }}</strong>
                  <small class="post-date">{{ activity.date }}</small>
                </div>
                <div class="post-body">
                  <br>
                
                  <div class="post-details">
                    <p class="post-description">
                  <strong>Status: </strong>  {{ activity.status }}
                  </p>
                  <p class="post-description">
                    <strong>calories Burned:</strong> {{ activity.caloriesBurned }} calories!
                  </p>
                    <p><span class="label">Duration:</span> {{ activity.duration }}</p>
                    <p><span class="label">Workout Type:</span> {{ activity.workoutType }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="media-right">
          <button class="delete" @click="$emit('deleteActivity',activity.id)"></button>
        </div>
      </article>
    </div>
 
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

