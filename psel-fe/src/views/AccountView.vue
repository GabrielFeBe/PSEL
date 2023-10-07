<script setup lang="ts">
import { ref } from 'vue'
import { useFetch } from '../utils/fetch'
import Cookies from 'js-cookie'
const url = ref('https://jsonplaceholder.typicode.com/posts')
const token = Cookies.get('token')
const { data, error } = useFetch(url, token as string)
console.log(error)
</script>
<template>
  <main>
    <h1>Account</h1>
    <div v-if="error">
      <p>Oops! Error encountered: {{ error.message }}</p>
    </div>
    <div v-else-if="data">
      Data loaded:
      <pre>{{ data }}</pre>
    </div>
    <div v-else>Loading...</div>
  </main>
</template>
<style scoped></style>
