<script setup lang="ts">
import { useRouter } from 'vue-router';
import store from '@/viewModel/store';

const router = useRouter();
if(store.getters.getToken() === '')
  router.push('/login')

</script>

<template>
    <div class="report-page">
        <div class="container">
        <h1 class="title">Report Bugs/Issues</h1>
        <p class="description">If you encounter any bugs or issues, please contact us at raidam1@newpaltz.edu</p>
        <p class="enjoy-message">If everything is working fine, enjoy!</p>
        </div>   
    </div>
</template>

<style scoped>

.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #ded0ea;
}

.report-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #d5ead0;
}

.title {
    font-size: 24px;
    color: #333;
    margin-bottom: 16px;
}

.description {
    font-size: 16px;
    color: #666666;
    margin-bottom: 32px;
}

.enjoy-message {
    font-size: 18px;
    color: #999;
}
</style>