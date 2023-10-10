<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Cookies from 'js-cookie'
import { ref } from 'vue'

const token = Cookies.get('token')

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

    <nav v-if="token">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/register">Register</RouterLink>
      <RouterLink to="/account">Account</RouterLink>
      <RouterLink to="/statement">BankStatement</RouterLink>
    </nav>
    <nav v-else>
      <RouterLink to="/">Home</RouterLink>
    </nav>
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
