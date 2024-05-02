<script setup lang="ts">

</script>

<template>
    <section class="hero is-fullheight">
        <div class="hero-body">
            <div class="container">
                <h1 class="title is-1">Welcome to Fitness Tracker</h1>
                <h2 class="subtitle is-3">Track your fitness journey with ease</h2>
                <h9 >Login as Rick Grimes to be the Admin!</h9>
                <br>
                <RouterLink to="/login" class="login " style="margin-top: 10px;">
                    <button class="button is-primary is-rounded" >Get Started</button>
                </RouterLink>
                
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
</script>

<style scoped>
.hero {
    background-image: url('/path/to/fitness-background.jpg');
    background-size: cover;
    background-position: center;
}

.button {
  background-color: rgb(232, 146, 160);
  border-color: #dbdbdb;
  color: #ffffff;
  margin-top: 20px;
}

.button.is-primary.is-hovered,
.button.is-primary:hover {
  background-color: rgb(200, 93, 150);
  border-color: transparent;
  color: #fff;
}
</style>
