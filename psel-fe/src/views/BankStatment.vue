<script setup lang="ts">
import { ref } from 'vue'
import { getToken } from '@/utils/GetCookies'
import { useFetch } from '@/utils/fetch'
import { cashBackCaluator } from '@/utils/CashbackCalc'
import { type Transaction } from '../types/Transaction'
const url = ref('http://localhost:3000/transactions')
const { data, error } = useFetch<Transaction[]>(url, getToken() as string)
import dayjs from 'dayjs'
</script>
<template>
  <main>
    <h1>Bank Statment</h1>
    <div v-if="error">
      <p>Oops! Error encountered: {{ error }}</p>
    </div>
    <div v-else-if="data">
      <section class="statmentCards">
        <div v-for="(item, index) in data" :key="index" class="operationCards">
          <p>{{ `Payment Value: ${item.value} ` }}</p>
          <p>{{ `Cashback received: ${item.cashback}  ` }}</p>
          <p>
            {{ `Payment date: ${dayjs(item.date).format('MMMM D, YYYY')}  ` }}
          </p>
        </div>
      </section>
      <div class="cashbackTotal">{{ `Total Cashback: ${cashBackCaluator(data)} ` }}</div>
    </div>
    <div v-else>Loading...</div>
  </main>
</template>
<style scoped>
.operationCards {
  border: 1px solid white;
  flex-direction: column;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 200px;
}
.statmentCards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

h1 {
  text-align: center;
  padding: 10px;
}
.cashbackTotal {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}
</style>
