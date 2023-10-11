<script setup lang="ts">
import { ref } from 'vue'
import { getToken } from '@/utils/GetCookies'
import { useFetch } from '@/utils/fetch'
import { cashBackCaluator } from '@/utils/CashbackCalc'
import { type Transaction } from '../types/Transaction'
const url = ref('http://localhost:3000/transactions')
const { data, error } = useFetch<Transaction[]>(url, getToken() as string)

console.log(data.value)
</script>
<template>
  <main>
    <h1>Account</h1>
    <div v-if="error">
      <p>Oops! Error encountered: {{ error }}</p>
    </div>
    <div v-else-if="data">
      <div v-for="(item, index) in data" :key="index" class="operationCards">
        {{ item.value }} {{ item.cashback }} {{ item.date }}
      </div>
      <div>Total Cashback: {{ cashBackCaluator(data) }}</div>
    </div>
    <div v-else>Loading...</div>
  </main>
</template>
<style scoped>
.operationCards {
  border: 1px solid white;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
  width: 300px;
  display: flex;
  justify-content: space-between;
}
</style>
