<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import { ref } from 'vue'

const count = ref(0)

function increment() {
  // .value is needed in JavaScript
  count.value++
}
</script>

<template>
  <header>
    <button @click="increment">
      {{ count }}
    </button>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/account">Account</RouterLink>
        <RouterLink to="/statement">BankStatement</RouterLink>
        <RouterLink to="/login">Login</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style>
input {
  width: 300px;
  height: 10px;
  padding: 1rem;
  border: 1px solid var(--color-border);
  border-radius: 0.25rem;
  margin-bottom: 1rem;
}
label {
  width: 100%;
}
</style>
