<script setup lang="ts">
import { RouterView } from 'vue-router';
import NavBar from './components/NavBar.vue';

</script>

<template>
  <NavBar />
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div>
          <router-view> </router-view>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>
</style>