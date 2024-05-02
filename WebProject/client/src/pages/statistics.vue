<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import store from '@/viewModel/store';
import * as exerciseServices from '@/services/exerciseTypesServices';
const API_URL = "http://localhost:3000";
const router = useRouter();
if(store.getters.getToken() === '')
  router.push('/login')


const user = computed(()=>store.getters.getUser());
const carbsBurned = ref(0); 
const totalDuration = ref(0.0); 


exerciseServices.computeStats(user.value.id).then((response)=>{
    if(response.message ==='success')
    {
      carbsBurned.value = response.stats.caloriesBurned;
      totalDuration.value = response.stats.duration
    }
  })

</script>

<template>
  <div class="statistics">
    <div class="box">
      <h1><strong>My Statistics</strong></h1>

      <div class=" column is-flex is-flex-direction-row">
        
        <div>
          <figure class="m-5">
            <img height="350" width="350" :src = "`${API_URL}/${user.profile_pic}`" />
          </figure> 
          
        </div>


        <div>
            <h3>Total Carbs Burned:</h3>
            <p>{{carbsBurned}}</p>
            <h3>Total time spent working out:</h3>
            <p>{{totalDuration}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.statistics {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 2em;
  text-align: center;
}
</style>