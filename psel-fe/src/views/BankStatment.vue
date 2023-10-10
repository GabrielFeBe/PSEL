<script setup lang="ts">
import { ref } from 'vue'
import { getToken } from '@/utils/GetCookies'
import { useFetch } from '@/utils/fetch'
const url = ref('http://localhost:3000/transactions')
const { data, error } = useFetch(url, getToken() as string)
const array: any = data.value || []
const totalCashBack = ref(0)
array.forEach((element: any) => {
  totalCashBack.value += element.value * element.cashback
})
console.log(totalCashBack.value)
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
