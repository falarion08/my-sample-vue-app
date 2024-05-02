<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    props: ['status'],
    methods:{
        scrollToStart(){
            window.scrollTo(0,0);
        }
    }
})
</script>

<template>
<div v-if="status" class="modal is-active">
  <div class="modal-background"></div>
  <div class="modal-card">
    <section class="modal-card-body is-flex is-align-items-center is-flex-direction-column">
        <h1 class="p-3 is-size-3">Successfuly registered</h1>
        <figure class="image is-128x128">
            <img
            src="https://cdn2.iconfinder.com/data/icons/color-svg-vector-icons-part-2/512/ok_check_yes_tick_accept_success-512.png"
            alt="check image"
            />
        </figure>
    </section>

    <footer class="modal-card-foot">
        <RouterLink to= "/login">
            <button class="button is-primary" @click="scrollToStart">Return To Login Page</button>
        </RouterLink>
        
    </footer>
  </div>

</div>
</template>

<style scoped>
.gap {
    gap: 10px;
}

.is-primary.input,
.is-primary.textarea {
    border-color: pink;
}

.button.is-primary.is-hovered,
.button.is-primary:hover {
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
    color: rgb(200, 93, 150) !important;
}
</style>

