<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Cookies from 'js-cookie'

const token = Cookies.get('token')
</script>

<template>
  <header>
    <nav v-if="token">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/account">Account</RouterLink>
      <RouterLink to="/statement">BankStatement</RouterLink>
      <RouterLink to="/logout">Logout</RouterLink>
    </nav>
    <nav v-else>
      <RouterLink to="/">Home</RouterLink>
    </nav>
  </header>

  <RouterView />
  <footer>
    <p>Footer</p>
  </footer>
</template>

<style>
/* me de um footer com cores que contrastem com preto */
footer {
  background-color: white;
  color: black;
  padding: 1rem;
  text-align: center;
}

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
