<script setup lang="ts">
import { ref } from 'vue'
import { getToken } from '@/utils/GetCookies'
import { useFetch } from '@/utils/fetch'
const url = ref('https://jsonplaceholder.typicode.com/posts')
const { data, error } = useFetch(url, getToken() as string)
</script>
<template>
  <main>
    <h1>Account</h1>
    <div v-if="error">
      <p>Oops! Error encountered: {{ error }}</p>
    </div>
    <div v-else-if="data">
      Data loaded:
      <pre>{{ data }}</pre>
    </div>
    <div v-else>Loading...</div>
  </main>
</template>
<style scoped></style>
